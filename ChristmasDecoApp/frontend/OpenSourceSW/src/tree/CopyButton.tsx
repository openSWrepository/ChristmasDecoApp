import { Button, useClipboard, useToast } from "@chakra-ui/react"

type CopyButtonType = {
    url: string
}

const CopyButton = ({ url }: CopyButtonType) => {
    const { onCopy } = useClipboard(url);

    const toast = useToast();

    const copyAndAlert = () => {
        onCopy();

        toast({
            title: "링크 복사",
            description: "트리 링크를 클립보드에 복사했어요!",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    }

    return (
        <Button size="lg" w="full" onClick={() => { copyAndAlert() }}>
            트리에 초대하기
        </Button>
    )
}

export default CopyButton