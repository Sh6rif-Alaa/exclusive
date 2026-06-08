import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthFlowState {
    email: string | null;
    otp: string | null;
}

const initialState: AuthFlowState = {
    email: localStorage.getItem("resetEmail"),
    otp: localStorage.getItem("resetOtp"),
};

const authFlowSlice = createSlice({
    name: "authFlow",
    initialState,
    reducers: {
        setResetEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
            localStorage.setItem("resetEmail", action.payload);
        },

        setResetOtp(state, action: PayloadAction<string>) {
            state.otp = action.payload;
            localStorage.setItem("resetOtp", action.payload);
        },

        // setResetFlow(state, action: PayloadAction<{ email: string, otp: string }>) {
        //     state.otp = action.payload.otp;
        //     state.email = action.payload.email;
        //     sessionStorage.setItem("resetFlow", JSON.stringify(action.payload));
        // },

        clearResetFlow(state) {
            state.email = null;
            state.otp = null;
            localStorage.removeItem("resetEmail");
            localStorage.removeItem("resetOtp");
        }
    },
});

export const { setResetEmail, setResetOtp, clearResetFlow } = authFlowSlice.actions;
export default authFlowSlice.reducer;