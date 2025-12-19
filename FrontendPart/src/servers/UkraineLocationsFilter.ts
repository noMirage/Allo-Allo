import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const selectorUkraineLocations = (state: RootState) =>
  state.getUkraineLocations.data;

export const UkraineLocationsFilter = (value: string) => {
  return createSelector(selectorUkraineLocations, (state) => {
    const data = state.filter((item, index) => {
      if (index > 20 || value === "") return;
     
    });

    return data;
  });
};
