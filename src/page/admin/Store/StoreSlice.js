import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addStore,
  getServicesStore,
  getStores,
  removeStore,
  updateServicesStore,
  updateStore,
} from "api/stores";

const initialState = {
  stores: {},
  loading: false,
  loadingModal: false,
  sendRequest: false,
  servicesStore: [],
};



export const fetchStoresAsynk = createAsyncThunk(
  "stores/fetchStoresAsynk",
  async (entpoint) => {
    const { data } = await getStores(entpoint);
    return data;
  }
);
export const addStoresAsynk = createAsyncThunk(
  "stores/addStoresAsynk",
  async (store) => {
    const { data } = await addStore(store);
    return data;
  }
);
export const updateStoresAsynk = createAsyncThunk(
  "stores/updateStoresAsynk",
  async (store) => {
    const data = await updateStore(store);
    return data;
  }
);
export const removeStoresAsynk = createAsyncThunk(
  "stores/removeStoresAsynk",
  async (id) => {
    const { data } = await removeStore(id);
    return data;
  }
);

export const fetchServicesStoreAsynk = createAsyncThunk(
  "stores/fetchServicesStorek",
  async (id) => {
    const { data } = await getServicesStore(id);
    return data;
  }
);
export const updateServicesStoreAsynk = createAsyncThunk(
  "stores/updateServicesStoreAsynk",
  async (service) => {
    const { data } = await updateServicesStore(service);
    return data;
  }
);

export const StoreSlice = createSlice({
  name: "stores",
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
      .addCase(fetchStoresAsynk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStoresAsynk.fulfilled, (state, action) => {
        state.stores = action.payload;
        state.loading = false;
      })
      .addCase(addStoresAsynk.pending, (state) => {
        state.loadingModal = true;
      })
      .addCase(addStoresAsynk.fulfilled, (state, action) => {
        state.loadingModal = false;
        state.stores.data.data.pop();
        state.stores.data.data = [
          action.payload.data,
          ...state.stores.data.data,
        ];
      })
      .addCase(updateStoresAsynk.pending, (state) => {
        state.loadingModal = true;
      })
      .addCase(updateStoresAsynk.fulfilled, (state, action) => {
        state.loadingModal = false;
      })
   
      .addCase(fetchServicesStoreAsynk.pending, (state) => {
        state.loadingModal = true;
      })
      .addCase(fetchServicesStoreAsynk.fulfilled, (state, action) => {
        state.loadingModal = false;
        state.servicesStore = action.payload;
      })

      .addCase(updateServicesStoreAsynk.pending, (state) => {
        state.loadingModal = true;
      })
      .addCase(updateServicesStoreAsynk.fulfilled, (state, action) => {
        state.loadingModal = false;
      })

      .addCase(addStoresAsynk.rejected, (state, action) => {
        state.loadingModal = false;
      });
  },
});

export const { setLoading, setLoadingModal } = StoreSlice.actions;

export default StoreSlice.reducer;
