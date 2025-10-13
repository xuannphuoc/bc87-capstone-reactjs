import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../AdminTemplates/AuthPage/slice";
import registerReducer from "./../AdminTemplates/RegisterPage/slice";

export const store = configureStore({
  reducer: {
    authReducer,
    registerReducer,
  },
});
