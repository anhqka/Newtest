import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createOrders, createPayOrder, getAllInfoInOrders,  getStylistsInOrder, getTimesOrders } from 'api/orders';
const initialState = {
  allInfoOrders: [],
  activedServices: false,
  indexServiceSelected: [],
  listServiceSelected: [],
  customerInfo: {},
  services: [],
  loading: false,
  loadingTime: false,
  loadingAll: false,
  loadingUpdate: false,
  loadingCustomerInfo: false,
  sendRequest: false,
  categorySelected: 0,
  hideListServicesSelected: false,
  hideSuggestedService: true,
  listStylist: [],
  stylist: {},
  timesOrders: [],
  orderPTTT: "",
}

export const fetchStylistInOrderAsynk = createAsyncThunk(
  "orders/fetchStylistInOrderAsynk",
  async (endpoint) => {
      const {data} = await getStylistsInOrder(endpoint)
    return data;
  }
)
export const fetchAllInfoInOrders = createAsyncThunk(
  "orders/fetchAllInfoInOrders",
  async (endpoint) => {
      const {data} = await getAllInfoInOrders(endpoint)
    return data;
  }
)
export const fetchTimesOrders = createAsyncThunk(
  "orders/fetchTimesOrders",
  async (info) => {
    console.log(info);
      const {data} = await getTimesOrders(info)
    return data;
  }
)
export const createOrdersAsync = createAsyncThunk(
  "orders/createOrdersAsync",
  async (info) => {
      const {data} = await createOrders(info)
    return data;
  }
)
export const createPayOrderAsync = createAsyncThunk(
  "orders/createPayOrderAsync",
  async (info) => {
      const {data} = await createPayOrder(info)
    return data;
  }
)


export const OrderSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
    },
    setLoadingCustomerInfo: (state, action) => {
      state.loadingCustomerInfo = action.payload
    },
    setActiveServices: (state) => {
      state.activedServices = !state.activedServices
    },
    setStoreOrder: (state, action) => {
      state.storeOrder = action.payload
    },
    setIndexServiceSelected: (state, action) => {
      state.indexServiceSelected = action.payload
    },
    setListServiceSelected: (state, action) => {
      state.listServiceSelected = action.payload
    },
    setSylist: (state, action) => {
      state.stylist = action.payload
    },
    setHideListServicesSelected: (state, action) => {
      state.hideListServicesSelected = action.payload
    },
    setHideSuggestedService: (state, action) => {
      state.hideSuggestedService = action.payload
      console.log(state.hideSuggestedService);
    },
    setCategorySelected: (state, action) => {
      state.categorySelected = action.payload
    },
    setCustomerInfo: (state, action) => {
      state.customerInfo = action.payload
    },
    setOrdersPTTT: (state, action) => {
      state.orderPTTT = action.payload
    }
  },
  extraReducers : builder => {
    builder
    .addCase(fetchStylistInOrderAsynk.pending, (state) =>{
      state.loading = true;
    }) 
    .addCase(fetchStylistInOrderAsynk.fulfilled, (state, action) =>{
      state.loading = false;
      state.listStylist = action.payload
    }) 
    .addCase(fetchAllInfoInOrders.pending, (state) =>{
      state.loadingAll = true;
    }) 
    .addCase(fetchAllInfoInOrders.fulfilled, (state, action) =>{
      state.loadingAll = false;
      state.allInfoOrders = action.payload
    }) 
    .addCase(fetchTimesOrders.pending, (state) =>{
      state.loadingTime = true;
    }) 
    .addCase(fetchTimesOrders.fulfilled, (state, action) =>{
      state.loadingTime = false;
      state.timesOrders = action.payload.dataTimes
    })
    .addCase(fetchTimesOrders.rejected, (state, action) =>{
      state.loadingTime = false;
    })
    .addCase(createOrdersAsync.pending, (state) =>{
      state.loadingAll = true;
    }) 
    .addCase(createOrdersAsync.fulfilled, (state, action) =>{
      state.loadingAll = false;
    })
    .addCase(createOrdersAsync.rejected, (state, action) =>{
      state.loadingAll = false;
    })
    
  }

})

export const {setOrdersPTTT, setCustomerInfo, setLoadingCustomerInfo, setLoading, setStoreOrder, setActiveServices, setListServiceSelected, setSylist, setIndexServiceSelected, setCategorySelected, setHideSuggestedService } = OrderSlice.actions

export default OrderSlice.reducer