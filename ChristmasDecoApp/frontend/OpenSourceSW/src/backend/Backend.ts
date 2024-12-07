import { Decoration } from "./Tree";
import { User } from "./User";
import { useAtomValue } from "jotai";
import { treeOwnerNicknameAtom } from "../backend/Tree";

export const url = "http://localhost:8080";

interface APIResponse {
    isSuccess: boolean;
    code: number;
    message: string;
}

interface UserResponse extends APIResponse {
    result: User;
}



export const fetchUser = async (nickname: string, password: string): Promise<UserResponse> => {
    const body = {
        nickname: nickname,
        password: password,
    };
    const config: RequestInit = {

        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        
    };

    const response = await fetch(`${url}/loginAPI/login`, config);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    console.log("Server response:", json); // 디버깅용 로그

    return json as UserResponse;
};


export interface TreeResponse extends APIResponse {
    treeOwnerNickname: string;
    treeIdx : number;
    result: Decoration[];
}

export const fetchTree = async (idx: number): Promise<TreeResponse | undefined> => {
    const config: RequestInit = {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await fetch(`${url}/trees/${idx}`, config);

    const json = await response.json();

    return json as TreeResponse;
};

export interface DecorationResponse extends APIResponse {
    result: DecorationDetailType;
}

export const fetchDecoration = async (treeIdx: number, decorationIdx: number): Promise<DecorationResponse | undefined> => {
    const config: RequestInit = {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await fetch(`${url}/trees/${treeIdx}/decoration/${decorationIdx}`, config);

    const json = await response.json();

    return json as DecorationResponse;
};

export const createDecoration = async (userIdx: number, nickname: string, message: string): Promise<APIResponse | undefined> => {
    
    const body = {
        userIdx: userIdx,
        nickname: nickname,
        message: message,
    };

    const config: RequestInit = {
        method: "POST", 
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    const response = await fetch(`${url}/trees/${userIdx}/decoration`, config);

    const json = await response.json();

    return json as APIResponse;
};

export const createMessage = async (
    treeOwnerNickname: string,
    nickname: string,         // 메시지 작성자
    message: string           // 메시지 내용
): Promise<APIResponse | undefined> => {
    const body = {
        nickname: nickname, // 작성자 닉네임
        message: message  // 메시지 내용
    };

    const config: RequestInit = {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    const response = await fetch(`${url}/trees/${treeOwnerNickname}/decoration`, config);

    const json = await response.json();

    return json as APIResponse;
};

export const signUp = async (nickname: string, password: string): Promise<APIResponse> => {
    const body = {
        nickname: nickname,
        password: password,
    };

    const config: RequestInit = {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    const response = await fetch(`${url}/registerAPI/new`, config);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    console.log("Server response:", json); // 디버깅용 로그

    return json as APIResponse;
};


export const resetPassword = async (password: string): Promise<APIResponse | undefined> => {
    const body = {
        password: password,
    };

    const config: RequestInit = {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    const response = await fetch(`${url}/reset-password`, config);

    const json = await response.json();

    return json as APIResponse;
};

export interface EditSetUpResponse extends APIResponse {
    result: string;
}

export const setUpEdit = async (idx: number): Promise<EditSetUpResponse | undefined> => {
    const config: RequestInit = {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await fetch(`${url}/users/edit/${idx}`, config);

    const json = await response.json();

    return json as EditSetUpResponse;
};

export const editUser = async (idx: number, nickname: string, password: string): Promise<APIResponse | undefined> => {
    const body = {
        nickname: nickname,
        password: password,
    };

    const config: RequestInit = {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    const response = await fetch(`${url}/users/edit/${idx}`, config);

    const json = await response.json();

    return json as APIResponse;
};

