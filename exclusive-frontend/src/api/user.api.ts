import axios from "axios"
import type { userState, IUser } from "../types/user.type.ts"
import { loadFromStorage } from "../lib/storage.ts"

const API_URL = `${import.meta.env.VITE_API_URL}/users`

//  get my profile
export const getMyProfileApi = async (): Promise<userState> => {
    return (await axios.get<userState>(`${API_URL}/profile`, {
        headers: { authorization: `${import.meta.env.VITE_TOKEN_PREFIX} ${loadFromStorage("accessToken")}` }
    })).data
}

//  update my profile
export const updateMyProfileApi = async ({ userName, email, address }: Pick<IUser, "email"> & { userName: string, address: string }): Promise<userState> => {
    return (await axios.patch<userState>(`${API_URL}/profile`, { userName, email, address }, {
        headers: { authorization: `${import.meta.env.VITE_TOKEN_PREFIX} ${loadFromStorage("accessToken")}` }
    })).data
}

//  update my password
export const updateMyPasswordApi = async ({ currentPassword, newPassword, reNewPassword }: { currentPassword: string, newPassword: string, reNewPassword: string }): Promise<userState> => {
    return (await axios.patch<userState>(`${API_URL}/profile/password`, { currentPassword, newPassword, reNewPassword }, {
        headers: { authorization: `${import.meta.env.VITE_TOKEN_PREFIX} ${loadFromStorage("accessToken")}` }
    })).data
}

//  delete profile
export const deleteMyProfileApi = async (): Promise<userState> => {
    return (await axios.delete<userState>(`${API_URL}/profile`, {
        headers: { authorization: `${import.meta.env.VITE_TOKEN_PREFIX} ${loadFromStorage("accessToken")}` }
    })).data
}

//  refresh access token
export const refreshAccessTokenApi = async (): Promise<userState> => {
    return (await axios.post<userState>(`${API_URL}/refreshToken`, {}, {
        headers: { authorization: `${import.meta.env.VITE_TOKEN_PREFIX} ${loadFromStorage("refreshToken")}` }
    })).data
}