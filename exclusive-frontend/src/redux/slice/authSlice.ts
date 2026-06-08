import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { forgetPasswordApi, logoutApi, reSendOtpApi, resetPasswordApi, signInApi, signUpApi, verifyEmailApi } from "../../api/auth.api";
import { createAsyncThunkWithError } from "../../helpers/errorHandler";
import type { AuthState } from "../../types/user.type";

export interface LoadingErrorState {
    loading: boolean;
    error: string | null;
}

const initialState: AuthState & LoadingErrorState = {
    message: "",
    data: null,
    token: null,
    loading: false,
    error: null,
};

export const signIn = createAsyncThunkWithError("auth/signIn", signInApi)

export const signUp = createAsyncThunkWithError("auth/signUp", signUpApi)

export const verifyEmail = createAsyncThunkWithError("auth/verifyEmail", verifyEmailApi)

export const forgetPassword = createAsyncThunkWithError("auth/forgetPassword", forgetPasswordApi)

export const reSendOtp = createAsyncThunkWithError("auth/reSendOtp", reSendOtpApi)

export const resetPassword = createAsyncThunkWithError("auth/resetPassword", resetPasswordApi)

export const logout = createAsyncThunkWithError("auth/logout", logoutApi)

// helper cases
const handleFulfilled = (state: AuthState & LoadingErrorState, action: PayloadAction<AuthState>) => {
    state.loading = false;
    state.error = null;

    state.message = action.payload.message;
    state.data = action.payload.data;
    state.token = action.payload.token;
}

const handlePending = (state: LoadingErrorState) => {
    state.loading = true;
    state.error = null;
}

const handleRejected = (state: LoadingErrorState, action: PayloadAction<string | undefined>) => {
    state.loading = false;
    state.error = action.payload ?? "Something went wrong";
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // sign in
            .addCase(signIn.pending, handlePending)
            .addCase(signIn.fulfilled, handleFulfilled)
            .addCase(signIn.rejected, handleRejected)

            // sign up
            .addCase(signUp.fulfilled, handleFulfilled)
            .addCase(signUp.pending, handlePending)
            .addCase(signUp.rejected, handleRejected)

            // verify email
            .addCase(verifyEmail.fulfilled, handleFulfilled)
            .addCase(verifyEmail.pending, handlePending)
            .addCase(verifyEmail.rejected, handleRejected)

            // forget password
            .addCase(forgetPassword.fulfilled, handleFulfilled)
            .addCase(forgetPassword.pending, handlePending)
            .addCase(forgetPassword.rejected, handleRejected)

            // resend otp
            .addCase(reSendOtp.fulfilled, handleFulfilled)
            .addCase(reSendOtp.pending, handlePending)
            .addCase(reSendOtp.rejected, handleRejected)

            // reset password
            .addCase(resetPassword.fulfilled, handleFulfilled)
            .addCase(resetPassword.pending, handlePending)
            .addCase(resetPassword.rejected, handleRejected)

            // logout
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.data = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logout.pending, handlePending)
            .addCase(logout.rejected, handleRejected)
    }
});


export default authSlice.reducer;
