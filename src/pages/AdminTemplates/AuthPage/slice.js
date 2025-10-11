import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "./../../services/apiServices";

const adminInfo = localStorage.getItem("ADMIN_INFO")
  ? JSON.parse(localStorage.getItem("ADMIN_INFO"))
  : null;

const initialState = {
  loading: false,
  data: adminInfo,
  error: null,
};

export const authenLogin = createAsyncThunk(
  "authenLogin",
  async (user, { rejectWithValue }) => {
    try {
      const response = await api.post(`QuanLyNguoiDung/DangNhap`, user);
      const authInfo = response.data.content;

      // Check permission user
      if (
        authInfo.maLoaiNguoiDung === "KhachHang" ||
        authInfo.maLoaiNguoiDung === "khachHang"
      ) {
        // lock
        return rejectWithValue({
          response: {
            data: {
              content: "Không có quyền truy cập!",
            },
          },
        });
      }

      // local storage
      localStorage.setItem("ADMIN_INFO", JSON.stringify(authInfo));

      return authInfo;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenLogin.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(authenLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });

    builder.addCase(authenLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authReducer.reducer;
