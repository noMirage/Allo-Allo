import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const selectorVacancies = (state: RootState) => state.getVacanciesReducer.data;

export const filterById = (id: number) => {
  return createSelector(selectorVacancies, (state) => {
    console.log(state);
    return state.filter((item, _) => item.id === id);
  });
};
