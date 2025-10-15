import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../services/apiServices";

export const createShowtime = createAsyncThunk(
  "showtime/createShowtime",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("QuanLyDatVe/TaoLichChieu", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getTheaterSystems = createAsyncThunk(
  "showtime/getTheaterSystems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("QuanLyRap/LayThongTinHeThongRap");
      return res.data.content || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getTheaterClusters = createAsyncThunk(
  "showtime/getTheaterClusters",
  async (theaterSystemId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${theaterSystemId}`
      );
      return res.data.content || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const showTimeReducer = createSlice({
  name: "showtime",
  initialState: {
    loading: false,
    error: null,
    success: false,
    theaterSystems: [],
    theaterClusters: [],
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.theaterClusters = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShowtime.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createShowtime.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createShowtime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getTheaterSystems.fulfilled, (state, action) => {
        state.theaterSystems = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(getTheaterClusters.fulfilled, (state, action) => {
        state.theaterClusters = Array.isArray(action.payload)
          ? action.payload
          : [];
      });
  },
});

export const { resetState } = showTimeReducer.actions;
export default showTimeReducer.reducer;
