import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStatisticOrders } from "api/statistic";

const initialState = {
  statisticOrders: [],
  loading: false,
  sendRequest: false,
};

export const fetchStatisticOrdersAsync = createAsyncThunk(
  "statistic/fetchStatisticOrdersAsync",
  async (id) => {
    const { data } = await getStatisticOrders(id);
    return data;
  }
);

export const StatisticSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatisticOrdersAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchStatisticOrdersAsync.fulfilled, (state, action) => {
        state.loading = false
        state.statisticOrders = action.payload
      })
      .addCase(fetchStatisticOrdersAsync.rejected, (state) => {
        state.loading = false;
      })
    
  },
});

export const { setLoading, setCategories } = StatisticSlice.actions;

export default StatisticSlice.reducer;
