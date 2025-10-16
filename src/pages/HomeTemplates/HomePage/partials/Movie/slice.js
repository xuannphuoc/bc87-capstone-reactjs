import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../../../services/apiServices.js";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

export const movieSlice = createAsyncThunk(
    'movieSlice',
    async (__,{rejectWithValue}) => {
        try {
            const response = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
            return response.data.content;
        }
        catch (error) {
            return rejectWithValue(error.response?.data|| error.message);
        }
    }
);

const movieReducer = createSlice({
    name: 'listMovieReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(movieSlice.pending, (state) => {
                state.loading = true;
            })
            .addCase(movieSlice.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(movieSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default movieReducer.reducer;