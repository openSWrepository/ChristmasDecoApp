import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Image } from "@chakra-ui/react";
import letterdeco from "../assets/ornaments/letterdeco.png";
import ReadModal from "./ReadModal";

interface LetterDecoProps {
    id: number;
    initialX: number;
    initialY: number;
}

const LetterDeco: React.FC<LetterDecoProps> = ({ id, initialX, initialY }) => {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isReadModalOpen, setIsReadModalOpen] = useState(false);


    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
        setIsDragging(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y,
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    const openReadModal = () => setIsReadModalOpen(true);
    const closeReadModal = () => setIsReadModalOpen(false);

    return (
        <>
            <Box
                position="absolute"
                top={`${position.y}px`}
                left={`${position.x}px`}
                width="50px"
                height="50px"
                cursor="pointer"
                onMouseDown={handleMouseDown}
            >
                <Image
                    src={letterdeco}
                    alt="Letter Decoration"
                    width="100%"
                    height="100%"
                    onClick={openReadModal}
                />
            </Box>

            {/* ReadModal */}
            <ReadModal isOpen={isReadModalOpen} onClose={closeReadModal} />
            </>
    );
};

export default LetterDeco;