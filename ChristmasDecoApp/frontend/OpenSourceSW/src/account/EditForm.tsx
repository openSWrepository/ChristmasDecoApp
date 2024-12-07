import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Navigate, useNavigate, useParams } from "react-router-dom";
import { editUser, logout, setUpEdit } from "../backend/Backend";
import { userAtom } from "../backend/User";

type EditFormType = {
    nickname: string,
    password: string
}

const EditForm = () => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const handleNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value);
    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    const user = useAtomValue(userAtom);

    const toast = useToast();

    const { handleSubmit, reset, register, formState: { errors, isSubmitting } } = useForm<EditFormType>();

    const navigate = useNavigate();

    const onSubmit = handleSubmit(async data => {
        try {
            const editResponse = await editUser(user.userIdx, user.jwt, data.nickname, data.password);

            if (editResponse?.isSuccess) {
                toast({
                    title: "수정 성공!",
                    description: "회원 정보를 성공적으로 수정했습니다!",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });

                navigate(`/trees/${user.userIdx}`, { replace: true });
            }
            else {
                toast({
                    title: "회원 정보 수정 실패",
                    description: editResponse?.message,
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

    const { index } = useParams();

    const userId = parseInt(index as string);

    if (isNaN(userId)) {
        console.log("올바르지 않은 URL입니다.");
        return <Navigate replace to="/edit" />
    }

    useEffect(() => {
        const getEditData = async () => {
            try {
                const res = await setUpEdit(user.userIdx);

                if (res?.isSuccess) {
                    setNickname(res.result);
                    reset({nickname: res.result});
                }
                else {
                    toast({
                        title: "닉네임 획득 실패",
                        description: res?.message,
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    });
                }
            }
            catch (error) {
                toast({
                    title: "닉네임 획득 실패",
                    description: "알 수 없는 오류입니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true
                });
            }
        }
        
        getEditData();
    }, []);

    return (
        <Form method="post" action="" onSubmit={onSubmit}>
            <FormControl marginY="5" isInvalid={Boolean(errors.nickname)}>
                <FormLabel htmlFor="nickname">닉네임</FormLabel>
                <InputGroup size="lg">
                    <Input type="text" {...register("nickname", {
                        required: "닉네임은 꼭 입력해주세요",
                        maxLength: { value: 10, message: "닉네임은 10자 이하로 입력해주세요" }
                    })} value={nickname || ""} onChange={handleNicknameInput} />
                </InputGroup>
                <FormErrorMessage>
                    {errors.nickname && errors.nickname.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl marginY="5" isInvalid={Boolean(errors.password)}>
                <FormLabel htmlFor="password">비밀번호</FormLabel>
                <InputGroup size="lg">
                    <Input type={show ? "text" : "password"} {...register("password", {
                        pattern: { value: /^[A-Za-z\d?!@#$%^*+=-]{8,16}$/, message: "비밀번호는 8자 이상 16자 이하의 영문, 숫자 및 특수문자입니다" }
                    })} value={password || ""} onChange={handlePasswordInput} />
                    <InputRightElement color="black">
                        <IconButton onClick={handleShow} aria-label="Show password" icon={show ? <ViewOffIcon /> : <ViewIcon />} />
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>
            <Button isLoading={isSubmitting} type="submit" size="lg" width="full" marginY="5" color="black">정보 수정</Button>
        </Form>
    )
}

export default EditForm