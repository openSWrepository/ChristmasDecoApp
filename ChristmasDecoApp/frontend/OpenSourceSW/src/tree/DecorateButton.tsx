import { Button, useDisclosure } from "@chakra-ui/react"
import { useAtomValue } from "jotai";
import { Link } from "react-router-dom"
import { userAtom } from "../backend/User";
import DecorateModal from "./DecorateModal"

const DecorateButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = useAtomValue(userAtom);

    return (
        user.userIdx === -1 ? <Button as={Link} to="/signin" size="lg" w="full">로그인하고 꾸미기</Button> :
            <>
                <Button onClick={onOpen} size="lg" w="full">장식품 달아주기</Button>
                <DecorateModal isOpen={isOpen} onClose={onClose} />
            </>
    )
}

export default DecorateButton