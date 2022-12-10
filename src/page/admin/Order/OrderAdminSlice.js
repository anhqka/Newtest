import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEmptyStaffPurchaseOrder, getPurchaseOrder, getPurchaseOrdersOfStylist, getRegisteredOrdersOfStylist, updateEmptyStaffPurchaseOrder, updateStatusPurchaseOrder } from "api/orders";

const initialState = {
    services: [],
    loading: false,
    loadingModal: false,
    sendRequest: false,
    purchaseOrder: [],
    loadingUpdate: false,
    hideSelectStylist: false,
    stylistSelected: [],
    stylist: [],
    ordersOfStylist: [],
    registeredOrders: []
};

export const fetchPurchaseOrders = createAsyncThunk(
    "orderadmin/fetchPurchaseOrders",
    async () => {
        const { data } = await getPurchaseOrder();
        return data;
    }
);
export const fetchPurchaseOrdersOfStylist = createAsyncThunk(
    "orderadmin/fetchPurchaseOrdersOfStylist",
    async () => {
        const { data } = await getPurchaseOrdersOfStylist();
        return data;
    }
);
export const fetchRegisteredOrdersOfStylistAsync = createAsyncThunk(
    "orderadmin/fetchRegisteredOrdersOfStylistAsync",
    async () => {
        const { data } = await getRegisteredOrdersOfStylist();
        return data;
    }
);

export const updateStatusPurchaseOrderAsync = createAsyncThunk(
    "orderadmin/updateStatusPurchaseOrderAsync",
    async (order) => {
        const { data } = await updateStatusPurchaseOrder(order)
        return data
    }
)
export const fetchEmptyStaffPurchaseOrderAsync = createAsyncThunk(
    "orderadmin/fetchEmptyStaffPurchaseOrderAsync",
    async (detailId) => {
        const { data } = await getEmptyStaffPurchaseOrder(detailId)
        return data
    }
)
export const updateEmptyStaffPurchaseOrderAsync = createAsyncThunk(
    "orderadmin/updateEmptyStaffPurchaseOrderAsync",
    async (order) => {
        const { data } = await updateEmptyStaffPurchaseOrder(order)
        return data
    }
)
// updateEmptyStaffPurchaseOrder

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
            .addCase(fetchPurchaseOrders.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchPurchaseOrders.fulfilled, (state, action) => {
                state.purchaseOrder = action.payload
                state.loading = false
            })
            .addCase(fetchPurchaseOrders.rejected, (state) => {
                state.loading = false
            })

            .addCase(fetchPurchaseOrdersOfStylist.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchPurchaseOrdersOfStylist.fulfilled, (state, action) => {
                state.ordersOfStylist = action.payload
                state.loading = false
            })
            .addCase(fetchPurchaseOrdersOfStylist.rejected, (state) => {
                state.loading = false
            })

            .addCase(updateStatusPurchaseOrderAsync.pending, (state) => {
                state.loadingUpdate = true
            })
            .addCase(updateStatusPurchaseOrderAsync.fulfilled, (state) => {
                state.loadingUpdate = false
            })
            .addCase(updateStatusPurchaseOrderAsync.rejected, (state) => {
                state.loadingUpdate = false
            })

            .addCase(fetchEmptyStaffPurchaseOrderAsync.pending, (state) => {
                state.loadingModal = true
            })
            .addCase(fetchEmptyStaffPurchaseOrderAsync.fulfilled, (state, action) => {
                state.loadingModal = false
                console.log(action.payload);
            })
            .addCase(fetchEmptyStaffPurchaseOrderAsync.rejected, (state) => {
                state.loadingModal = false
            })
            .addCase(fetchRegisteredOrdersOfStylistAsync.pending, (state) => {
                state.loadingModal = true
            })
            .addCase(fetchRegisteredOrdersOfStylistAsync.fulfilled, (state, action) => {
                state.loadingModal = false
                state.registeredOrders = action.payload.data
            })
            .addCase(fetchRegisteredOrdersOfStylistAsync.rejected, (state) => {
                state.loadingModal = false
            })

            
            .addCase(updateEmptyStaffPurchaseOrderAsync.pending, (state) => {
                state.loadingModal = true
            })
            .addCase(updateEmptyStaffPurchaseOrderAsync.fulfilled, (state, action) => {
                state.loadingModal = false
                console.log(action.payload);
            })
            .addCase(updateEmptyStaffPurchaseOrderAsync.rejected, (state) => {
                state.loadingModal = false
            })


            // 
            

            
    }
});

export const { setLoading, setLoadingModal } = ServicesSlice.actions;

export default ServicesSlice.reducer;
