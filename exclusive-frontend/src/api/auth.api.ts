import axios from "axios"
import type { AuthState, emailType, IUser } from "../types/user.type.ts"
import { loadFromStorage } from "../lib/storage.ts"

const API_URL = `${import.meta.env.VITE_API_URL}/auth`

//  signin user
export const signInApi = async ({ email, password }: Pick<IUser, "email"> & { password: string }): Promise<AuthState> => {
    return (await axios.post<AuthState>(`${API_URL}/signin`, { email, password })).data
}

//  signup user
export const signUpApi = async ({ userName, email, password, cPassword }: Pick<IUser, "email"> & { userName: string, password: string, cPassword: string }): Promise<AuthState> => {
    return (await axios.post<AuthState>(`${API_URL}/signup`, { userName, email, password, cPassword })).data
}

// signUp gmail
export const signUpWithGoogleApi = async (idToken: string): Promise<AuthState> => {
    return (await axios.post<AuthState>(`${API_URL}/signUpWithGmail`, { idToken })).data;
};

//  verify email
export const verifyEmailApi = async ({ email, otp, type }: Pick<IUser, "email"> & { otp: string, type: emailType }): Promise<AuthState> => {
    return (await axios.post<AuthState>(`${API_URL}/verifyEmail?type=${type}`, { email, otp })).data
}

//  forget password
export const forgetPasswordApi = async ({ email }: Pick<IUser, "email">): Promise<AuthState> => {
    return (await axios.post<AuthState>(`${API_URL}/forget-password`, { email })).data
}

//  resend otp
export const reSendOtpApi = async ({ email, type }: Pick<IUser, "email"> & { type: emailType }): Promise<AuthState> => {
    return (await axios.post<AuthState>(`${API_URL}/reSendOtp?type=${type}`, { email })).data
}

//  reset password
export const resetPasswordApi = async ({ email, password, cPassword, otp }: Pick<IUser, "email"> & { password: string, cPassword: string, otp: string }): Promise<AuthState> => {
    return (await axios.patch<AuthState>(`${API_URL}/reset-password`, { email, password, cPassword, otp })).data
}

//  logout user
export const logoutApi = async (): Promise<AuthState> => {
    return (await axios.post<AuthState>(`${API_URL}/logout`, {}, {
        headers: { authorization: `${import.meta.env.VITE_TOKEN_PREFIX} ${loadFromStorage("accessToken")}` }
    })).data
}