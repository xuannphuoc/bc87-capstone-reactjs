import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../services/apiServices";

export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addMovie = createAsyncThunk(
  "movie/addMovie",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("QuanLyPhim/ThemPhimUploadHinh", formData);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("QuanLyPhim/CapNhatPhimUpload", formData);
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  "movie/deleteMovie",
  async (maPhim, { rejectWithValue }) => {
    try {
      await api.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
      return maPhim;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const movieReducer = createSlice({
  name: "movie",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addMovie.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(updateMovie.fulfilled, (state, action) => {
        const idx = state.list.findIndex(
          (m) => m.maPhim === action.payload.maPhim
        );
        if (idx !== -1) state.list[idx] = action.payload;
      })

      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.list = state.list.filter((m) => m.maPhim !== action.payload);
      });
  },
});

export default movieReducer.reducer;
