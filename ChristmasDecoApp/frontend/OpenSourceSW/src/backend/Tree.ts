import { atom, useAtom, useSetAtom } from "jotai";
import { LoaderFunctionArgs } from "react-router-dom";
import { fetchTree, TreeResponse } from "./Backend";

export interface Decoration {
    idx: number;
    nickname: string;
    imageIdx: number;
}

export interface Tree {
    treeOwnerNickname: string;
    decorations: Decoration[];
    treeId: number;
}

// x, y 좌표를 저장하는 atom
export interface Coordinate { //편지
    x: number;
    y: number;
}


// Atom 정의
export const lettersAtom = atom<{ id: number; x: number; y: number }[]>([]);
export const treeOwnerNicknameAtom = atom<string>("알 수 없음"); // 트리 주인의 닉네임
export const treeIdxAtom = atom<number>(-1); // 트리 ID
export const decorationsAtom = atom<Decoration[]>([]); // 트리 데코레이션 데이터
export const treePositionAtom = atom<{ x: number; y: number }>({ x: 200, y: 200 });
export const lpPositionAtom = atom<{ x: number; y: number }>({ x: -450, y: 350 });
export const letterPositionAtom = atom<{ x: number; y: number }>({ x: 200, y: 200 });

// 좌표 목록을 저장하는 atom
export const coordinatesAtom = atom<Coordinate[]>([]);

// 특정 좌표를 업데이트하는 atom
export const updateCoordinateAtom = atom(
    null,
    (get, set, { index, newCoordinate }: { index: number; newCoordinate: Coordinate }) => {
        const currentCoordinates = get(coordinatesAtom);
        const updatedCoordinates = currentCoordinates.map((coord, i) =>
            i === index ? newCoordinate : coord
        );
        set(coordinatesAtom, updatedCoordinates);
    }
);

// 특정 좌표를 삭제하는 atom
export const removeCoordinateAtom = atom(
    null,
    (get, set, index: number) => {
        const currentCoordinates = get(coordinatesAtom);
        const updatedCoordinates = currentCoordinates.filter((_, i) => i !== index);
        set(coordinatesAtom, updatedCoordinates);
    }
);

export const treeLoader = async () => {
    const response = await fetch("http://localhost:8080/trees", {
        method: "GET",
        credentials: "include", // 세션 기반 인증
    });

    if (!response.ok) {
        throw new Error("트리 데이터를 불러오는 중 문제가 발생했습니다.");
    }

    // 서버에서 반환된 JSON 데이터
    const data = await response.json();

    // 데이터 가공 및 기본값 처리
    return {
        treeOwnerNickname: data.treeOwnerNickname || "알 수 없음", // 닉네임이 없을 경우 기본값 제공
        decorations: data.result?.decoration
            ? Object.entries(data.result?.decoration).map(([key, value]) => ({
                id: key,
                description: value,
            }))
            : [], // decoration이 없을 경우 빈 배열
        treeId: data.treeIdx || -1 // treeIdx가 없으면 기본값 -1
    };
};


export const decoAtom = atom<number>(0);
export const decoTypeAtom = atom<number>(0);
export const decoMessageAtom = atom<string>("");
export const decoNicknameAtom = atom<string>("");

export const updateTreeState = (treeData: Tree) => {
    const setTreeOwnerNickname = useSetAtom(treeOwnerNicknameAtom);
    const setTreeIdx = useSetAtom(treeIdxAtom);
    const setDecorations = useSetAtom(decorationsAtom);

    return (treeData: Tree) => {
        setTreeOwnerNickname(treeData.treeOwnerNickname);
        setTreeIdx(treeData.treeId);
        setDecorations(treeData.decorations);
    };
};