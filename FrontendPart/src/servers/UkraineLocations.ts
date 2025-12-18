import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_UKRAINE_LOCATIONS } from "../configs/configs";
import { TLoading } from "../interfaces/typeReduxThunk";
import { IUkraineLocation } from "../interfaces/UkraineLocations";
import axios from "axios";

export interface IinitialStateUkraineLocations {
  loading: TLoading;
  data: IUkraineLocation[] | [];
}

export const getUkraineLocations = createAsyncThunk(
  "getUkraineLocations",
  async () => {
    const responseServer = await axios.get(GET_UKRAINE_LOCATIONS);
    const dataServer: IUkraineLocation[] = responseServer.data;
    return dataServer;
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
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          state.data = action.payload;
        }
      }
    );
  },
});

export const UkraineLocationsReducer = UkraineLocations.reducer;
