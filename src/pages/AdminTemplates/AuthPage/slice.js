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

      // Check quyền
      if (
        authInfo.maLoaiNguoiDung === "KhachHang" ||
        authInfo.maLoaiNguoiDung === "khachHang"
      ) {
        return rejectWithValue({
          response: {
            data: {
              content: "Không có quyền truy cập!",
            },
          },
        });
      }

      // Lưu localStorage
      localStorage.setItem("ADMIN_INFO", JSON.stringify(authInfo));

      return authInfo;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Lấy thông tin người dùng
export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("ADMIN_INFO"))?.accessToken;
      if (!token) return rejectWithValue("Token không tồn tại!");

      const res = await axios.post(
        "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayThongTinNguoiDung",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            TokenCybersoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5DaGluaCI6IlByb2plY3QgTW92aWUgTmV3IiwiSG9hVFRlbmMiOiIyNS8wOC8yMDI1IDIzOjU5OjM0IiwiSGV0SGFuZ1RhbSI6Ilh1YW4gUGjGsOG7nWMiLCJpYXQiOjE3MjM1NTM1NzR9.X9JZBa5f0GvSV-uhOMZ7H-txy0zNg9_l4e-0P3oXuiY",
          },
        }
      );

      return res.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content || "Lỗi khi lấy thông tin người dùng"
      );
    }
  }
);

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.data = action.payload;
      localStorage.setItem("ADMIN_INFO", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("ADMIN_INFO");
    },
    updateProfile: (state, action) => {
      state.data = { ...state.data, ...action.payload };
      localStorage.setItem("ADMIN_INFO", JSON.stringify(state.data));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(authenLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { loginSuccess, logout, updateProfile } = authReducer.actions;
export default authReducer.reducer;
