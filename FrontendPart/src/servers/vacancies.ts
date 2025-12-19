import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_VACANCIES } from "../configs/configs";
import { utilServer } from "../utils/js/utilServer";
import { TLoading } from "../interfaces/typeReduxThunk";
import { IVacancies } from "../interfaces/vacancies";

export interface IinitialStateGetVacancies {
  loading: TLoading;
  data: IVacancies[] | [];
}

export const getVacanciesServer = createAsyncThunk(
  "getVacanciesServer",
  async (data, { rejectWithValue }) => {
    const dataServer = await utilServer<IVacancies[]>(
      GET_VACANCIES,
      "get",
      {},
      rejectWithValue
    );
    return dataServer ? dataServer : [];
  }
);

const initialState: IinitialStateGetVacancies = {
  loading: "idle",
  data: [],
};

const getVacancies = createSlice({
  name: "getVacancies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getVacanciesServer.pending,
      (state: IinitialStateGetVacancies) => {
        state.loading = "pending";
      }
    );
    builder.addCase(
      getVacanciesServer.rejected,
      (state: IinitialStateGetVacancies, action) => {
        state.loading = "failed";
      }
    );
    builder.addCase(
      getVacanciesServer.fulfilled,
      (state: IinitialStateGetVacancies, action) => {
        state.loading = "succeeded";
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.data = action.payload;
        }
      }
    );
  },
});

export const getVacanciesReducer = getVacancies.reducer;
