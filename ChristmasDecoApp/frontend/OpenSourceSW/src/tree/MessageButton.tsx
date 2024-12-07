import { IconButton, Image, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { atom, useAtomValue, useSetAtom } from "jotai";
import { Suspense, useEffect } from "react";
import { fetchDecoration } from "../backend/Backend";
import { treeIdxAtom } from "../backend/Tree";
import { userAtom } from "../backend/User";
import { ornament } from "../utils/ornaments";

import MessageModal, { DecorationDetailType } from "./MessageModal"

export type DecorationType = {
    idx: number
    nickname: string
    imageIdx: number
}

const initialDecoDetail: DecorationDetailType = {
    idx: -1,
    nickname: "",
    writerIdx: -1,
    imageIdx: 0,
    message: ""
}

const decorationAtom = atom<DecorationDetailType>(initialDecoDetail);
const asyncSetDecoAtom = atom(null, async (_, set, payload: DecorationDetailType) => set(decorationAtom, payload));

const Decoration = ({ idx, nickname, imageIdx }: DecorationType) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();

    const treeIdx = useAtomValue(treeIdxAtom);
    const user = useAtomValue(userAtom);

    const setDeco = useSetAtom(asyncSetDecoAtom);
    const getDeco = useAtomValue(decorationAtom);

    const onClick = async () => {
        try {
            const fetchDeco = await fetchDecoration(treeIdx, idx);

            if (fetchDeco?.isSuccess) {
                setDeco(fetchDeco?.result);

                console.log(fetchDeco)

                onOpen(); // 열기 함수
            }
            else {
                toast({
                    title: "장식품 조회 실패",
                    description: fetchDeco?.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true
                });
            }
        }
        catch {
            toast({
                title: "장식품 조회 실패",
                description: "알 수 없는 오류입니다.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    }

    return (
        <VStack>
            <IconButton aria-label="Decoration" bgColor="transparent" _focus={{ bgColor: "transparent" }} _hover={{ bgColor: "transparent" }} onClick={onClick} icon={
                <Image boxSize="64px" src={ornament(imageIdx)} />
            } />
            <Text fontWeight="bold" fontSize={["14px", "20px"]}>{nickname}</Text>
            <Suspense>
                <MessageModal isOpen={isOpen} onClose={onClose} detail={getDeco} />
            </Suspense>
        </VStack>
    )
}

export default Decoration