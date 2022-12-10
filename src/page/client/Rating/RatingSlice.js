import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addHistory, detailHistory, listHistories } from "api/history";

const initialState = {
  history: [],
  detailhistory: [],
  loading: false,
  loadingModal: false,
  sendRequest: false,
};
export const fetchHistoryAsync = createAsyncThunk(
  "history/fetchHistoryAsync",
  async () => {
    const { data } = await listHistories();
    return data;
  }
);
export const detailHistoryAsync = createAsyncThunk(
  "history/detailHistoryAsync",
  async (id, token) => {
    const { data } = await detailHistory(id, token);
    return data;
  }
);
export const addHistoryAsync = createAsyncThunk(
  "history/addHistoryAsync",
  async (id, history) => {
    const { data } = await addHistory(id, history);
    return data;
  }
);

export const RatingSlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setLoadingModal: (state, action) => {
      state.loadingModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoryAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHistoryAsync.fulfilled, (state, action) => {
        state.history = action.payload;
        state.loading = false;
      })
      .addCase(detailHistoryAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(detailHistoryAsync.fulfilled, (state, action) => {
        state.detailhistory = action.payload;
        state.loading = false;
      })
      .addCase(addHistoryAsync.pending, (state) => {
        state.loadingModal = true;
      })
      .addCase(addHistoryAsync.fulfilled, (state, action) => {
        state.history = action.payload;
        state.loadingModal = false;
      });
  },
});

export const { setLoading, setLoadingModal } = RatingSlice.actions;

export default RatingSlice.reducer;
