import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthFlowState {
    email: string | null;
    otp: string | null;
}

const initialState: AuthFlowState = {
    email: sessionStorage.getItem("resetEmail"),
    otp: sessionStorage.getItem("resetOtp"),
};

const authFlowSlice = createSlice({
    name: "authFlow",
    initialState,
    reducers: {
        setResetEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;

            sessionStorage.setItem(
                "resetEmail",
                action.payload
            );
        },

        setResetOtp(state, action: PayloadAction<string>) {
            state.otp = action.payload;

            sessionStorage.setItem(
                "resetOtp",
                action.payload
            );
        },

        clearResetFlow(state) {
            state.email = null;
            state.otp = null;

            sessionStorage.removeItem("resetEmail");
            sessionStorage.removeItem("resetOtp");
        }
    },
});

export const {
    setResetEmail,
    setResetOtp,
    clearResetFlow,
} = authFlowSlice.actions;

export default authFlowSlice.reducer;