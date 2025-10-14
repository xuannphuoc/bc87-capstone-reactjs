import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../AdminTemplates/AuthPage/slice";
import registerReducer from "./../AdminTemplates/RegisterPage/slice";
import movieReducer from "./../AdminTemplates/CatalogPage/slice";

export const store = configureStore({
  reducer: {
    authReducer,
    registerReducer,
    movieReducer,
  },
});
