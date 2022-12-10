import axios from "axios";
import instance from "./instance";

const getStylistsInOrder = (entpoint) => {
  const api = "bookings/" + entpoint;
  return instance.get(api);
};

const getAllInfoInOrders = (entpoint) => {
  const api = "bookings/" + entpoint;
  return instance.get(api);
};

const getTimesOrders = (data) => {
  const api = "bookings/times";
  return instance.post(api, data);
};
const createOrders = (order) => {
  const api = "bookings/store";
  return instance.post(api, order);
};
const getPurchaseOrder = () => {
  const api = "bookings/get-booking-all";
  return instance.get(api);
};
const getPurchaseOrdersOfStylist = () => {
  const api = "staffs/staff-calendrier";
  return instance.get(api);
};

const getRegisteredOrdersOfStylist = () => {
  const api = "staff-times";
  return instance.get(api);
};

const updateStatusPurchaseOrder = (data) => {
  const api = `bookings/booking-update-status/${data.orderId}?status=${data.status}`;
  return instance.post(api);
};
const getEmptyStaffPurchaseOrder = (id) => {
  const api = "bookings/add-staff-bookingDetail/" + id;
  return instance.get(api);
};
const updateEmptyStaffPurchaseOrder = (data) => {
  const api = "bookings/store-staff-bookingDetail/" + data.get("id");
  return instance.post(api,data);
};

const createPayOrder = (data) => {
  return axios.post("/vnpay", data
    , {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
};

export { getRegisteredOrdersOfStylist, getPurchaseOrdersOfStylist, updateEmptyStaffPurchaseOrder, createPayOrder, getStylistsInOrder, getAllInfoInOrders, getTimesOrders, createOrders, getPurchaseOrder, updateStatusPurchaseOrder, getEmptyStaffPurchaseOrder };
