import { configureStore, Reducer } from "@reduxjs/toolkit";
import { TypedUseSelectorHook } from "react-redux";
import { IinitialStateUser, userReducer } from "../servers/user";

interface IReducer {
  user: Reducer<IinitialStateUser>;
}

const reducer: IReducer = {
  user: userReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelector = TypedUseSelectorHook<RootState>;
