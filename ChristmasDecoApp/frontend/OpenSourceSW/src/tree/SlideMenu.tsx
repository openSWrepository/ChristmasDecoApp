import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Image,
    List,
    ListItem,
    Slide,
    Text,
    IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { ornament } from "../utils/ornaments";
import bgImage1 from "../assets/backgrounds/background-1.jpg";
import bgImage2 from "../assets/backgrounds/background-2.jpg";
import bgImage3 from "../assets/backgrounds/background-3.jpg";
import bgImage4 from "../assets/backgrounds/background-4.jpg";
import LetterModal from "./LetterModal";
import NewButton from "./NewButton";
import lpImage1 from "../assets/LP/LP1.png";
import lpImage2 from "../assets/LP/LP2.png";
import lpImage3 from "../assets/LP/LP3.png";
import lpImage4 from "../assets/LP/LP4.png";
import lpImage5 from "../assets/LP/LP5.png";
import lpImage6 from "../assets/LP/LP6.png";
import lpImage7 from "../assets/LP/LP7.png";
import lpImage8 from "../assets/LP/LP8.png";
import lpImage9 from "../assets/LP/LP9.png";
import lpImage10 from "../assets/LP/LP10.png";
import lpImage11 from "../assets/LP/LP11.png";
import lpImage12 from "../assets/LP/LP12.png";
import lpImage13 from "../assets/LP/LP13.png";
import lpImage14 from "../assets/LP/LP14.png";

// 클립보드 복사 함수
const copyToClipboard = (text: string) => {
    navigator.clipboard
        .writeText(text)
        .then(() => alert("URL이 복사되었습니다!"))
        .catch((err) => console.error("클립보드 복사 실패:", err));
};

const SlideMenubar = ({
    isOpen,
    onClose,
    onBackgroundChange,
    onLPChange,
    onAddLetter,
    onAddOrnament,
}: {
    isOpen: boolean;
    onClose: () => void;
    onBackgroundChange: (newBackground: string) => void;
    onLPChange: (newLP: string) => void;
    onAddLetter: (x: number, y: number) => void;
    onAddOrnament: (ornamentSrc: string) => void;
}) => {
    const [isMainOpen, setIsMainOpen] = useState(false);
    const [isFirstOpen, setIsFirstOpen] = useState(false);
    const [isSecondOpen, setIsSecondOpen] = useState(false);
    const [isThirdOpen, setIsThirdOpen] = useState(false);
    const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
    const [isLPMenuOpen, setIsLPMenuOpen] = useState(false);

    const handleAddLetter = () => {
        // 랜덤 좌표 생성
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight - 200); // 상단 200px 제외
        onAddLetter(x, y);
        setIsLetterModalOpen(false);
    };

    const ls = {
        cursor: "pointer",
        borderBottom: "3px solid #e0e0e0",
        pb: 25,
        height: "45px",
        display: "flex",
        alignItems: "center",
        fontSize: "24px",
    };

    const ols = {
        cursor: "pointer",
        borderBottom: "3px solid #e0e0e0",
        pb: 25,
        height: "120px",
        display: "flex",
        alignItems: "center",
        fontSize: "24px",
    };

    // 초대 링크 복사 버튼 클릭 핸들러
    const handleInviteClick = () => {
        const currentUrl = window.location.href; // 현재 URL 가져오기
        copyToClipboard(currentUrl); // 클립보드에 URL 복사
    };

    

    return (
        <>
            {/* 메뉴 버튼 */}
            <IconButton
                aria-label="Menu"
                icon={<HamburgerIcon />}
                bgColor="white"
                onClick={() => setIsMainOpen(true)}
            />
            <Slide direction="right" in={isMainOpen}>
                <Box
                    bgColor="#90EE90"
                    h="100%"
                    w={{ base: "200px", md: "300px" }}
                    position="absolute"
                    top="0"
                    right="0"
                    padding={3}
                    zIndex={10}
                    borderRadius="md"
                    boxShadow="md"
                >
                    <Button
                        onClick={() => setIsMainOpen(false)}
                        variant="ghost"
                        position="absolute"
                        top="10px"
                        right="10px"
                        backgroundColor="white"
                    >
                        <CloseIcon />
                    </Button>
                    <Box
                        backgroundColor="#FFA07A"
                        borderRadius="md"
                        textAlign="center"
                        width="80%"
                    >
                        <Text fontSize="lg" fontWeight="bold" color="brand.santaSock">
                            메뉴
                        </Text>
                    </Box>
                    <Container
                        bgColor="white"
                        h="90%"
                        w="100%"
                        boxShadow="md"
                        borderRadius="md"
                        p={5}
                        overflowY="auto"
                    >
                        <List spacing={3}>
                            <ListItem onClick={() => setIsFirstOpen(true)} style={ls}>
                                롤링페이퍼 작성하기
                            </ListItem>
                            <ListItem onClick={() => setIsThirdOpen(true)} style={ls}>
                                장식품
                            </ListItem>
                            <ListItem onClick={() => setIsSecondOpen(true)} style={ls}>
                                배경 선택
                            </ListItem>
                            <ListItem onClick={() => setIsLPMenuOpen(true)} style={ls}>
                                LP판 선택
                            </ListItem>
                            <ListItem style={ls}>회원정보</ListItem>
                            <ListItem onClick={handleInviteClick} style={ls}>초대하기</ListItem>
                        </List>
                    </Container>
                </Box>
            </Slide>

            {/* 편지 작성 모달 */}
            <LetterModal
                isOpen={isLetterModalOpen}
                onClose={() => setIsLetterModalOpen(false)}
                onAddLetter={handleAddLetter}
            />

            {/* 롤링페이퍼 메뉴 */}
            <Slide direction="right" in={isFirstOpen}>
                <Box
                    bgColor="#90EE90"
                    h="100%"
                    w={{ base: "200px", md: "300px" }}
                    boxShadow="md"
                    position="absolute"
                    borderRadius="md"
                    top="0"
                    right="0"
                    padding={3}
                    paddingX={5}
                    zIndex={11}
                >
                    <Button
                        onClick={() => setIsFirstOpen(false)}
                        variant="ghost"
                        position="absolute"
                        top="10px"
                        right="10px"
                        backgroundColor="white"
                    >
                        <CloseIcon />
                    </Button>
                    <Box
                        backgroundColor="#FFA07A"
                        borderRadius="md"
                        textAlign="center"
                        width="80%"
                        marginBottom="20px"
                    >
                        <Text as="span" fontSize="24px" color="brand.santaSock">
                            롤링페이퍼 작성
                        </Text>
                    </Box>
                    {/* NewButton 컴포넌트 렌더링 */}
                    <NewButton onAddLetter={handleAddLetter} />
                </Box>
            </Slide>

            {/* 장식품 메뉴 */}
            <Slide direction="right" in={isThirdOpen}>
                <Box
                    bgColor="#90EE90"
                    h="100%"
                    w={{ base: "200px", md: "300px" }}
                    boxShadow="md"
                    position="absolute"
                    borderRadius="md"
                    top="0"
                    right="0"
                    padding={3}
                    paddingX={5}
                    zIndex={11}
                >
                    <Button
                        onClick={() => setIsThirdOpen(false)}
                        variant="ghost"
                        position="absolute"
                        top="10px"
                        right="10px"
                        backgroundColor="white"
                    >
                        <CloseIcon />
                    </Button>
                    <Box
                        backgroundColor="#FFA07A"
                        borderRadius="md"
                        textAlign="center"
                        width="80%"
                    >
                        <Text as="span" fontSize="24px" color="brand.santaSock">
                            장식품
                        </Text>
                    </Box>
                    <Container
                        bgColor="white"
                        h="90%"
                        w="100%"
                        boxShadow="md"
                        position="relative"
                        borderRadius="md"
                        p={5}
                        marginY="20px"
                        overflowY="auto"
                    >
                        <List spacing={3}>
                            {Array.from({ length: 24 }, (_, index) => {
                                const ornamentSrc = ornament(index);

                                if (!ornamentSrc) {
                                    return null;
                                }

                                const fileNameWithExt = ornamentSrc.split("/").pop();
                                if (!fileNameWithExt) {
                                    return null;
                                }

                                const fileName = fileNameWithExt.split(".")[0];

                                return (
                                    <ListItem key={index} style={ols}>
                                        <Box
                                            onClick={() => onAddOrnament(ornamentSrc)}
                                            cursor="pointer"
                                            textAlign="center"
                                        >
                                            <Image
                                                src={ornamentSrc}
                                                alt={`Ornament ${index}`}
                                                width="80px"
                                            />
                                            <Text>{fileName}</Text>
                                        </Box>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Container>
                </Box>
            </Slide>

            {/* 배경 선택 메뉴 */}
            <Slide direction="right" in={isSecondOpen}>
                <Box
                    bgColor="#90EE90"
                    h="100%"
                    w={{ base: "200px", md: "300px" }}
                    boxShadow="md"
                    position="absolute"
                    borderRadius="md"
                    top="0"
                    right="0"
                    padding={3}
                    paddingX={5}
                    zIndex={11}
                >
                    <Button
                        onClick={() => setIsSecondOpen(false)}
                        variant="ghost"
                        position="absolute"
                        top="10px"
                        right="10px"
                        backgroundColor="white"
                    >
                        <CloseIcon />
                    </Button>
                    <Box
                        backgroundColor="#FFA07A"
                        borderRadius="md"
                        textAlign="center"
                        width="80%"
                    >
                        <Text as="span" fontSize="24px" color="brand.santaSock">
                            배경 선택
                        </Text>
                    </Box>
                    <Box
                        bgColor="white"
                        h="90%"
                        w="100%"
                        boxShadow="md"
                        borderRadius="md"
                        position="relative"
                        p={5}
                        marginY="20px"
                        overflowY="auto"
                    >
                        <List spacing={3}>
                            {[bgImage1, bgImage2, bgImage3, bgImage4].map((image, index) => (
                                <ListItem key={index}>
                                    <Image
                                        src={image}
                                        alt={`배경 ${index + 1}`}
                                        cursor="pointer"
                                        onClick={() => onBackgroundChange(image)}
                                        width="240px"
                                        height="135px"
                                        objectFit="cover"
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Slide>

            {/* LP판 선택 메뉴 */}
            <Slide direction="right" in={isLPMenuOpen}>
                <Box
                    bgColor="#90EE90"
                    h="100%"
                    w={{ base: "200px", md: "300px" }}
                    boxShadow="md"
                    position="absolute"
                    borderRadius="md"
                    top="0"
                    right="0"
                    padding={3}
                    paddingX={5}
                    zIndex={11}
                >
                    <Button
                        onClick={() => setIsLPMenuOpen(false)}
                        variant="ghost"
                        position="absolute"
                        top="10px"
                        right="10px"
                        backgroundColor="white"
                    >
                        <CloseIcon />
                    </Button>
                    <Box
                        backgroundColor="#FFA07A"
                        borderRadius="md"
                        textAlign="center"
                        width="80%"
                    >
                        <Text as="span" fontSize="24px" color="brand.santaSock">
                            LP판 선택
                        </Text>
                    </Box>
                    <Box
                        bgColor="white"
                        h="90%"
                        w="100%"
                        boxShadow="md"
                        position="relative"
                        borderRadius="md"
                        p={5}
                        marginY="20px"
                        overflowY="auto"
                    >
                        <List spacing={3}>
                            {[
                                lpImage1,
                                lpImage2,
                                lpImage3,
                                lpImage4,
                                lpImage5,
                                lpImage6,
                                lpImage7,
                                lpImage8,
                                lpImage9,
                                lpImage10,
                                lpImage11,
                                lpImage12,
                                lpImage13,
                                lpImage14,
                            ].map((image, index) => (
                                <ListItem style={ols} key={index}>
                                    <Image
                                        src={image}
                                        alt={`LP판 ${index + 1}`}
                                        cursor="pointer"
                                        onClick={() => onLPChange(image)}
                                        width="120px"
                                        height="120px"
                                        objectFit="cover"
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Slide>
        </>
    );
};

export default SlideMenubar;






// import React, { useState } from "react";
// import {
//     Box,
//     Button,
//     Container,
//     Image,
//     List,
//     ListItem,
//     Slide,
//     Text,
//     IconButton,
// } from "@chakra-ui/react";
// import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
// import { ornament } from "../utils/ornaments";
// import bgImage1 from "../assets/backgrounds/background-1.jpg";
// import bgImage2 from "../assets/backgrounds/background-2.jpg";
// import bgImage3 from "../assets/backgrounds/background-3.jpg";
// import bgImage4 from "../assets/backgrounds/background-4.jpg";
// import letterdeco from "../assets/ornaments/letterdeco.png";
// import LetterModal from "./LetterModal";
// import NewButton from "./NewButton";
// import lpImage1 from "../assets/LP/LP1.png";
// import lpImage2 from "../assets/LP/LP2.png";
// import lpImage3 from "../assets/LP/LP3.png";
// import lpImage4 from "../assets/LP/LP4.png";
// import lpImage5 from "../assets/LP/LP5.png";
// import lpImage6 from "../assets/LP/LP6.png";
// import lpImage7 from "../assets/LP/LP7.png";
// import lpImage8 from "../assets/LP/LP8.png";
// import lpImage9 from "../assets/LP/LP9.png";
// import lpImage10 from "../assets/LP/LP10.png";
// import lpImage11 from "../assets/LP/LP11.png";
// import lpImage12 from "../assets/LP/LP12.png";
// import lpImage13 from "../assets/LP/LP13.png";
// import lpImage14 from "../assets/LP/LP14.png";

// // 클립보드 복사 함수
// const copyToClipboard = (text: string) => {
//     navigator.clipboard
//         .writeText(text)
//         .then(() => alert("URL이 복사되었습니다!"))
//         .catch((err) => console.error("클립보드 복사 실패:", err));
// };

// const SlideMenubar = ({
//     isOpen,
//     onClose,
//     onBackgroundChange,
//     onLPChange,
//     onAddLetter,
//     onAddOrnament,
// }: {
//     isOpen: boolean;
//     onClose: () => void;
//     onBackgroundChange: (newBackground: string) => void;
//     onLPChange: (newLP: string) => void;
//     onAddLetter: (x: number, y: number) => void;
//     onAddOrnament: (ornamentSrc: string) => void;
// }) => {
//     const [isMainOpen, setIsMainOpen] = useState(false);
//     const [isFirstOpen, setIsFirstOpen] = useState(false);
//     const [isSecondOpen, setIsSecondOpen] = useState(false);
//     const [isThirdOpen, setIsThirdOpen] = useState(false);
//     const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
//     const [isLPMenuOpen, setIsLPMenuOpen] = useState(false);

//     const handleAddLetter = () => {
//         // 랜덤 좌표 생성
//         const x = Math.random() * window.innerWidth;
//         const y = Math.random() * (window.innerHeight - 200); // 상단 200px 제외
//         onAddLetter(x, y);
//         setIsLetterModalOpen(false);
//     };

//     const ls = {
//         cursor: "pointer",
//         borderBottom: "3px solid #e0e0e0",
//         pb: 25,
//         height: "45px",
//         display: "flex",
//         alignItems: "center",
//         fontSize: "24px",
//     };

//     const ols = {
//         cursor: "pointer",
//         borderBottom: "3px solid #e0e0e0",
//         pb: 25,
//         height: "120px",
//         display: "flex",
//         alignItems: "center",
//         fontSize: "24px",
//     };

//     // 초대 링크 복사 버튼 클릭 핸들러
//     const handleInviteClick = () => {
//         const currentUrl = window.location.href; // 현재 URL 가져오기
//         copyToClipboard(currentUrl); // 클립보드에 URL 복사
//     };

//     return (
//         <>
//             {/* 메뉴 버튼 */}
//             <IconButton
//                 aria-label="Menu"
//                 icon={<HamburgerIcon />}
//                 bgColor="white"
//                 onClick={() => setIsMainOpen(true)}
//             />
//             <Slide direction="right" in={isMainOpen}>
//                 <Box
//                     bgColor="#90EE90"
//                     h="100%"
//                     w={{ base: "200px", md: "300px" }}
//                     position="absolute"
//                     top="0"
//                     right="0"
//                     padding={3}
//                     zIndex={10}
//                     borderRadius="md"
//                     boxShadow="md"
//                 >
//                     <Button
//                         onClick={() => setIsMainOpen(false)}
//                         variant="ghost"
//                         position="absolute"
//                         top="10px"
//                         right="10px"
//                         backgroundColor="white"
//                     >
//                         <CloseIcon />
//                     </Button>
//                     <Box
//                         backgroundColor="#FFA07A"
//                         borderRadius="md"
//                         textAlign="center"
//                         width="80%"
//                     >
//                         <Text fontSize="lg" fontWeight="bold" color="brand.santaSock">
//                             메뉴
//                         </Text>
//                     </Box>
//                     <Container
//                         bgColor="white"
//                         h="90%"
//                         w="100%"
//                         boxShadow="md"
//                         borderRadius="md"
//                         p={5}
//                         overflowY="auto"
//                     >
//                         <List spacing={3}>
//                             <ListItem onClick={() => setIsFirstOpen(true)} style={ls}>
//                                 롤링페이퍼 작성하기
//                             </ListItem>
//                             <ListItem onClick={() => setIsThirdOpen(true)} style={ls}>
//                                 장식품
//                             </ListItem>
//                             <ListItem onClick={() => setIsSecondOpen(true)} style={ls}>
//                                 배경 선택
//                             </ListItem>
//                             <ListItem onClick={() => setIsLPMenuOpen(true)} style={ls}>
//                                 LP판 선택
//                             </ListItem>
//                             <ListItem style={ls}>회원정보</ListItem>
//                             <ListItem style={ls}>초대하기</ListItem>
//                         </List>
//                     </Container>
//                 </Box>
//             </Slide>

//             {/* 편지 작성 모달 */}
//             <LetterModal
//                 isOpen={isLetterModalOpen}
//                 onClose={() => setIsLetterModalOpen(false)}
//                 onAddLetter={handleAddLetter}
//             />

//             {/* 롤링페이퍼 메뉴 */}
//             <Slide direction="right" in={isFirstOpen}>
//                 <Box
//                     bgColor="#90EE90"
//                     h="100%"
//                     w={{ base: "200px", md: "300px" }}
//                     boxShadow="md"
//                     position="absolute"
//                     borderRadius="md"
//                     top="0"
//                     right="0"
//                     padding={3}
//                     paddingX={5}
//                     zIndex={11}
//                 >
//                     <Button
//                         onClick={() => setIsFirstOpen(false)}
//                         variant="ghost"
//                         position="absolute"
//                         top="10px"
//                         right="10px"
//                         backgroundColor="white"
//                     >
//                         <CloseIcon />
//                     </Button>
//                     <Box
//                         backgroundColor="#FFA07A"
//                         borderRadius="md"
//                         textAlign="center"
//                         width="80%"
//                         marginBottom="20px"
//                     >
//                         <Text as="span" fontSize="24px" color="brand.santaSock">
//                             롤링페이퍼 작성
//                         </Text>
//                     </Box>
//                     {/* NewButton 컴포넌트 렌더링 */}
//                     <NewButton onAddLetter={handleAddLetter} />
//                 </Box>
//             </Slide>

//             {/* 장식품 메뉴 */}
//             <Slide direction="right" in={isThirdOpen}>
//                 <Box
//                     bgColor="#90EE90"
//                     h="100%"
//                     w={{ base: "200px", md: "300px" }}
//                     boxShadow="md"
//                     position="absolute"
//                     borderRadius="md"
//                     top="0"
//                     right="0"
//                     padding={3}
//                     paddingX={5}
//                     zIndex={11}
//                 >
//                     <Button
//                         onClick={() => setIsThirdOpen(false)}
//                         variant="ghost"
//                         position="absolute"
//                         top="10px"
//                         right="10px"
//                         backgroundColor="white"
//                     >
//                         <CloseIcon />
//                     </Button>
//                     <Box
//                         backgroundColor="#FFA07A"
//                         borderRadius="md"
//                         textAlign="center"
//                         width="80%"
//                     >
//                         <Text as="span" fontSize="24px" color="brand.santaSock">
//                             장식품
//                         </Text>
//                     </Box>
//                     <Container
//                         bgColor="white"
//                         h="90%"
//                         w="100%"
//                         boxShadow="md"
//                         position="relative"
//                         borderRadius="md"
//                         p={5}
//                         marginY="20px"
//                         overflowY="auto"
//                     >
//                         <List spacing={3}>
//                             {Array.from({ length: 24 }, (_, index) => {
//                                 const ornamentSrc = ornament(index);

//                                 if (!ornamentSrc) {
//                                     return null;
//                                 }

//                                 const fileNameWithExt = ornamentSrc.split("/").pop(); // 경로에서 파일명과 확장자 추출
//                                 if (!fileNameWithExt) {
//                                     return null;
//                                 }

//                                 const fileName = fileNameWithExt.split(".")[0];

//                                 return (
//                                     <ListItem key={index} style={ols}>
//                                         <Box
//                                             onClick={() => onAddOrnament(ornamentSrc)} // 클릭 시 장식품 추가
//                                             cursor="pointer"
//                                             textAlign="center"
//                                         >
//                                             <Image
//                                                 src={ornamentSrc}
//                                                 alt={`Ornament ${index}`}
//                                                 width="80px"
//                                             />
//                                             <Text>{fileName}</Text> {/* 확장자 제외한 파일명만 출력 */}
//                                         </Box>
//                                     </ListItem>
//                                 );
//                             })}
//                         </List>
//                     </Container>
//                 </Box>
//             </Slide>

//             {/* 배경 선택 메뉴 */}
//             <Slide direction="right" in={isSecondOpen}>
//                 <Box
//                     bgColor="#90EE90"
//                     h="100%"
//                     w={{ base: "200px", md: "300px" }}
//                     boxShadow="md"
//                     position="absolute"
//                     borderRadius="md"
//                     top="0"
//                     right="0"
//                     padding={3}
//                     paddingX={5}
//                     zIndex={11}
//                 >
//                     <Button
//                         onClick={() => setIsSecondOpen(false)}
//                         variant="ghost"
//                         position="absolute"
//                         top="10px"
//                         right="10px"
//                         backgroundColor="white"
//                     >
//                         <CloseIcon />
//                     </Button>
//                     <Box
//                         backgroundColor="#FFA07A"
//                         borderRadius="md"
//                         textAlign="center"
//                         width="80%"
//                     >
//                         <Text as="span" fontSize="24px" color="brand.santaSock">
//                             배경 선택
//                         </Text>
//                     </Box>
//                     <Box
//                         bgColor="white"
//                         h="90%"
//                         w="100%"
//                         boxShadow="md"
//                         borderRadius="md"
//                         position="relative"
//                         p={5}
//                         marginY="20px"
//                         overflowY="auto"
//                     >
//                         <List spacing={3}>
//                             {[bgImage1, bgImage2, bgImage3, bgImage4].map((image, index) => (
//                                 <ListItem key={index}>
//                                     <Image
//                                         src={image}
//                                         alt={`배경 ${index + 1}`}
//                                         cursor="pointer"
//                                         onClick={() => onBackgroundChange(image)}
//                                         width="240px"
//                                         height="135px"
//                                         objectFit="cover"
//                                     />
//                                 </ListItem>
//                             ))}
//                         </List>
//                     </Box>
//                 </Box>
//             </Slide>

//             {/* LP판 선택 메뉴 */}
//             <Slide direction="right" in={isLPMenuOpen}>
//                 <Box
//                     bgColor="#90EE90"
//                     h="100%"
//                     w={{ base: "200px", md: "300px" }}
//                     boxShadow="md"
//                     position="absolute"
//                     borderRadius="md"
//                     top="0"
//                     right="0"
//                     padding={3}
//                     paddingX={5}
//                     zIndex={11}
//                 >
//                     <Button
//                         onClick={() => setIsLPMenuOpen(false)}
//                         variant="ghost"
//                         position="absolute"
//                         top="10px"
//                         right="10px"
//                         backgroundColor="white"
//                     >
//                         <CloseIcon />
//                     </Button>
//                     <Box
//                         backgroundColor="#FFA07A"
//                         borderRadius="md"
//                         textAlign="center"
//                         width="80%"
//                     >
//                         <Text as="span" fontSize="24px" color="brand.santaSock">
//                             LP판 선택
//                         </Text>
//                     </Box>
//                     <Box
//                         bgColor="white"
//                         h="90%"
//                         w="100%"
//                         boxShadow="md"
//                         position="relative"
//                         borderRadius="md"
//                         p={5}
//                         marginY="20px"
//                         overflowY="auto"
//                     >
//                         <List spacing={3}>
//                             {[
//                                 lpImage1,
//                                 lpImage2,
//                                 lpImage3,
//                                 lpImage4,
//                                 lpImage5,
//                                 lpImage6,
//                                 lpImage7,
//                                 lpImage8,
//                                 lpImage9,
//                                 lpImage10,
//                                 lpImage11,
//                                 lpImage12,
//                                 lpImage13,
//                                 lpImage14,
//                             ].map((image, index) => (
//                                 <ListItem style={ols} key={index}>
//                                     <Image
//                                         src={image}
//                                         alt={`LP판 ${index + 1}`}
//                                         cursor="pointer"
//                                         onClick={() => onLPChange(image)}
//                                         width="120px"
//                                         height="120px"
//                                         objectFit="cover"
//                                     />
//                                 </ListItem>
//                             ))}
//                         </List>
//                     </Box>
//                 </Box>
//             </Slide>
//         </>
//     );
// };

// export default SlideMenubar;


