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
import {
  IinitialStateUkraineLocations,
  UkraineLocationsReducer,
} from "../servers/UkraineLocations";
import { IinitialStateUser, userReducer } from "../servers/user";

interface IReducer {
  searchWorkers: Reducer<IinitialStateSearchWorkers>;
  detailsWorkerReducer: Reducer<IinitialStateDetailsWorker>;
  getVacanciesReducer: Reducer<IinitialStateGetVacancies>;
  getUkraineLocations: Reducer<IinitialStateUkraineLocations>;
  user: Reducer<IinitialStateUser>;
}

const reducer: IReducer = {
  searchWorkers: searchWorkersReducer,
  detailsWorkerReducer: detailsWorkerReducer,
  getVacanciesReducer: getVacanciesReducer,
  getUkraineLocations: UkraineLocationsReducer,
  user: userReducer,
};

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelector = TypedUseSelectorHook<RootState>;
