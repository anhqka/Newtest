import axios from "axios";
import instance from "./instance";

const apiAuth = "https://api-booking-baber.up.railway.app/api/"

const getCustomers = () => {
    const api = "users";
    return instance.get(api);
};
const register = user => {
    const api = apiAuth+"register";
    return axios.post(api, user);
}
const clearOTP = id => {
    const api = apiAuth+"email/logout_OTP?user_id="+id;
    return axios.post(api);
}
const finishRegister = user => {
    const api = apiAuth+"email/verify_OTP";
    return axios.post(api, user);
}
const signIn = user => {
    const api = apiAuth+"postlogin";
    return axios.post(api, user);
}
const getOtpForgotPassword = (email) => {
    const api = apiAuth + "reset-password";
    console.log(api);
    return axios.post(api, email);
}
const forgotPassword = (data) => {
    const api = apiAuth + "save_password";
    return axios.post(api, data);
}



export { getCustomers, register, clearOTP, finishRegister, signIn, getOtpForgotPassword, forgotPassword};