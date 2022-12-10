import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "containers/LayoutAdmin";
import LayoutClient from "containers/LayoutClient";
import Categories from "page/admin/Categories/Categories";
import Dashboard from "page/admin/Dashboard";
import Store from "page/admin/Store/Store";
import HomePage from "page/client/Home/HomePage";
import Rating from "page/client/Rating";
import DetailRating from "page/client/Rating/DetailRating";
import Staff from "page/admin/Staff/Staff";
import ChooseStore from "page/client/Orders/Orders";
import OrderServices from "page/client/Orders/OrderService";
import Services from "page/admin/Services/Services";
import Nearest from "page/client/Nearest/Nearest";
import OrdersAdmin from "page/admin/Order/Orders";
import Statistic from "page/admin/Statistic/Statistic";
import Customer from "page/admin/customer/Customer";
import Banners from "page/admin/Partials/Banners";
import Socials from "page/admin/Partials/Socials";
import Booked from "page/client/Booked/Booked";
import LayoutStylist from "containers/LayoutStylist";
import Order from "page/stylist/Order";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutClient />}>
        <Route index element={<HomePage />} />
        <Route path="orders" element={<ChooseStore />} />
        <Route path="orders/service" element={<OrderServices />} />
        <Route path="history" element={<Rating />} />
        <Route path="history/detail/:id" element={<DetailRating />} />
        <Route path="map" element={<Nearest />} />
        <Route path="booked" element={<Booked />} />
      </Route>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<Dashboard />} />
        <Route path="store" element={<Store />} />
        <Route path="staff" element={<Staff />} />
        <Route path="customer" element={<Customer />} />
        <Route path="services" element={<Services />} />
        <Route path="categories" element={<Categories />} />
        <Route path="orders" element={<OrdersAdmin />} />
        <Route path="statistic" element={<Statistic />} />
        <Route path="banners" element={<Banners />} />
        <Route path="socials" element={<Socials />} />
      </Route>

      <Route path="/stylist" element={<LayoutStylist />}>
        <Route index element={<Order />} />
      </Route>
    </Routes>
  );
}

export default App;
