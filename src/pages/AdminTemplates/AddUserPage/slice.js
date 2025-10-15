import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../services/apiServices";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
      );
      return res.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content || "Lỗi tải danh sách"
      );
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post("QuanLyNguoiDung/ThemNguoiDung", user);
      dispatch(fetchUsers());
      return res.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content || "Lỗi thêm người dùng"
      );
    }
  }
);

const userReducer = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userReducer.reducer;
