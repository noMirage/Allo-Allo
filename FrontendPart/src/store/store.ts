import { configureStore, Reducer } from "@reduxjs/toolkit";
import { TypedUseSelectorHook } from "react-redux";
import {
  detailsWorkerReducer,
  IinitialStateDetailsWorker,
} from "../servers/detailsWorker";
import {
  getVacanciesReducer,
  IinitialStateGetVacancies,
} from "../servers/vacancies";
import { IinitialStateUser, userReducer } from "../servers/user";

interface IReducer {
  detailsWorkerReducer: Reducer<IinitialStateDetailsWorker>;
  getVacanciesReducer: Reducer<IinitialStateGetVacancies>;
  user: Reducer<IinitialStateUser>;
}

const reducer: IReducer = {
  detailsWorkerReducer: detailsWorkerReducer,
  getVacanciesReducer: getVacanciesReducer,
  user: userReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelector = TypedUseSelectorHook<RootState>;
