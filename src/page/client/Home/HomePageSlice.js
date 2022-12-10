import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCategories } from 'api/categories';
import { getBanners } from 'api/partials';
import { getAllServices, getServicesByCategory } from 'api/services';
import { getAllStores } from 'api/stores';

const initialState = {
    loading: false,
    loadingHome: false,
    loadingBanner: [],
    categories: [],
    services: [],
    banners: []
}
export const fetchCategoriesAsync = createAsyncThunk(
    "home/fetchCategoriesAsync",
    async () => {
        const { data } = await getCategories();
        return data;
    }
);
export const fetchBannersAsync = createAsyncThunk(
    "home/fetchBannersAsync",
    async () => {
        const { data } = await getBanners();
        return data;
    }
);
export const fetchServicesByCategoryAsync = createAsyncThunk(
    "home/fetchServicesByCategoryAsync",
    async (id) => {
        console.log(id);
        const { data } = await getServicesByCategory(id);
        return data;
    }
);

export const HomePageSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },

    },
    extraReducers: builder => {
        builder
            .addCase(fetchBannersAsync.pending, (state) => {
                state.loadingBanner = true;
            })
            .addCase(fetchBannersAsync.fulfilled, (state, action) => {
                state.banners = action.payload;
                state.loadingBanner = false;
            })
            .addCase(fetchBannersAsync.rejected, (state) => {
                state.loadingBanner = false;
            })
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.loadingHome = true;
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchCategoriesAsync.rejected, (state) => {
                state.loadingHome = false;
            })
            .addCase(fetchServicesByCategoryAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchServicesByCategoryAsync.fulfilled, (state, action) => {
                state.services = action.payload;
                state.loading = false;
                state.loadingHome = false;

            })
            .addCase(fetchServicesByCategoryAsync.rejected, (state) => {
                state.loading = false;
            })

    }
})

export const { setLoading } = HomePageSlice.actions

export default HomePageSlice.reducer