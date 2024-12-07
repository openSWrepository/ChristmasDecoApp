import {
    Card,
    CardBody,
    CardHeader,
    Flex,
    Input,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { decoMessageAtom, decoNicknameAtom, decoTypeAtom } from "../backend/Tree";
import { useAtom, useAtomValue } from "jotai";

const LetterCard = () => {
    const [message, setMessage] = useAtom(decoMessageAtom);
    const [nickname, setNickname] = useAtom(decoNicknameAtom);

    const alertMessage = "서비스의 성격과 맞지 않는 글은 무통보 삭제될 수 있습니다.";
    const handleMessageInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);
    const handleNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);
    return (
        <Flex direction="column">
            <Card bgColor="whiteAlpha.800" mt={5} p={5}>
                {/* 카드 제목 */}
                <CardHeader>
                    <Flex direction="column" align="center" gap={5}>
                        <Text fontWeight="bold" fontSize="24px">
                            메시지를 입력해주세요
                        </Text>
                    </Flex>
                </CardHeader>

                {/* 메시지 및 닉네임 입력 */}
                <CardBody>
                    <Flex alignItems="stretch" gap={3} direction="column">
                        <Textarea
                            h="100px"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={alertMessage}
                            resize="none"
                            fontSize="20px"
                        />
                        <Input
                            size="lg"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="닉네임 길이는 최대 10자까지 가능합니다."
                        />
                    </Flex>
                </CardBody>
            </Card>
        </Flex>
    );
};

export default LetterCard;
