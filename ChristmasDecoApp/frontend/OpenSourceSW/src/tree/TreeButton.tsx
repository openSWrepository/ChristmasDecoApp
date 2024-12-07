import { useAtomValue } from "jotai"
import { userAtom } from "../backend/User"
import CopyButton from "./CopyButton"
import DecorateButton from "./DecorateButton"

type TreeButtonType = {
    treeId: number
    userId?: number
}

const TreeButton = ({ treeId }: TreeButtonType) => {
    const user = useAtomValue(userAtom); // userAtom에서 현재 로그인한 사용자 정보 가져옴

    return (
        treeId == user.userIdx ? <CopyButton url={window.location.href} /> : <DecorateButton />
   
        // 현재 사용자가 해당트리를 소유한 상태로 간주하고 URL을 복사하는 <CopyButton>을 랜더링
        // 트리를 꾸밀 수 있는 DecorateButton
    )
}

export default TreeButton