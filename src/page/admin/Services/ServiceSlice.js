import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addServices,
  updateService,
  getAllServices,
  removeServices,
} from "api/services";

const initialState = {
  services: [],
  loading: false,
  loadingModal: false,
  sendRequest: false,
};

export const fetchServicesAsync = createAsyncThunk(
  "services/fetchServicesAsync",
  async (entpoint) => {
    const { data } = await getAllServices(entpoint);
    return data;
  }
);
export const addServicesAsync = createAsyncThunk(
  "services/addServicesAsync",
  async (service) => {
    const { data } = await addServices(service);
    return data;
  }
);
export const editServicesAsync = createAsyncThunk(
  "services/editServicesAsync",
  async (service) => {
    const { data } = await updateService(service);
    return data;
  }
);
export const removeServicesAsync = createAsyncThunk(
  "services/removeServicesAsync",
  async (id) => {
    const { data } = await removeServices(id);
    return data;
  }
);

export const ServicesSlice = createSlice({
  name: "services",
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
      .addCase(fetchServicesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServicesAsync.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(addServicesAsync.pending, (state) => {
        state.loadingModal = true;
      })
      .addCase(addServicesAsync.fulfilled, (state, action) => {
        state.loadingModal = false;
        state.services.data.data.pop();
        state.services.data.data = [
          action.payload.data,
          ...state.services.data.data,
        ];
      })
      .addCase(editServicesAsync.pending, (state) => {
        state.loadingModal = true;
      })
      .addCase(editServicesAsync.fulfilled, (state) => {
        state.loadingModal = false;
      })
      .addCase(removeServicesAsync.pending, (state) => {
        state.loadingModal = true;
      })
      .addCase(removeServicesAsync.fulfilled, (state) => {
        state.loadingModal = false;
      });
  },
});

export const { setLoading, setLoadingModal } = ServicesSlice.actions;

export default ServicesSlice.reducer;
