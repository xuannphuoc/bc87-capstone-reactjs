import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../AdminTemplates/AuthPage/slice";
import registerReducer from "./../AdminTemplates/RegisterPage/slice";
import movieReducer from "./../AdminTemplates/CatalogPage/slice";
import userReducer from "./../AdminTemplates/AddUserPage/slice";
import userListReducer from "./../AdminTemplates/UserListsPage/slice";
import showTimeReducer from "./../AdminTemplates/ShowtimePage/slice";

export const store = configureStore({
  reducer: {
    authReducer,
    registerReducer,
    movie: movieReducer,
    userReducer,
    userList: userListReducer,
    showtime: showTimeReducer,
  },
});
