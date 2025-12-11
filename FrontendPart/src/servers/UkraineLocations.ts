import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_UKRAINE_LOCATIONS } from "../configs/configs";
import { utilServer } from "../utils/js/utilServer";
import { TLoading } from "../interfaces/typeReduxThunk";
import { IUkraineLocation } from "../interfaces/UkraineLocations";

export interface IinitialStateUkraineLocations {
  loading: TLoading;
  data: IUkraineLocation[] | [];
}

export const getUkraineLocations = createAsyncThunk(
  "getUkraineLocations",
  async (data, { rejectWithValue }) => {
    const dataServer = await utilServer<IUkraineLocation[]>(
      GET_UKRAINE_LOCATIONS,
      "get",
      {},
      rejectWithValue
    );
    return dataServer ? dataServer : [];
  }
);

const initialState: IinitialStateUkraineLocations = {
  loading: "idle",
  data: [],
};

const UkraineLocations = createSlice({
  name: "ukraineLocations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUkraineLocations.pending,
      (state: IinitialStateUkraineLocations) => {
        state.loading = "pending";
      }
    );
    builder.addCase(
      getUkraineLocations.rejected,
      (state: IinitialStateUkraineLocations, action) => {
        state.loading = "failed";
      }
    );
    builder.addCase(
      getUkraineLocations.fulfilled,
      (state: IinitialStateUkraineLocations, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      }
    );
  },
});

export const UkraineLocationsReducer = UkraineLocations.reducer;
