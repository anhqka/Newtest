import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import CategoriesReducer from "../page/admin/Categories/CategoriesSlice";
import StoreReducer from "../page/admin/Store/StoreSlice";
import OrderReducer from "../page/client/Orders/OrderSlice";
import ServiceReducer from "../page/admin/Services/ServiceSlice";
import StaffReducer from "../page/admin/Staff/StaffSlice";
import HomePageReducer from "../page/client/Home/HomePageSlice";
import StatisticReducer from "../page/admin/Statistic/StatisticSlice";
import OrderAdminReducer from "../page/admin/Order/OrderAdminSlice";
import AuthReducer from "../page/client/Auth/AuthSlice";
import CustomerReducer from "../page/admin/customer/CustomerSlice";
import HistoryReducer from "../page/client/Rating/RatingSlice";
import PartialsReducer from "../page/admin/Partials/PartialsSlice";
const persistConfig = {
  key: "storeOrder",
  storage,
};

const reducers = combineReducers({
  categories: CategoriesReducer,
  stores: StoreReducer,
  orders: OrderReducer,
  ordersAdmin: OrderAdminReducer,
  services: ServiceReducer,
  staffs: StaffReducer,
  homepage: HomePageReducer,
  statistic: StatisticReducer,
  auth: AuthReducer,
  customers: CustomerReducer,
  history: HistoryReducer,
  partials: PartialsReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});
