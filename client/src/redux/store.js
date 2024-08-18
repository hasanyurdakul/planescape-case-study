import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";

// Basit bir store kurulumu. Sadece userReducer içermekte.
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
