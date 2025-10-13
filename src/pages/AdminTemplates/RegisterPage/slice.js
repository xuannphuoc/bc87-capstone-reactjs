import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/apiServices";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const registerUser = createAsyncThunk(
  "registerUser",
  async (user, { rejectWithValue }) => {
    try {
      console.log(">>> DỮ LIỆU GỬI LÊN:", user);
      const response = await api.post("QuanLyNguoiDung/DangKy", {
        taiKhoan: user.taiKhoan,
        matKhau: user.matKhau,
        email: user.email,
        soDt: user.soDt,
        maNhom: "GP01",
        hoTen: user.taiKhoan,
      });

      return response.data.content;
    } catch (error) {
      console.log(">>> LỖI:", error.response?.data);
      const message =
        error.response?.data?.content || "Đăng ký thất bại, vui lòng thử lại!";
      return rejectWithValue(message);
    }
  }
);

// Slice
const registerReducer = createSlice({
  name: "registerReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Giờ payload là string, an toàn
      });
  },
});

export default registerReducer.reducer;
