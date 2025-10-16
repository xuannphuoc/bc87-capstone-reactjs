import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../AdminTemplates/AuthPage/slice";
import registerReducer from "./../AdminTemplates/RegisterPage/slice";
import movieReducer from "./../AdminTemplates/CatalogPage/slice";
import userReducer from "./../AdminTemplates/AddUserPage/slice";
import userListReducer from "./../AdminTemplates/UserListsPage/slice";
import listMovieReducer from "./../HomeTemplates/HomePage/partials/Movie/slice.js";
import detailMovieReducer from "./../HomeTemplates/DetailPage/slice";
import showTimeReducer from "./../AdminTemplates/ShowtimePage/slice";

export const store = configureStore({
  reducer: {
    authReducer,
    registerReducer,
    movieReducer,
    listMovieReducer,
    detailMovieReducer,
    movie: movieReducer,
    userReducer,
    userList: userListReducer,
    showtime: showTimeReducer,
  },
});
