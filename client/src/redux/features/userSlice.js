import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    userLogout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.email = "";
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
