import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Image,
    Text,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { userAtom } from "../backend/User";
import { ornament } from "../utils/ornaments";

const MessageModal = ({ isOpen, onClose, detail }) => {
    const user = useAtomValue(userAtom);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <Card>
                        <CardHeader>
                            <Image src={ornament(detail.imageIdx)} />
                        </CardHeader>
                        <CardBody>{detail.message}</CardBody>
                        <CardFooter>- {detail.nickname}</CardFooter>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    {/* {user.userIdx === detail.writerIdx ? ( */}
                        <Flex direction="column">
                            <Button>삭제</Button>
                            <Button onClick={onClose}>닫기</Button>
                        </Flex>
                    {/* ) : (
                        <Button onClick={onClose}>닫기</Button>
                    )} */}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default MessageModal;
