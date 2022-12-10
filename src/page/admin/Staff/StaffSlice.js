import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addSchedule,
  addStylist,
  datePicker,
  getAllStylist,
  getSchedule,
  getStylist,
  updateStylist,
} from "api/stylists";

const initialState = {
  staffs: {},
  schedule: [],
  loading: false,
  loadingModal: false,
};

export const fetchStaffAsynk = createAsyncThunk(
  "staffs/fetchStaffAsynk",
  async (entpoint) => {
    const { data } = await getAllStylist(entpoint);
    return data;
  }
);
export const detailStaffAsynk = createAsyncThunk(
  "staffs/detailStaffAsynk",
  async (id) => {
    const { data } = await getStylist(id);
    return data;
  }
);
export const addStaffAsynk = createAsyncThunk(
  "staffs/addStaffAsynk",
  async (staff) => {
    const { data } = await addStylist(staff);
    return data;
  }
);
export const editStaffAsynk = createAsyncThunk(
  "staffs/editStaffAsynk",
  async (id, staff) => {
    const { data } = await updateStylist(id, staff);
    return data;
  }
);
export const getDateAsynk = createAsyncThunk(
  "staffs/getDateAsynk",
  async () => {
    const { data } = await datePicker();
    return data;
  }
);
export const fetchScheduleAsynk = createAsyncThunk(
  "staffs/fetchScheduleAsynk",
  async () => {
    const { data } = await getSchedule();
    return data;
  }
);
export const addScheduleAsynk = createAsyncThunk(
  "staffs/addScheduleAsynk",
  async (schedule) => {
    const { data } = await addSchedule(schedule);
    return data;
  }
);

export const StaffSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    setLoadingModal: (state, action) => {
      state.loadingModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaffAsynk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchStaffAsynk.fulfilled, (state, action) => {
        state.staffs = action.payload;
        state.loading = false;
      })
      .addCase(detailStaffAsynk.pending, (state) => {
        state.loadingModal = true;
      })
      .addCase(detailStaffAsynk.fulfilled, (state, action) => {
        state.loadingModal = false;
        state.staff = action.payload.data;
      })
      .addCase(addStaffAsynk.pending, (state) => {
        state.loadingModal = true;
      })
      .addCase(addStaffAsynk.fulfilled, (state, action) => {
        state.loadingModal = false;
        state.staff = action.payload;
      })
      .addCase(getDateAsynk.pending, (state) => {
        state.loadingModal = true;
      })
      .addCase(getDateAsynk.fulfilled, (state, action) => {
        state.loadingModal = false;
        state.staff = action.payload.data;
      })
      .addCase(editStaffAsynk.pending, (state) => {
        state.loadingModal = true;
      })
      .addCase(editStaffAsynk.fulfilled, (state, action) => {
        state.loadingModal = false;
        state.staff = action.payload.data;
      })
      .addCase(fetchScheduleAsynk.pending, (state, action) => {
        state.loadingModal = true;
      })
      .addCase(fetchScheduleAsynk.fulfilled, (state, action) => {
        state.loadingModal = false;
        state.schedule = action.payload;
      })
      .addCase(addScheduleAsynk.pending, (state, action) => {
        state.loadingModal = true;
      })
      .addCase(addScheduleAsynk.fulfilled, (state, action) => {
        state.loadingModal = false;
        state.schedule = action.payload;
      });
  },
});

export const { loading, setLoadingModal } = StaffSlice.actions;

export default StaffSlice.reducer;
