import React, { useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import treeSvg from "../assets/tree.svg";
import { ornament } from "../utils/ornaments";

const DragTree = () => {
    const [trees, setTrees] = useState<{ x: number; y: number }[]>([]); // 트리 위치 상태

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        const treeData = event.dataTransfer.getData("tree");
        if (treeData === "true") {
            const { clientX, clientY } = event;
            setTrees((prev) => [...prev, { x: clientX, y: clientY }]); // 새 트리 위치 추가
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleTreeDrag = (index: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { clientX, clientY } = event;
        setTrees((prev) =>
            prev.map((tree, i) => (i === index ? { x: clientX, y: clientY } : tree))
        );
    };

    return (
        <Box
            height="100vh"
            width="100%"
            position="relative"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {trees.map((tree, index) => (
                <Box
                    key={index}
                    position="absolute"
                    left={`${tree.x}px`}
                    top={`${tree.y}px`}
                    draggable
                    onDrag={(event) => handleTreeDrag(index, event)}
                >
                    <Image src={treeSvg} alt="Tree" width="100px" />
                </Box>
            ))}
        </Box>
    );
};

interface Ornament {
    src: string;
    x: number;
    y: number;
}

const DragOrnaments = () => {
    const [ornaments, setOrnaments] = useState<Ornament[]>([]);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const ornamentIndex = parseInt(event.dataTransfer.getData("ornamentIndex"));
        const src = ornament(ornamentIndex);

        const { clientX, clientY } = event;

        setOrnaments((prev) => [...prev, { src, x: clientX, y: clientY }]);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrag = (index: number, clientX: number, clientY: number) => {
        setOrnaments((prev) =>
            prev.map((ornament, i) => (i === index ? { ...ornament, x: clientX, y: clientY } : ornament))
        );
    };

    return (
        <Box
            position="relative"
            height="100vh"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            {ornaments.map((ornament, index) => (
                <img
                    key={index}
                    src={ornament.src}
                    alt={`Ornament ${index}`}
                    style={{
                        position: "absolute",
                        left: ornament.x,
                        top: ornament.y,
                        width: "80px",
                        cursor: "move",
                    }}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData("ornamentIndex", index.toString());
                    }}
                    onDragEnd={(e) =>
                        handleDrag(index, e.clientX, e.clientY)
                    }
                />
            ))}
        </Box>
    );
};


export default DragTree;