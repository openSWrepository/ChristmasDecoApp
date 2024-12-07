import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useWindowSize } from "./useWindowSize";
import { CloseIcon } from "@chakra-ui/icons";

const ErrorPage = () => {
    const error = useRouteError();
    const { height } = useWindowSize();

    if (isRouteErrorResponse(error)) {
        return (
            <Center h={height} textStyle="landing" color="white" bgGradient="linear(to-tr, blackAlpha.900, blackAlpha.800)">
                <VStack gap={50}>
                    <CloseIcon boxSize="256px" />
                    <>
                        <Heading as="h2">URL 오류입니다.</Heading>
                        <Text>HTTP Code {error.status}</Text>
                    </>
                </VStack>
            </Center>
        );
    }
    else {
        return (
            <Center h={height} textStyle="landing" color="white" bgGradient="linear(to-tr, blackAlpha.900, blackAlpha.800)">
                <VStack gap={50}>
                    <CloseIcon boxSize="256px" />
                    <Text as="i">알 수 없는 오류가 발생했습니다.</Text>
                </VStack>
            </Center>
        );
    }
}

export default ErrorPage