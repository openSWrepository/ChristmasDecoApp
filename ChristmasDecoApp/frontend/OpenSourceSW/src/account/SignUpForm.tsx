import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { signUp } from "../backend/Backend"; // 서버 통신 함수 import

type SignUpFormData = {
    nickname: string;
    password: string;
    confirmPassword: string;
};

const SignUpForm = () => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);
    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleConfirmPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);
    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<SignUpFormData>();

    const navigate = useNavigate();
    const toast = useToast();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await signUp(data.nickname, data.password);
    
            // 회원가입 성공 처리
            if (response.isSuccess) {
                console.log("회원가입 성공:", response); // 디버깅용 로그
    
                toast({
                    title: "회원가입 성공",
                    description: response.message || "회원가입이 완료되었습니다.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
    
                navigate("/signin", { replace: true }); // 회원가입 후 로그인 페이지로 이동
            } else {
                // 회원가입 실패 처리
                toast({
                    title: "회원가입 실패",
                    description: response.message || "회원가입 중 문제가 발생했습니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            const response = await signUp(data.nickname, data.password);
            console.error("회원가입 요청 오류:", error); // 디버깅용 로그
    
            toast({
                title: "회원가입 실패",
                description: response.message || "회원가입 중 문제가 발생했습니다.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    });
    

    return (
        <Form method="post" action="" onSubmit={onSubmit}>
            {/* 닉네임 입력 */}
            <FormControl marginY="5" isInvalid={Boolean(errors.nickname)}>
                <FormLabel htmlFor="nickname">닉네임</FormLabel>
                <InputGroup size="lg">
                    <Input
                        type="text"
                        {...register("nickname", {
                            required: "닉네임은 꼭 입력해주세요",
                            maxLength: { value: 15, message: "닉네임은 15자 이하로 입력해주세요" },
                        })}
                        value={nickname || ""}
                        onChange={handleNicknameInput}
                    />
                </InputGroup>
                <FormErrorMessage>
                    {errors.nickname && errors.nickname.message}
                </FormErrorMessage>
            </FormControl>

            {/* 비밀번호 입력 */}
            <FormControl marginY="5" isInvalid={Boolean(errors.password)}>
                <FormLabel htmlFor="password">비밀번호</FormLabel>
                <InputGroup size="lg">
                    <Input
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                            required: "비밀번호는 꼭 입력해주세요",
                            minLength: { value: 8, message: "비밀번호는 최소 8자 이상이어야 합니다" },
                            maxLength: { value: 20, message: "비밀번호는 최대 20자 이하이어야 합니다" },
                        })}
                        value={password || ""}
                        onChange={handlePasswordInput}
                    />
                    <InputRightElement>
                        <Button size="sm" onClick={toggleShowPassword}>
                            {showPassword ? "숨기기" : "보기"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>

            {/* 비밀번호 확인 */}
            <FormControl marginY="5" isInvalid={Boolean(errors.confirmPassword)}>
                <FormLabel htmlFor="confirmPassword">비밀번호 확인</FormLabel>
                <InputGroup size="lg">
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword", {
                            required: "비밀번호 확인은 꼭 입력해주세요",
                            validate: (value) => value === password || "비밀번호가 일치하지 않습니다.",
                        })}
                        value={confirmPassword || ""}
                        onChange={handleConfirmPasswordInput}
                    />
                    <InputRightElement>
                        <Button size="sm" onClick={toggleShowConfirmPassword}>
                            {showConfirmPassword ? "숨기기" : "보기"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword.message}
                </FormErrorMessage>
            </FormControl>

            {/* 회원가입 버튼 */}
            <Button
                isLoading={isSubmitting}
                type="submit"
                size="lg"
                width="full"
                marginY="5"
                color="black"
            >
                회원가입
            </Button>
        </Form>
    );
};

export default SignUpForm;