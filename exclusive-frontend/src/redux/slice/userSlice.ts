import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { refreshAccessTokenApi, deleteMyProfileApi, getMyProfileApi, updateMyPasswordApi, updateMyProfileApi } from "../../api/user.api";
import { createAsyncThunkWithError } from "../../helpers/errorHandler";
import type { userState } from "../../types/user.type";

export interface LoadingErrorState {
    loading: boolean;
    error: string | null;
}

const initialState: userState & LoadingErrorState = {
    message: "",
    data: null,
    loading: false,
    error: null,
};

export const getProfile = createAsyncThunkWithError("user/getProfile", getMyProfileApi)
export const updateProfile = createAsyncThunkWithError("user/updateProfile", updateMyProfileApi)
export const updateMyPassword = createAsyncThunkWithError("user/updateMyPassword", updateMyPasswordApi)
export const deleteMyProfile = createAsyncThunkWithError("user/deleteMyProfile", deleteMyProfileApi)
export const refreshAccessToken = createAsyncThunkWithError("user/refreshAccessToken", refreshAccessTokenApi)


// helper cases
const handleFulfilled = (state: userState & LoadingErrorState, action: PayloadAction<userState>) => {
    state.loading = false;
    state.error = null;

    state.message = action.payload.message;
    state.data = action.payload.data;
}

const handlePending = (state: LoadingErrorState) => {
    state.loading = true;
    state.error = null;
}

const handleRejected = (state: LoadingErrorState, action: PayloadAction<string | undefined>) => {
    state.loading = false;
    state.error = action.payload ?? "Something went wrong";
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get profile
            .addCase(getProfile.pending, handlePending)
            .addCase(getProfile.fulfilled, handleFulfilled)
            .addCase(getProfile.rejected, handleRejected)

            // update profile
            .addCase(updateProfile.pending, handlePending)
            .addCase(updateProfile.fulfilled, handleFulfilled)
            .addCase(updateProfile.rejected, handleRejected)

            // update my password
            .addCase(updateMyPassword.pending, handlePending)
            .addCase(updateMyPassword.fulfilled, handleFulfilled)
            .addCase(updateMyPassword.rejected, handleRejected)

            // delete my profile
            .addCase(deleteMyProfile.pending, handlePending)
            .addCase(deleteMyProfile.fulfilled, handleFulfilled)
            .addCase(deleteMyProfile.rejected, handleRejected)

            // refresh access token
            .addCase(refreshAccessToken.pending, handlePending)
            .addCase(refreshAccessToken.fulfilled, handleFulfilled)
            .addCase(refreshAccessToken.rejected, handleRejected)
    }
});


export default userSlice.reducer;