import { Card, Flex, HStack, IconButton, Text } from "@chakra-ui/react"

import Decoration, { DecorationType } from "./Decoration"

import treeImage from "../assets/tree.svg"
import { useWindowSize } from "../useWindowSize"
import { useMemo, useState } from "react"; //useMemo : 렌더링 최적화 [의존성배열] 안에 있는것이 변경되었을때만 함수 실행
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { range } from "../utils/utils";

interface Paginator {
    length: number // 전체 페이지 수 
    height: number 
    page: (index: number) => DecorationType[] // 특정페이지의 데이터를 반환하는 함수
}

// height: line of decorations
const paginate = (input: DecorationType[], height: number): Paginator => {
    const triangularRange = range(height, 1).map(i => i * (i + 1) / 2);

    const size = triangularRange[height - 1];

    const length = Math.ceil(input.length / size);

    const page = (index: number) => (0 <= index && index < length) ? input.slice(index * size, index * size + size) : [];

    return {
        length: length,
        height: height,
        page: page
    }
}

type Decorated = {
    height: number
    lines: DecorationType[][]
}

const decorate = (input: DecorationType[], height: number): Decorated => {
    const idxRange = range(height, 1);
    const triangularRange = range(height, 0).map(i => i * (i + 1) / 2);

    const split = idxRange.map((val, idx) => input.slice(triangularRange[idx], triangularRange[idx] + val));

    return {
        height: height,
        lines: split
    }
}

type TreeBodyType = {
    treeIdx: number
    decorations: DecorationType[]
}

const TreeBody = ({ decorations }: TreeBodyType) => {
    const [pageIndex, setPageIndex] = useState(0);

    // height / 100 * 57은 Firefox 반응형 디자인 모드를 이용하여 발견한 최적 높이
    // https://firefox-source-docs.mozilla.org/devtools-user/responsive_design_mode/index.html
    const { height } = useWindowSize();
    const treeHeight = height / 100 * 57;

    const paginator = useMemo(() => paginate(decorations, 3), [decorations]);

    return (
        <Flex bgImage={treeImage} h={treeHeight} bgPos="center" bgSize="contain" bgRepeat="no-repeat" align="center" justify="space-between">
            <IconButton
                disabled={pageIndex === 0}
                aria-label="Previous page"
                bgColor="transparent"
                onClick={() => setPageIndex(pageIndex - 1)}
                icon={<ArrowLeftIcon />}
            />
            <Flex h="85%" direction="column" justify="space-between" align="center">
                <Flex flex={1} direction="column" justify="space-around" align="center">
                    {
                        decorate(paginator.page(pageIndex), paginator.height).lines.map((value, index) => (
                            <HStack key={index} gap={5}>
                                {value.map(item => <Decoration key={item.idx} idx={item.idx} imageIdx={item.imageIdx} nickname={item.nickname} />)}
                            </HStack>
                        ))
                    }
                </Flex>
                <Card as={Flex} fontSize={["16px", "20px"]} bgColor="whiteAlpha.800" direction="row">
                    {
                        range(paginator.length, 0).map(
                            item => item === pageIndex ? <Text key={item} fontWeight="bold" color="brand.santaSock" px={3} py={1}>{item + 1}</Text> :
                                <Text key={item} px={3} py={1}>{item + 1}</Text>
                        )
                    }
                </Card>
            </Flex>
            <IconButton
                disabled={paginator.length === 0 || pageIndex === paginator.length - 1}
                aria-label="Next page"
                bgColor="transparent"
                onClick={() => setPageIndex(pageIndex + 1)}
                icon={<ArrowRightIcon />}
            />
        </Flex>
    )
}

export default TreeBody