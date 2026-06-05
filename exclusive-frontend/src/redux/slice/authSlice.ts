import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/user";

interface AuthState {
    user: User | null;
    token: string | null;
}

// Load initial state from localStorage
const storedToken = localStorage.getItem("token");
const storedUser = localStorage.getItem("user");

const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
            state.user = action.payload.user;
            state.token = action.payload.token;

            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.user));
        },

        logout(state) {
            state.user = null;
            state.token = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
