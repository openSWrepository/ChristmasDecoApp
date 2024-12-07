import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    Flex,
    Text,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { userAtom } from "../backend/User";
import letterbg from "../assets/letter-background.jpg";

// Props 타입 선언
interface ReadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReadModal: React.FC<ReadModalProps> = ({ isOpen, onClose }) => {
    const user = useAtomValue(userAtom);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent
                 textStyle="tree"
                fontSize={["24px", "28px"]}
                bgImage={letterbg}
                bgPos="30%"
            >
                <ModalHeader>닉네임</ModalHeader>
                <ModalBody>
                    <Text fontSize="md" color="gray.700">
                                여기에 메세지 내용이 표시됩니다.
                    </Text>
                </ModalBody>
                <ModalFooter>
                    {/* {user.userIdx === detail.ReaderIdx ? (  //읽는 사람이 트리주인이면 메세지 삭제하는 기능 있음 */}
                        <Flex direction="row" gap="3">
                            <Button>메세지 삭제하기</Button>
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

export default ReadModal;
