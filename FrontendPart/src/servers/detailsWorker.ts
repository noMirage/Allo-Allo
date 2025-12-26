import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_DETAILS_WORKER } from "../configs/configs";
import { utilServer } from "../utils/js/utilServer";
import { TLoading } from "../interfaces/typeReduxThunk";
import { IResume } from "../interfaces/resume";

export interface IinitialStateDetailsWorker {
  loading: TLoading;
  data: IResume | {};
}

export const getDetailsWorker = createAsyncThunk(
  "getDetailsWorker",
  async (id: number, { rejectWithValue }) => {
    const dataForm = new FormData();
    dataForm.append("id", JSON.stringify(id));
    const dataServer = await utilServer<IResume>(
      GET_DETAILS_WORKER,
      "get",
      dataForm,
      rejectWithValue
    );
    return dataServer ? dataServer : {};
  }
);

const initialState: IinitialStateDetailsWorker = {
  loading: "idle",
  data: {},
};

const detailsWorker = createSlice({
  name: "detailsWorker",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getDetailsWorker.pending,
      (state: IinitialStateDetailsWorker) => {
        state.loading = "pending";
      }
    );
    builder.addCase(
      getDetailsWorker.rejected,
      (state: IinitialStateDetailsWorker, action) => {
        state.loading = "failed";
      }
    );
    builder.addCase(
      getDetailsWorker.fulfilled,
      (state: IinitialStateDetailsWorker, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      }
    );
  },
});

export const detailsWorkerReducer = detailsWorker.reducer;
