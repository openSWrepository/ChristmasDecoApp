import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    Input,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import bgImage from "../assets/letter-background.jpg";
import { decoMessageAtom, decoNicknameAtom, treeIdxAtom, treeOwnerNicknameAtom } from "../backend/Tree";
import { atom, useAtom } from "jotai";
import { createDecoration, createMessage } from "../backend/Backend";
import { useAtomValue } from "jotai";
import { userAtom } from "../backend/User";

type LetterModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddLetter: () => void; // 랜덤 위치에 추가하는 함수
};

const LetterModal = ({ isOpen, onClose, onAddLetter }: LetterModalProps) => {
    const [message, setMessage] = useAtom(decoMessageAtom);
    const [nickname, setNickname] = useAtom(decoNicknameAtom);
    const [treeOwnerNickname] = useAtom(treeOwnerNicknameAtom);
    const user = useAtomValue(userAtom); // 사용자 정보 가져오기
    const toast = useToast();

    const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);
    const handleNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);

    const handleSubmit = async () => {
        if (!message || !nickname) {
            toast({
                title: "입력 오류",
                description: "메시지와 닉네임을 모두 입력해주세요.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await createMessage(treeOwnerNickname, nickname, message);
            if (response?.isSuccess) {
                toast({
                    title: "성공",
                    description: "메시지가 성공적으로 저장되었습니다.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onAddLetter(); // 트리에 추가
                onClose(); // 모달 닫기
            } else {
                throw new Error(response?.message || "메시지 저장 실패");
            }
        } catch (error) {
            toast({
                title: "저장 실패",
                description: error.message || "알 수 없는 오류가 발생했습니다.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                textStyle="tree"
                fontSize={["24px", "28px"]}
                bgImage={bgImage}
                bgPos="30%"
            >
                <ModalHeader>새 편지 작성</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Textarea
                        value={message}
                        onChange={handleMessageInput}
                        placeholder="메시지를 작성해주세요."
                    />
                    <Input
                        value={nickname}
                        onChange={handleNicknameInput}
                        placeholder="닉네임 이름"
                        mt={4}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleSubmit}>
                        추가하기
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LetterModal;
