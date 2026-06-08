import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./slice/authSlice"
import authFlowReducer from "./slice/authFlowSlice"
import userReducer from "./slice/userSlice"
import cartReducer from "./slice/cartSlice";
import wishlistReducer from "./slice/wishlistSlice"
import { loadFromStorage, removeFromStorage, saveToStorage } from "../lib/storage";

const preloadedState = {
  cart: {
    items: loadFromStorage("cart") || [],
  },

  wishlist: {
    items: loadFromStorage("wishlist") || [],
  },

  auth: {
    message: "",
    data: loadFromStorage("user"),
    token: {
      accessToken: loadFromStorage("accessToken"),
      refreshToken: loadFromStorage("refreshToken"),
    },
    loading: false,
    error: null,
  },

  user: {
    message: "",
    data: loadFromStorage("user"),
    loading: false,
    error: null,
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    authFlow: authFlowReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },

  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();

  if (state.auth.data) saveToStorage("user", state.auth.data);
  else removeFromStorage("user");

  if (state.user.data) saveToStorage("user", state.user.data);
  else removeFromStorage("user");

  if (state.auth.token?.accessToken) saveToStorage("accessToken", state.auth.token.accessToken);
  else removeFromStorage("accessToken");

  if (state.auth.token?.refreshToken) saveToStorage("refreshToken", state.auth.token.refreshToken);
  else removeFromStorage("refreshToken");

  if (state.cart.items.length > 0) saveToStorage("cart", state.cart.items);
  else removeFromStorage("cart");

  if (state.wishlist.items.length > 0) saveToStorage("wishlist", state.wishlist.items);
  else removeFromStorage("wishlist");
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;