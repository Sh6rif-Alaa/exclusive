import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authFlowReducer from "./slice/authFlowSlice"
import authReducer from "./slice/authSlice"
import cartReducer from "./slice/cartSlice";
import wishlistReducer from "./slice/wishlistSlice"
import { loadFromStorage, saveToStorage } from "../lib/storage";

const preloadedState = {
  cart: {
    items: loadFromStorage("cart", []),
  },

  wishlist: {
    items: loadFromStorage("wishlist", []),
  },
};

const store = configureStore({
  reducer: {
    authFlow: authFlowReducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },

  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();

  saveToStorage("cart", state.cart.items);
  saveToStorage("wishlist", state.wishlist.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;