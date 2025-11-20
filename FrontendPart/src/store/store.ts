import { configureStore, Reducer } from "@reduxjs/toolkit";
import {
  IinitialStateSearchWorkers,
  searchWorkersReducer,
} from "../servers/searchWorkers";
import { TypedUseSelectorHook } from "react-redux";
import {
  detailsWorkerReducer,
  IinitialStateDetailsWorker,
} from "../servers/detailsWorker";
import {
  getVacanciesReducer,
  IinitialStateGetVacancies,
} from "../servers/vacancies";

interface IReducer {
  searchWorkers: Reducer<IinitialStateSearchWorkers>;
  detailsWorkerReducer: Reducer<IinitialStateDetailsWorker>;
  getVacanciesReducer: Reducer<IinitialStateGetVacancies>;
}

const reducer: IReducer = {
  searchWorkers: searchWorkersReducer,
  detailsWorkerReducer: detailsWorkerReducer,
  getVacanciesReducer: getVacanciesReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelector = TypedUseSelectorHook<RootState>;
