import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, useNavigate } from "react-router-dom";
import { resetPassword } from "../backend/Backend";

type ResetFormType = {
    password: string
}

const ResetForm = () => {
    const [password, setPassword] = useState("");
    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<ResetFormType>();

    const navigate = useNavigate();

    const toast = useToast();

    const onSubmit = handleSubmit(async data => {
        try {
            const resetResponse = await resetPassword(password);

            if (resetResponse?.isSuccess) {
                toast({
                    title: "비밀번호 재설정 성공",
                    description: "재설정하신 비밀번호로 로그인해주세요.",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });

                navigate("/", { replace: true });
            }
            else {
                toast({
                    title: "비밀번호 재설정 실패",
                    description: resetResponse?.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true
                });
            }
        }
        catch (error) {
            toast({
                title: "회원 정보 수정 실패",
                description: "알 수 없는 오류입니다.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    });

    return (
        <Form method="post" action="" onSubmit={onSubmit}>
            <FormControl marginY="5" isInvalid={Boolean(errors.password)}>
                <FormLabel htmlFor="password">비밀번호</FormLabel>
                <InputGroup size="lg">
                    <Input type={show ? "text" : "password"} {...register("password", {
                        required: "비밀번호는 꼭 입력해주세요",
                        minLength: { value: 8, message: "비밀번호는 8자 이상으로 입력해주세요" },
                        maxLength: { value: 16, message: "비밀번호는 16자 이하로 입력해주세요" }
                    })} value={password || ""} onChange={handlePasswordInput} />
                    <InputRightElement color="black">
                        <IconButton onClick={handleShow} aria-label="Show password" icon={show ? <ViewOffIcon /> : <ViewIcon />} />
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>
            <Button isLoading={isSubmitting} type="submit" size="lg" width="full" marginY="5" color="black">비밀번호 재설정</Button>
        </Form>
    )
}

export default ResetForm