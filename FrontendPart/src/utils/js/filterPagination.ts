import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export const filterPagination = <T>(
  count: number,
  countElement: number,
  store: (state: RootState) => {}
) => {
  return createSelector(store, (state): T | void | any[] => {
    const currentCount = count * countElement - countElement;
    if (!Array.isArray(state)) return;
    if (currentCount) {
      const array = state.filter((item, index) => {
        if (index >= currentCount && index <= currentCount + countElement) {
          return item;
        }
      });
      return array;
    } else {
      const array = state.filter((item, index) => {
        if (index >= 0 && index < countElement) {
          return item;
        }
      });
      return array;
    }
  });
};
