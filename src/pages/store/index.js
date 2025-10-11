import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../AdminTemplates/AuthPage/slice";

export const store = configureStore({
  reducer: {
    authReducer,
  },
});
