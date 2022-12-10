import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { clearOTP, finishRegister, forgotPassword, getCustomers, getOtpForgotPassword, register, signIn } from 'api/customer';

const initialState = {
    loading: false,
    loadingSignUp: false,
    loadingForgot: false,
    openModal: false,
    openModalSignIn: false,
    customers: [],
    customer: {},
    customerAuth: [],
    openRecharge: false,
    openInfoChange: false,
    openPasswordChange: false,

}
export const fetchCustomersAsyc = createAsyncThunk(
    "auth/fetchCustomersAsyc",
    async () => {
        const { data } = await getCustomers()
        return data
    }
);
export const signInAsyc = createAsyncThunk(
    "auth/signInAsyc",
    async (user) => {
        const { data } = await signIn(user)
        return data
    }
);
export const registerAsyc = createAsyncThunk(
    "auth/registerAsyc",
    async (user) => {
        const { data } = await register(user)
        return data
    }
);
export const finishRegisterAsyc = createAsyncThunk(
    "auth/finishRegisterAsyc",
    async (user) => {
        const { data } = await finishRegister(user)
        return data
    }
);

export const clearOTPAsyc = createAsyncThunk(
    "auth/clearOTPAsyc",
    async (id) => {
        await clearOTP(id)
    }
);
export const fetchOtpForgotPassWorkAsync = createAsyncThunk(
    "auth/fetchOtpForgotPassWorkAsync",
    async (email) => {
        await getOtpForgotPassword(email)
    }
)
export const fetchForgotPassWorkAsync = createAsyncThunk(
    "auth/fetchForgotPassWorkAsync",
    async (data) => {
        await forgotPassword(data)
    }
)


export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loadingSignUp = action.payload
        },
        setOpenModal: (state, action) => {
            state.openModal = action.payload
            state.loadingSignUp = false
        },
        setOpenModalSignIn: (state, action) => {
            state.openModalSignIn = action.payload
            state.loadingSignUp = false
        },
        setOpenRecharge: (state, action) => {
            state.openRecharge = action.payload
        },
        setOpenInfoChange: (state, action) => {
            state.openInfoChange = action.payload
        },
        setOpenPasswordChange: (state, action) => {
            state.openPasswordChange = action.payload
        },
        logOutCustomer: (state) => {
            state.customerAuth = []
        }

    },
    extraReducers: builder => {
        builder
            .addCase(fetchCustomersAsyc.fulfilled, (state, action) => {
                state.customers = action.payload;
            })
            .addCase(registerAsyc.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(registerAsyc.fulfilled, (state, action) => {
                state.loading = false;
                state.customer = action.payload.user
            })
            .addCase(registerAsyc.rejected, (state) => {
                state.loading = false;
            })
            .addCase(finishRegisterAsyc.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(finishRegisterAsyc.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(finishRegisterAsyc.rejected, (state) => {
                state.loading = false;
            })
            .addCase(signInAsyc.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(signInAsyc.fulfilled, (state, action) => {
                state.customerAuth = action.payload;
                state.loading = false;
            })
            .addCase(signInAsyc.rejected, (state) => {
                state.loading = false;
            })
            .addCase(fetchOtpForgotPassWorkAsync.pending, (state) => {
                state.loadingForgot = true;
            })
            .addCase(fetchOtpForgotPassWorkAsync.fulfilled, (state) => {
                state.loadingForgot = false;
            })
            .addCase(fetchOtpForgotPassWorkAsync.rejected, (state) => {
                state.loadingForgot = false;
            })
            .addCase(fetchForgotPassWorkAsync.pending, (state) => {
                state.loadingForgot = true;
            })
            .addCase(fetchForgotPassWorkAsync.fulfilled, (state) => {
                state.loadingForgot = false;
            })
            .addCase(fetchForgotPassWorkAsync.rejected, (state) => {
                state.loadingForgot = false;
            })
    }
})

export const { setLoading, setOpenModal, setOpenModalSignIn, logOutCustomer, setOpenRecharge, setOpenInfoChange, setOpenPasswordChange } = AuthSlice.actions

export default AuthSlice.reducer