import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_WORKERS } from "../configs/configs";
import { utilServer } from "../utils/js/utilServer";
import { TLoading } from "../interfaces/typeReduxThunk";
import { IBaseinfoWorkers } from "../interfaces/works";

export interface IinitialStateSearchWorkers {
  loading: TLoading;
  data: IBaseinfoWorkers[] | [];
}

export const getWorkers = createAsyncThunk<
  IBaseinfoWorkers[],
  void,
  { rejectValue: string }
>("getWorkers", async (data, { rejectWithValue }) => {
  const dataServer = await utilServer<IBaseinfoWorkers[]>(
    GET_WORKERS,
    "get",
    {},
    rejectWithValue
  );
  return dataServer ? dataServer : [];
});

const initialState: IinitialStateSearchWorkers = {
  loading: "idle",
  data: [],
};

const searchWorkers = createSlice({
  name: "searchWorkers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkers.pending, (state: IinitialStateSearchWorkers) => {
      state.loading = "pending";
    });
    builder.addCase(
      getWorkers.rejected,
      (state: IinitialStateSearchWorkers, action) => {
        state.loading = "failed";
      }
    );
    builder.addCase(
      getWorkers.fulfilled,
      (state: IinitialStateSearchWorkers, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      }
    );
  },
});

export const searchWorkersReducer = searchWorkers.reducer;
