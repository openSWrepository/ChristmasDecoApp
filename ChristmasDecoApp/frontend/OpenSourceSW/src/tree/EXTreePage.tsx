// import { Box, Container, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Text } from "@chakra-ui/react"
// import { useAtom, useAtomValue, useSetAtom } from "jotai"
// import { Link, Navigate, useLoaderData, useParams } from "react-router-dom";
// import { useWindowSize } from "../useWindowSize";

// import bgImage from "../assets/background-day.jpg";

// import TreeButton from "./TreeButton";
// import TreeInfo from "./TreeInfo";
// import TreeBody from "./TreeBody";
// import { HamburgerIcon } from "@chakra-ui/icons";
// import { userAtom } from "../backend/User";
// import { Tree, treeIdxAtom } from "../backend/Tree";

// type Decoration = {
//     id: string; // decoration의 key
//     description: string; // decoration의 value
// };

// type TreeData = {
//     treeOwnerNickname: string;
//     decorations: Decoration[];
//     treeIdx: number;
// };


// const TreePage = () => {
//     const { width, height } = useWindowSize();
//     // const { index } = useParams();

//     // const user = useAtomValue(userAtom); // userAtom에 저장된 값을 불러오기 
//     // const setUser = useSetAtom(userAtom);  // 데이터를 쓰면 userAtom에 저장하기
//     // const [treeIdx, setTreeIdx] = useAtom(treeIdxAtom); //treeIdxAtom에 저장된
//     //                                 //atom과 usestate의 다른점 공유상태라는 점
//     // const tree = useLoaderData() as Tree;
//     // const treeId = parseInt(index as string);

//     // if (isNaN(treeId)) { //treeIdrk 숫자가 아닌가?
//     //     console.log("올바르지 않은 URL입니다.");
//     //     setTreeIdx(-1);
//     //     return <Navigate replace to="/trees" />
//     // }
//     // else {
//     //     setTreeIdx(treeId);
//     // }

//     // const onLogOut = () => {
//     //     setUser({ userIdx: -1, jwt: "" });
//     // }

//     const treeData = useLoaderData() as TreeData; // 명시적으로 데이터 타입 지정
//     if (!treeData || !treeData.decorations) {
//         return (
//             <Box bg="gray.100" h="100vh" display="flex" alignItems="center" justifyContent="center">
//                 <Text fontSize="2xl" color="gray.600">
//                     트리를 찾을 수 없습니다. 기본 트리를 설정해주세요!
//                 </Text>
//             </Box>
//         );
//     }

//     return (
//         <Box bgImage={bgImage} bgPos="center" bgSize="cover">
//             <Flex h={height} textStyle="tree" direction="column">
//                 {/* <Flex w={width} h="64px" bgColor="white" px={5} direction="row" align="center">
//                     <Text as={Link} to={"/"} textStyle="logo" fontSize={["24px", "32px"]} color="brand.santaSock">GNU-MAS <Text as="span" color="brand.christmasTree">Tree</Text></Text>
//                     <Spacer />
//                     <Menu>
//                         <MenuButton as={IconButton} bgColor="white" aria-label="Account menu" icon={<HamburgerIcon />} />
//                         {
//                             user.userIdx === -1 ?
//                                 <MenuList textStyle="landing">
//                                     <MenuItem as={Link} to="/signin" style={{ textDecoration: "none" }}>
//                                         로그인
//                                     </MenuItem>
//                                 </MenuList> :
//                                 <MenuList textStyle="landing">
//                                     <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
//                                     <MenuItem as={Link} to={`/edit/${user.userIdx}`} style={{ textDecoration: "none" }}>정보 관리</MenuItem>
//                                 </MenuList>
//                         }
//                     </Menu>
//                 </Flex> */}
//                 <Container height={height} p={5}>
//                     <Flex h="100%" direction="column" justifyContent="space-between">
//                         <TreeInfo nickname={tree.treeOwnerNickname} count={tree.decorations.length} />
//                         <Spacer />
//                         <TreeBody treeIdx={treeId} decorations={tree.decorations} />
//                         <TreeButton treeId={treeId} />
//                     </Flex>
//                 </Container>
//             </Flex>
//         </Box>
//     )
// }

// export default TreePage