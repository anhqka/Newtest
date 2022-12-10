import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import "./Orders.css"
import ChooseStore from "components/client/orders/ChooseStore";
import { Spin } from "antd";
import MyStore from "components/client/orders/MyStore";
import ChooseTime from "components/client/orders/ChooseTime";
import ChooseCategory from "components/client/orders/ChooseCategory";
import Auth from "components/client/orders/Auth";
import ChooseServices from "components/client/orders/ChooseServices";
import ListServicesSelected from "components/client/orders/ListServicesSelected";
import { setHideSuggestedService } from "./OrderSlice";
import CustomerInfo from "components/client/orders/CustomerInfo";

const OrderService = () => {
    const { orders } = useSelector(data => data)
    const dispatch = useDispatch()
    const handleOrderServices = (bool) => {
        dispatch(setHideSuggestedService(bool))
    }
    const { auth } = useSelector(data => data)

    return (
        <div className="container bg-[#f2f2f2] rounded-sm flex flex-col-reverse p-4 md:grid md:grid-cols-4 md:gap-5">
            <div className="md:col-span-3 ">
                {!auth?.customerAuth?.token?.length  > 0 && <Auth />}
                <Spin spinning={orders.loadingAll}>
                    <>
                        {orders?.allInfoOrders?.data && <ChooseStore />}
                        <div className="m-3">
                            <div className="flex flex-row justify-between mb-3">
                                <h3 className="uppercase mb-0">Chọn dịch vụ</h3>
                                <a onClick={() => handleOrderServices(!orders.hideSuggestedService)} className="text-[13px] mb-0 text-[#B4975A] hover:text-black" >{orders.hideSuggestedService && "Xem dịch vụ đã chọn"}</a>
                            </div>
                            <div className="md:grid md:grid-cols-7">
                                <ChooseCategory />
                                {orders?.allInfoOrders?.data && <ChooseServices />}
                                <div className="col-span-7 cursor-pointer">
                                    <ListServicesSelected />
                                </div>
                            </div>
                        </div>
                        {orders?.listServiceSelected.length > 0 && <ChooseTime />}
                    </>
                </Spin>
            </div>
            <Spin spinning={orders.loadingAll}>
                {orders?.allInfoOrders?.data && <MyStore /> }
            </Spin>
            <CustomerInfo orders={orders} auth={auth} />
            
        </div>
    )
}

export default OrderService