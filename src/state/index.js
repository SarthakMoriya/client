import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  secretkey: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.secretkey = action.payload.secretkey || "null";
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
      state.secretkey = null
    },
  },
});

export const recordsSlice = createSlice({
  name: "records",
  initialState: { records: [] },
  reducers: {
    setRecords: (state, action) => {
      state.records = action.payload.records;
    },
  },
});

//Functions to use in Application to handle auth
export const { setLogin, setLogout } = authSlice.actions;
export const { setRecords } = recordsSlice.actions;

export const authReducers = authSlice.reducer;
export const recordReducers = recordsSlice.reducer;
