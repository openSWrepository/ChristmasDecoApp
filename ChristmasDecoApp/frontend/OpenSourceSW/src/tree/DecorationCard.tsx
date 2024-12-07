import { Card, CardBody, CardHeader, chakra, Flex, Image, Input, Text, Textarea, useRadioGroup } from "@chakra-ui/react"
import { isValidMotionProp, motion, useSpring, useTransform } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";
import { useEffect } from "react";
import { decoAtom, decoMessageAtom, decoNicknameAtom, decoTypeAtom } from "../backend/Tree";
import { useWindowSize } from "../useWindowSize";
import { ornament } from "../utils/ornaments";
import { brandColor, range } from "../utils/utils";
import { progressAtom } from "./DecorateModal";
import OrnamentRadio from "./OrnamentRadio";

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: isValidMotionProp,
});

const cardTitleText = (progress: number): string => {
    if (progress == 2) {
        return "메시지를 입력해주세요";
    }
    else {
        return "장식품을 선택해주세요";
    }
}

type SelectType = "Type" | "Item"

interface OrnamentSelectType {
    selectType: SelectType
}

const CardOrnamentSelect = ({ selectType }: OrnamentSelectType) => {
    const [decoType, setDecoType] = useAtom(decoTypeAtom);
    const [, setDeco] = useAtom(decoAtom);

    const itemRange = selectType === "Type" ? range(24, 0).filter(i => i % 3 === 0) : range(24, 0).filter(i => Math.floor(i / 3) === decoType);
    const items = itemRange.map(i => <Image src={ornament(i)} boxSize={["52px", "64px"]} />);

    const handleChange = (value: string) => {
        if (selectType === "Type") {
            setDecoType(parseInt(value));
            setDeco(parseInt(value) * 3);
        }
        else {
            setDeco(decoType * 3 + parseInt(value));
        }
    }

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "ornament",
        defaultValue: "0",
        onChange: handleChange
    });

    const group = getRootProps();

    return (
        <Flex gap={4} {...group} wrap="wrap" justify="center">
            {
                items.map((item, index) => {
                    const radio = getRadioProps({ value: index });

                    return (
                        <OrnamentRadio key={index} {...radio}>
                            {item}
                        </OrnamentRadio>
                    );
                })
            }
        </Flex>
    )
}

const CardMessage = () => {
    const { height } = useWindowSize();

    const [message, setMessage] = useAtom(decoMessageAtom);
    const [nickname, setNickname] = useAtom(decoNicknameAtom);

    const alertMessage = "서비스의 성격과 맞지 않는 글은 무통보 삭제될 수 있습니다.";
    const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);
    const handleNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);

    return (
        <Flex alignItems="stretch" gap={3} direction="column">
            <Textarea h={height / 3} alignSelf="flex-start" value={message} onChange={handleMessageInput} placeholder={alertMessage} resize="none" fontSize={["20px", "24px"]} />
            <Input size="lg" value={nickname} onChange={handleNicknameInput} placeholder="닉네임 길이는 최대 10자까지 가능합니다." />
        </Flex>
    )
}

const DecorationCardBody = () => {
    const progress = useAtomValue(progressAtom);

    if (progress === 0) {
        return <CardBody><CardOrnamentSelect selectType="Type" /></CardBody>
    }
    else if (progress === 1) {
        return <CardBody><CardOrnamentSelect selectType="Item" /></CardBody>
    }
    else {
        return <CardBody><CardMessage /></CardBody>
    }
}

const DecorationCard = () => {
    const deco = useAtomValue(decoAtom);

    const progress = useAtomValue(progressAtom);
    const springProgress = useSpring(progress);
    const width = useTransform(springProgress, [0, 2], [120, 360]);

    useEffect(() => {
        springProgress.set(progress);
    }, [progress]);

    return (
        <Flex direction="column">
            <Card bgColor="whiteAlpha.800" mt={5} p={5}>
                <Flex>
                    <ChakraBox h="10px" borderRadius={5} bgColor={brandColor.santaSock} style={{ width }} />
                </Flex>
                <CardHeader>
                    <Flex direction="column" align="center" gap={5}>
                        <Text fontWeight="bold">{cardTitleText(progress)}</Text>
                        <Image src={ornament(deco)} boxSize={["52px", "64px"]} />
                    </Flex>
                </CardHeader>
                <DecorationCardBody />
            </Card>
        </Flex>
    )
}

export default DecorationCard