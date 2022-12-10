import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCustomers } from "api/customer";

const initialState = {
  stores: {},
  loading: false,
  loadingModal: false,
  sendRequest: false,
  customers: [],
};

export const fetchCustomerAsynk = createAsyncThunk(
  "customers/fetchCustomerAsynk",
  async () => {
    const { data } = await getCustomers();
    return data;
  }
);

export const CustomerSlice = createSlice({
  name: "customer",
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
      .addCase(fetchCustomerAsynk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerAsynk.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomerAsynk.rejected, (state) => {
        state.loading = false;
      })
  },
});

export const { setLoading, setLoadingModal } = CustomerSlice.actions;

export default CustomerSlice.reducer;
