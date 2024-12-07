import React, { useState, useEffect } from "react"; // useState : React 훅으로, 컴포넌트 내에서 상태를 선언하고 관리
import {
    Box, Button,
    Center,Container,
    Flex,IconButton,
    Image,Spacer,
    Text,useDisclosure,
} from "@chakra-ui/react";
import { Link, Navigate, useLoaderData, useParams } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import bgImage1 from "../assets/backgrounds/background-2.jpg";
import snowflake from "../assets/weather/Snow.png"; 
import { useWindowSize } from "../useWindowSize";
import "./snowflake.css";
import SlideMenubar from "./SlideMenu";
import LP_Player from "./LP_Player";
import TreeImg from "./Tree";
import letterdeco from "../assets/ornaments/letterdeco.png";

import { userAtom } from "../backend/User";
import { Tree, treeIdxAtom, treeOwnerNicknameAtom } from "../backend/Tree";
import LetterDeco from "./LetterDeco";
import { treePositionAtom } from "../backend/Tree";
import { lettersAtom } from "../backend/Tree";

type Decoration = {
    id: string; // decoration의 key
    description: string; // decoration의 value
};

type TreeData = {
    treeOwnerNickname: string;
    decorations: Decoration[];
    treeId: number;
};

const TestPage = () => {
    const { index } = useParams();
    const { width, height } = useWindowSize();
    const { isOpen, onToggle } = useDisclosure();
    
    const user = useAtomValue(userAtom);
    const setUser = useSetAtom(userAtom);
    const [treeIdx, setTreeIdx] = useAtom(treeIdxAtom);
    const tree = useLoaderData() as Tree;
    const treeId = parseInt(index as string);

    const [isSnowing, setIsSnowing] = useState(false); //[눈내리는상태(초기값 false): 상태 값을 업데이트하기위한 함수]
    const [backgroundImage, setBackgroundImage] = useState(bgImage1); // 페이지 배경 상태
    const [isSlideOpen, setIsSlideOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false); // 드래그 상태
    
    const handleSnowToggle = () => { setIsSnowing(!isSnowing); };   
    // 이 함수가 작동하면 false-> true, true->false 가 된다

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [letters, setLetters] = useAtom(lettersAtom);
    const [treePosition] = useAtom(treePositionAtom);
    const [lpImage, setLPImage] = useState(""); // LP 이미지 상태 추가
    const treeData = useLoaderData() as TreeData; // 명시적으로 데이터 타입 지정
    
    const [treeOrnaments, setTreeOrnaments] = useState<
        { imageSrc: string; zoneIndex: number }[]
    >([]);
    const [nextZoneIndex, setNextZoneIndex] = useState(0);

    const handleAddOrnament = (ornamentSrc: string) => {
        if (nextZoneIndex < 15) {
            setTreeOrnaments((prev) => [
                ...prev,
                { imageSrc: ornamentSrc, zoneIndex: nextZoneIndex },
            ]);
            setNextZoneIndex(nextZoneIndex + 1);
        } else {
            alert("모든 구역이 채워졌습니다.");
        }
    };
    
    const setTreeOwnerNickname = useSetAtom(treeOwnerNicknameAtom);
    useEffect(() => {
    if (treeData?.treeOwnerNickname) {
        setTreeOwnerNickname(treeData.treeOwnerNickname); // 상태값 업데이트
    }
}, [treeData, setTreeOwnerNickname]);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleAddLetter = () => {
        setLetters((prev) => [
            ...prev,
            { id: Date.now(), x: 200, y: 200 }, // 기본 위치 설정
        ]);
    };


    return (
        <Box bgImage={backgroundImage}
            bgPos="center"
            bgSize="cover"
            height="100vh"
            overflow="hidden">

            {/* Header */}
            <Flex h={height} direction="column" textStyle="tree">
                <Flex w={width} h="64px" bgColor="#FFA07A" px={5} align="center" style={{ zIndex: 100 }}>
                    <Text as={Link} to="/" fontSize={["24px", "36px"]} color="brand.santaSock">
                        KGU-MAS <Text as={Link} to={"/"} color="brand.christmasTree">Tree</Text>
                    </Text>
                    <Spacer />
                    {/* Snow Toggle Button */}
                    <Box mr={5}>
                        <Button onClick={handleSnowToggle} bg="w=Pink" boxShadow="lg" borderRadius="md">
                            <Image src={snowflake} alt="Snow Button" w="30px" h="30px" />
                        </Button>
                    </Box>
                    <Box mr={5}>
                        <Text as={Link} to="/signIn" fontSize={["19px", "28px"]} color="brand.santaSock">
                            로그인
                            <Text as={Link} to={`/edit/${user.userIdx}`} color="brand.christmasTree">
                                {" "} 로그아웃
                            </Text>
                        </Text>
                    </Box>

                    {/* SlideMenubar */}
                    <SlideMenubar
                        isOpen={isSlideOpen}
                        onClose={onToggle}
                        onBackgroundChange={setBackgroundImage}
                        onAddLetter={handleAddLetter}
                        onLPChange={setLPImage} // LP 이미지 변경 핸들러 추가
                        onAddOrnament={handleAddOrnament}
                    />
                    {isSnowing && (  // 둘다 true여야하므로 handleSnowToggle이 눌려서 false-> true가 되면 작동
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            width="150%"
                            height="height"
                            pointerEvents="none"
                            overflow="visible"
                        >
                            {[...Array(10)].map((_, index) => (
                                <div
                                    key={index}
                                    className="snowflake"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * -10}s`
                                    }}
                                />
                            ))}
                        </Box>
                    )}
                </Flex>

                {/* Main Content */}
                <Container height={height} p={5}>
                    <Flex h="100%" direction="column" justifyContent="space-between" zIndex={7}>
                        <TreeImg ornaments={treeOrnaments}/>
                        <Box width="100%" h="85%" position="relative" justifyContent="center" alignItems="center">
                                {letters.map((letter) => (
                                    <LetterDeco
                                        key={letter.id}
                                        id={letter.id}
                                        initialX={letter.x}
                                        initialY={letter.y}
                                    />
                                ))}                         
                            <LP_Player lpImage={lpImage} /> {/* LP 이미지 상태 전달 */}
                        </Box>
                    </Flex>
                </Container>
            </Flex>
        </Box>

    );
};

export default TestPage;
