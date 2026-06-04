import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItemType {
    id: string;
    title: string;
    image: string;
    price: number;
}

interface WishlistState {
    items: WishlistItemType[];
}

const initialState: WishlistState = {
    items: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,

    reducers: {
        toggleWishlist(state, action: PayloadAction<WishlistItemType>) {
            const exists = state.items.find((item) => item.id === action.payload.id);

            if (exists) {
                state.items = state.items.filter((item) => item.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
        },

        clearWishlist(state) {
            state.items = [];
        },
    },
});

export const {
    toggleWishlist,
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;