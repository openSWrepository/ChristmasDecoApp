import { Text } from "@chakra-ui/react"

type TreeHeaderType = {
    nickname: string
    count: number
}

const TreeInfo = ({ nickname, count }: TreeHeaderType) => {
    return (
        <Text fontSize="2rem" fontWeight="bold">{nickname}님의 트리에<br />{count}개의 장식이 달렸어요!</Text>
    )
}

export default TreeInfo