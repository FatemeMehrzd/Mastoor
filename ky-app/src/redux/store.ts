import { configureStore } from "@reduxjs/toolkit";
import rokhdadReducer from "./slices/rokhdadSlice";

export const store = configureStore({
  reducer: {
    rokhdad: rokhdadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
