import { Button, useDisclosure } from "@chakra-ui/react";
import LetterModal from "./LetterModal";
import { useState } from "react";

const NewButton = ({ onAddLetter }: { onAddLetter: (x: number, y: number) => void }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleAddLetter = () => {
        // 랜덤 위치 생성
        const x = Math.random() * window.innerWidth; // 창 너비 내
        const y = Math.random() * (window.innerHeight - 200); // 상단 200px 제외

        onAddLetter(x, y);
        onClose();
    };

    return (
        <>
            <Button onClick={onOpen} size="lg" w="full">
                편지 달아주기
            </Button>
            <LetterModal isOpen={isOpen} onClose={onClose} onAddLetter={handleAddLetter} />
        </>
    );
};

export default NewButton;