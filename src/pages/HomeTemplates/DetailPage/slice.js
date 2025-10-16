import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../services/apiServices.js";


const initialState = {
    loading: false,
    data: null,
    error: null,
}

export const fetchDetailMovie = createAsyncThunk(
    "fetchDetailMovie",
    async (id, {rejectWithValue}) => {
        try {
            const response = await api.get(`QuanLyPhim/LayPhimTheoId?maPhim=${id}`);
            return response.data.content;
        }
        catch (error) {
            return rejectWithValue(error.response?.data|| error.message);
        }
    }
);

const detailReducer = createSlice({
    name: 'detailMovieReducer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDetailMovie.pending, (state) => {
                state.loading = true;
            });
        builder.addCase(fetchDetailMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            });
        builder.addCase(fetchDetailMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default detailReducer.reducer;