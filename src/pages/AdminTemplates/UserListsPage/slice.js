import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../services/apiServices";

export const fetchUserList = createAsyncThunk(
  "userList/fetchUserList",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
      );
      console.log("API response:", res.data.content);
      return res.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content || "Lỗi tải danh sách người dùng"
      );
    }
  }
);

const userListReducer = createSlice({
  name: "userList",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userListReducer.reducer;
