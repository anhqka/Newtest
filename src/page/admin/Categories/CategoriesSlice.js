import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  getCategories,
  removeCategory,
  updateCategory,
} from "api/categories";

const initialState = {
  categories: {},
  loading: false,
  sendRequest: false,
};

export const fetchCategoriesAsynk = createAsyncThunk(
  "categories/fetchCategoriesAsynk",
  async (entpoint) => {
    const { data } = await getCategories(entpoint);
    return data;
  }
);
export const addCategoryAsynk = createAsyncThunk(
  "categories/addCategoryAsynk",
  async (data) => {
    return await addCategory(data);
  }
);
export const updateCategoryAsynk = createAsyncThunk(
  "categories/updateCategoryAsynk",
  async (category) => {
    const { data } = await updateCategory(category);
    return data;
  }
);
export const removeCategoryAsynk = createAsyncThunk(
  "categories/removeCategoryAsynk",
  async (id) => {
    const { data } = await removeCategory(id);
    return data;
  }
);

export const CategoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setCategories: (state, action) => {
      state.categories = [...state.categories, action.payload];
      console.log(state.categories, "123231");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsynk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesAsynk.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(addCategoryAsynk.pending, (state) => {
        state.sendRequest = true;
      })
      .addCase(addCategoryAsynk.fulfilled, (state, action) => {
        state.sendRequest = false;
        state.categories.data.data.pop();
        state.categories.data.data = [
          action.payload.data.data,
          ...state.categories.data.data,
        ];
      })
      .addCase(updateCategoryAsynk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoryAsynk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeCategoryAsynk.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCategoryAsynk.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { setLoading, setCategories } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
