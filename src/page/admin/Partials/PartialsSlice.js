import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addBanners, getBanners, removeBanner, updateBanner, updateSocial } from "api/partials";
import { updateStatusBanner, updateStatusSocial, addSocials, getSocials, removeSocial } from "../../../api/partials";

const initialState = {
    categories: {},
    loading: false,
    loadingModal: false,
    loadingButtonModal: false,
    banners: false,
    socials: [],
    sendRequest: false,
};

export const fetchBannersAsync = createAsyncThunk(
    "partials/fetchBannersAsync",
    async () => {
        const { data } = await getBanners();
        return data;
    }
);

export const removeBannesAsync = createAsyncThunk(
    "partials/removeBannesAsync",
    async (id) => {
        const { data } = await removeBanner(id);
        return data;
    }
);

export const createBannersAsync = createAsyncThunk(
    "partials/createBannersAsync",
    async (banner) => {
        const { data } = await addBanners(banner);
        return data;
    }
);

export const updateBannersAsync = createAsyncThunk(
    "partials/updateBannersAsync",
    async (banner) => {
        const { data } = await updateBanner(banner);
        return data;
    }
);
export const updateStatusBannersAsync = createAsyncThunk(
    "partials/updateStatusBannersAsync",
    async (id) => {
        const { data } = await updateStatusBanner(id);
        return data;
    }
);
export const updateStatusSocialAsync = createAsyncThunk(
    "partials/updateStatusSocialAsync",
    async (id) => {
        const { data } = await updateStatusSocial(id);
        return data;
    }
);

export const fetchSocialsAsync = createAsyncThunk(
    "partials/fetchSocialsAsync",
    async () => {
        const { data } = await getSocials();
        return data;
    }
);

export const removeSocialAsync = createAsyncThunk(
    "partials/removeSocialAsync",
    async (id) => {
        const { data } = await removeSocial(id);
        return data;
    }
);

export const createSocialsAsync = createAsyncThunk(
    "partials/createSocialsAsync",
    async (social) => {
        const { data } = await addSocials(social);
        return data;
    }
);
export const updateSocialAsync = createAsyncThunk(
    "partials/updateSocialAsync",
    async (social) => {
        const { data } = await updateSocial(social);
        return data;
    }
);


export const PartialsSlice = createSlice({
    name: "partials",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true;
        },
        removeAndUpdateBanners: (state, action) => {
            state.banners.data.data = state.banners.data.data.filter((banner) => banner.id !== action.payload.id)
        },
        removeAndUpdateSocials: (state, action) => {
            state.socials.data.data = state.socials.data.data.filter((socials) => socials.id !== action.payload.id)
        },



    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBannersAsync.pending, (state) => {
                state.loadingModal = true;
            })
            .addCase(fetchBannersAsync.fulfilled, (state, action) => {
                state.banners = action.payload;
                state.loading = false;
            })
            .addCase(fetchBannersAsync.rejected, (state) => {
                state.loadingModal = false;
            })
            .addCase(createBannersAsync.pending, (state) => {
                state.loadingButtonModal = true;
            })
            .addCase(createBannersAsync.fulfilled, (state, action) => {
                state.banners.data.data = [
                    action.payload.data,
                    ...state.banners.data.data,
                ];
                state.loadingButtonModal = false;
            })
            .addCase(createBannersAsync.rejected, (state) => {
                state.loadingButtonModal = false;
            })

            .addCase(updateBannersAsync.pending, (state) => {
                state.loadingButtonModal = true;
            })
            .addCase(updateBannersAsync.fulfilled, (state) => {
                state.loadingButtonModal = false;
            })
            .addCase(updateBannersAsync.rejected, (state) => {
                state.loadingButtonModal = false;
            })
            .addCase(removeBannesAsync.pending, (state) => {
                state.loadingButtonModal = true;
            })
            .addCase(removeBannesAsync.fulfilled, (state, action) => {
                state.loadingButtonModal = false;
            })
            .addCase(removeBannesAsync.rejected, (state) => {
                state.loadingButtonModal = false;

            })

            // social
            .addCase(fetchSocialsAsync.pending, (state) => {
                state.loadingModal = true;
            })
            .addCase(fetchSocialsAsync.fulfilled, (state, action) => {
                state.socials = action.payload;
                state.loading = false;
            })
            .addCase(fetchSocialsAsync.rejected, (state) => {
                state.loadingModal = false;
            })
            .addCase(createSocialsAsync.pending, (state) => {
                state.loadingButtonModal = true;
            })
            .addCase(createSocialsAsync.fulfilled, (state, action) => {
                state.socials.data.data = [
                    action.payload.data,
                    ...state.socials.data.data,
                ];
                state.loadingButtonModal = false;
            })
            .addCase(createSocialsAsync.rejected, (state) => {
                state.loadingButtonModal = false;
            })
            .addCase(removeSocialAsync.pending, (state) => {
                state.loadingButtonModal = true;
            })
            .addCase(removeSocialAsync.fulfilled, (state, action) => {
                state.loadingButtonModal = false;
            })
            .addCase(removeSocialAsync.rejected, (state) => {
                state.loadingButtonModal = false;
            })
            .addCase(updateSocialAsync.pending, (state) => {
                state.loadingButtonModal = true;
            })
            .addCase(updateSocialAsync.fulfilled, (state) => {
                state.loadingButtonModal = false;
            })
            .addCase(updateSocialAsync.rejected, (state) => {
                state.loadingButtonModal = false;
            })

    },
});

export const { setLoading, removeAndUpdateBanners, removeAndUpdateSocials, updateBanners } = PartialsSlice.actions;

export default PartialsSlice.reducer;
