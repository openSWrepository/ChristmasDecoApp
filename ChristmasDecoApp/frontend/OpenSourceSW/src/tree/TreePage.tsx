import { Box, Container, Flex, Spacer, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";


type Decoration = {
    id: string; // decoration의 key
    description: string; // decoration의 value
};

type TreeData = {
    treeOwnerNickname: string;
    decorations: Decoration[];
    treeIdx: number;
};



const TreePage = () => {
    const treeData = useLoaderData() as TreeData; // 명시적으로 데이터 타입 지정
    if (!treeData || !treeData.decorations) {
        return (
            <Box bg="gray.100" h="100vh" display="flex" alignItems="center" justifyContent="center">
                <Text fontSize="2xl" color="gray.600">
                    트리를 찾을 수 없습니다. 기본 트리를 설정해주세요!
                </Text>
            </Box>
        );
    }
    
    return (
        <Box bg="gray.100" minHeight="100vh">
            <Container>
                <Text fontSize="2xl" fontWeight="bold">
                    {treeData.treeOwnerNickname}님의 트리
                </Text>
                <Text>트리 ID: {treeData.treeIdx}</Text>
                <ul>
                    {treeData.decorations.map((decoration) => (
                        <li key={decoration.id}>
                            {decoration.id}: {decoration.description}
                        </li>
                    ))}
                </ul>
            </Container>
        </Box>
    );
};

export default TreePage;
