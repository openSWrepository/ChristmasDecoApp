import React, { useState, useEffect, useRef } from "react";
import { Box, Text, IconButton, Image } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { treePositionAtom } from "../backend/Tree";
import treeSvg from '../assets/tree.svg';

const Tree = ({
    ornaments,
}: {
    ornaments: { imageSrc: string; zoneIndex: number }[];
}) => {
    const treeRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({ x: 0, y: 0 }); // 초기 위치 설정
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 }); // 드래그할 때의 오프셋 상태 변수
    const [dragging, setDragging] = useState(false); // 드래그 중인지 여부를 나타내는 상태 변수

    // 트리의 크기를 얻기 위한 상태
    const [treeSize, setTreeSize] = useState({ width: 0, height: 0 });

    // 컴포넌트가 마운트될 때 트리의 크기를 측정하고 초기 위치를 설정
    useEffect(() => {
        if (treeRef.current) {
            const rect = treeRef.current.getBoundingClientRect();
            setTreeSize({ width: rect.width, height: rect.height });
            // 초기 위치를 화면 가운데로 설정
            setPosition({
                x: window.innerWidth / 2 - rect.width / 2, // 화면 가로 중간 위치
                y: window.innerHeight / 2 - rect.height / 2, // 화면 세로 중간 위치
            });
        }
    }, []);

    // 드래그 시작 핸들러
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
        setDragging(true); // 드래그 상태 활성화
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - dragOffset.x, // 마우스 위치에서 오프셋을 뺀 x 좌표로 트리 위치 설정
            y: e.clientY - dragOffset.y, // 마우스 위치에서 오프셋을 뺀 y 좌표로 트리 위치 설정
        });
    };

    // 드래그 종료 핸들러
    const handleMouseUp = () => {
        setDragging(false); // 드래그 상태 비활성화
    };

    useEffect(() => {
        if (dragging) {
            window.addEventListener("mousemove", handleMouseMove); // 마우스 이동 이벤트 리스너 추가
            window.addEventListener("mouseup", handleMouseUp); // 마우스 버튼을 놓는 이벤트 리스너 추가
        } else {
            window.removeEventListener("mousemove", handleMouseMove); // 마우스 이동 이벤트 리스너 제거
            window.removeEventListener("mouseup", handleMouseUp); // 마우스 버튼을 놓는 이벤트 리스너 제거
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove); // 컴포넌트 언마운트 시 마우스 이동 이벤트 리스너 제거
            window.removeEventListener("mouseup", handleMouseUp); // 컴포넌트 언마운트 시 마우스 버튼을 놓는 이벤트 리스너 제거
        };
    }, [dragging, dragOffset]);

    const zones = [
        // 다이아몬드 모양으로 배치
        { xPercent: 50, yPercent: 10 },
        { xPercent: 45, yPercent: 20 },
        { xPercent: 55, yPercent: 20 },
        { xPercent: 40, yPercent: 30 },
        { xPercent: 60, yPercent: 30 },
        { xPercent: 45, yPercent: 40 },
        { xPercent: 55, yPercent: 40 },
        { xPercent: 50, yPercent: 50 },
        { xPercent: 25, yPercent: 60 },
        { xPercent: 75, yPercent: 60 },
        { xPercent: 20, yPercent: 70 },
        { xPercent: 80, yPercent: 70 },
        { xPercent: 25, yPercent: 80 },
        { xPercent: 75, yPercent: 80 },
        { xPercent: 50, yPercent: 85 },
    ];

    return (
        <Box
            ref={treeRef}
            position="absolute"
            top={`${position.y}px`}
            left={`${position.x}px`}
            width="auto"
            height="700px"
            bgColor="transparent"
            onMouseDown={handleMouseDown}
            cursor="grab"
            userSelect="none"
        >
            <Box position="relative" width="100%" height="100%">
                <Image
                    src={treeSvg}
                    width="100%"
                    height="100%"
                    objectFit="contain"
                    draggable={false}
                />
                {/* 장식품 렌더링 */}
                {ornaments.map((ornament) => {
                    const zone = zones[ornament.zoneIndex];
                    return (
                        <Image
                            key={ornament.zoneIndex}
                            src={ornament.imageSrc}
                            position="absolute"
                            left={`${zone.xPercent}%`}
                            top={`${zone.yPercent}%`}
                            width="50px"
                            height="50px"
                            transform="translate(-50%, -50%)"
                            draggable={false}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};

export default Tree;