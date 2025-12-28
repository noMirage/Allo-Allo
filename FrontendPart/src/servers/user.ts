import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GET_USER } from "../configs/configs";
import { utilServer } from "../utils/js/utilServer";
import { TLoading } from "../interfaces/typeReduxThunk";
import { IUser, IUserEmployer } from "../interfaces/user";

export interface IinitialStateUser {
  loading: TLoading;
  data: {};
}

export const getUser = createAsyncThunk(
  "getUser",
  async (_, { rejectWithValue }) => {
    const dataServer = await utilServer(GET_USER, "get", {}, rejectWithValue);
    return dataServer ? dataServer : {};
  }
);

const initialState: IinitialStateUser = {
  loading: "idle",
  data: {},
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state: IinitialStateUser) => {
      state.data = {};
    },
    update: (state: IinitialStateUser, action: PayloadAction<IUser | IUserEmployer>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state: IinitialStateUser) => {
      state.loading = "pending";
    });
    builder.addCase(getUser.rejected, (state: IinitialStateUser, action) => {
      state.loading = "failed";
    });
    builder.addCase(
      getUser.fulfilled,
      (state: IinitialStateUser, action: PayloadAction<IUser | IUserEmployer | {}>) => {
        state.loading = "succeeded";
        state.data = action.payload;
        console.log(state.data);
      }
    );
  },
});

export const userReducer = user.reducer;
export const { logOut, update } = user.actions;
