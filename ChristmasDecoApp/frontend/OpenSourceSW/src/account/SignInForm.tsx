import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormErrorMessage, FormLabel, Icon, IconButton, Input, InputGroup, InputRightAddon, InputRightElement, Link, useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Link as RouterLink, useNavigate } from "react-router-dom";

import { fetchUser } from "../backend/Backend";
import { userAtom } from "../backend/User";

export type SignInFormData = {
    nickname: string
    password: string
}

const SignInForm = () => {
    const [nickname, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleIdInput = (e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value);
    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<SignInFormData>();

    const navigate = useNavigate();

    const toast = useToast();

    const [, setUser] = useAtom(userAtom);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const userResponse = await fetchUser(data.nickname, data.password);
    
            if (userResponse.isSuccess) {
                // 로그인 성공
                console.log("로그인 성공:", userResponse.result);
                setUser(userResponse.result); // 사용자 데이터 전역 상태 업데이트
                navigate(`/tree/TestPage/${userResponse.result}`, { replace: true }); // 고정된 경로로 이동
            } else {
                // 로그인 실패
                toast({
                    title: "로그인 실패",
                    description: userResponse.message || "아이디 또는 비밀번호가 올바르지 않습니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error("로그인 요청 오류:", error);
            toast({
                title: "로그인 실패",
                description: "알 수 없는 오류입니다.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    });
    
    

    return (
        <Form method="post" onSubmit={onSubmit}>
            <FormControl marginY="5" isInvalid={Boolean(errors.nickname)}>
                <FormLabel htmlFor="nickname">닉네임</FormLabel>
                <InputGroup size="lg">
                    <Input type="text" {...register("nickname", {
                        required: "닉네임은 꼭 입력해주세요"
                    })} value={nickname || ""} onChange={handleIdInput} />
                </InputGroup>
                <FormErrorMessage>
                    {errors.nickname && errors.nickname.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl marginY="5" isInvalid={Boolean(errors.password)}>
                <FormLabel htmlFor="password">비밀번호</FormLabel>
                <InputGroup size="lg">
                    <Input type={show ? "text" : "password"} {...register("password", {
                        required: "비밀번호는 꼭 입력해주세요"
                    })} value={password || ""} onChange={handlePasswordInput} />
                    <InputRightElement color="black">
                        <IconButton onClick={handleShow} aria-label="Show password" icon={show ? <ViewOffIcon /> : <ViewIcon />} />
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>
            <Button isLoading={isSubmitting} type="submit" size="lg" width="full" marginY="1" color="black">로그인</Button>
            <Button leftIcon={<EmailIcon />} as={RouterLink} to="/signup" size="lg" width="full" marginY="1" bgColor="#1AADA6" _hover={{ bgColor: "#269993" }}>회원가입</Button>
            <Button leftIcon={<EmailIcon />} as={RouterLink} to="/trees/" size="lg" width="full" marginY="1" bgColor="#1AADA6" _hover={{ bgColor: "#269993" }}>트리로</Button>
        </Form>
    )
}

export default SignInForm