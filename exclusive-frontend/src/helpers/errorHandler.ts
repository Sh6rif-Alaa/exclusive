import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        return (error.response?.data?.message || error.response?.data?.error || error.message || "Something went wrong");
    }

    if (error instanceof Error) return error.message;

    return "Something went wrong";
};

export const createAsyncThunkWithError = <T, A = void>(type: string, callback: (arg: A) => Promise<T>) =>
    createAsyncThunk<T, A, { rejectValue: string }>(type, async (arg, { rejectWithValue }) => {
        try {
            return await callback(arg);
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    });