import { Flex, Link } from "@chakra-ui/react"

const Terms = () => {
    return (
        <Flex gap={3} justify="center">
            <Link isExternal href="https://dongho18.notion.site/031dd25f57ac4ac98d15446b21f3481a" textColor="whiteAlpha.700">개인정보처리방침</Link>
            |
            <Link isExternal href="https://dongho18.notion.site/2625a6512c1d43249f901b220ec786aa" textColor="whiteAlpha.700">이용약관</Link>
        </Flex>
    )
}

export default Terms