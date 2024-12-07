import { Box, Button, Center, Flex, Image, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, VStack } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom";

import { useWindowSize } from "./useWindowSize"

import decoratedTree from "./assets/decorated-tree.svg"
import resourcesImage from "./assets/resources.svg"
import wreathImage from "./assets/wreath.svg"
import { useAtom } from "jotai";
import { userAtom } from "./backend/User";

const Landing = () => {
    const { height } = useWindowSize();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [user] = useAtom(userAtom);

    return (
        <Box textStyle="landing">
            <Center w="full" h="64px" px="5" textStyle="landing" bgColor="brand.fallingSnow">
                <Text fontSize={["24px", "32px"]} textStyle="logo" color="brand.santaSock">크리스마스 기념 <Text as="span" color="brand.christmasTree">오픈소스 프로젝트</Text></Text>
            </Center>
            <Flex h={height} wrap="wrap" alignContent="center" alignItems="center" justifyContent="center" gap="5em" color="brand.fallingSnow" bgColor="brand.nightSky">
                <Center boxSize={["xs", "sm"]}>
                    <Image w="85%" h="85%" src={wreathImage} />
                </Center>
                <VStack spacing="10">
                    <Text fontSize={["24px", "32px"]}>
                        특별한 날에만 전하는<br />말하지 못한 마음 속 이야기<br />학우들과 나누어보아요!
                    </Text>
                    {
                      /*  user.userIdx === -1 ? */<Button as={RouterLink} to="signin" color="brand.nightSky" w="full">로그인해서 확인하기</Button>
                            //: <Button as={RouterLink} to={`trees/${user.userIdx}`} color="brand.nightSky" w="full">내 트리 확인하기</Button>

                    }
                </VStack>
            </Flex>
            <Flex h={height} wrap="wrap" alignContent="center" alignItems="center" justifyContent="center" gap="5em" color="brand.fallingSnow" bgColor="brand.dawnSky">
                <VStack spacing="10">
                    <Text fontSize={["24px", "32px"]}>
                        원본 서비스인<br />"내 트리를 꾸며줘" 와 "경상국립대학교 GNU-Tree"에도<br />많은 관심 부탁드려요!
                    </Text>
                    <Button as={Link} href="https://colormytree.me/" style={{ textDecoration: "none" }} color="brand.nightSky" w="full">보러가기</Button>
                </VStack>
                <Box boxSize={["xs", "sm"]}>
                    <Image src={decoratedTree} />
                </Box>
            </Flex>
            <Flex h={height} wrap="wrap" alignContent="center" alignItems="center" justifyContent="center" gap="5em" color="brand.fallingSnow" bgColor="brand.nightSky">
                <Center boxSize={["xs", "sm"]}>
                    <Image w="85%" h="85%" src={resourcesImage} objectFit="contain" />
                </Center>
                <VStack spacing="10">
                    <Text fontSize={["24px", "32px"]}>
                        서비스 제작에 사용된<br />리소스들의 출처는<br />다음과 같습니다!
                    </Text>
                    <Button w="full" color="brand.nightSky" onClick={onOpen}>확인하기</Button>
                    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" isCentered>
                        <ModalOverlay />
                        <ModalContent textStyle="landing">
                            <ModalHeader>
                                <Center>출처 표시가 필요한 리소스</Center>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Flex direction="column" gap={5} align="center">
                                    <Link
                                        isExternal
                                        href="https://www.freepik.com/free-vector/big-set-christmas-tree-design-different-layout_32528965.htm"
                                        color="brand.nightSky"
                                    >트리 이미지</Link>
                                    <Link
                                        isExternal
                                        href="https://www.vecteezy.com/vector-art/14484834-eco-rustic-interior-living-room-in-minimal-style"
                                        color="brand.nightSky"
                                    >트리 배경 이미지</Link>
                                </Flex>
                            </ModalBody>
                            <ModalFooter>
                                <Button w="full" onClick={onClose}>
                                    확인
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </VStack>
            </Flex>
        </Box>
    )
}

export default Landing