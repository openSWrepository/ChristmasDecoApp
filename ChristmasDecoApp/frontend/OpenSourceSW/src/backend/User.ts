import { atomWithStorage } from "jotai/utils";

export interface User {
    userIdx: number
}

export const userAtom = atomWithStorage<User>("user", { userIdx: -1});