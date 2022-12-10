import { Modal, Select } from "antd"
import { setOrdersPTTT } from "page/client/Orders/OrderSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChoosePayment = ({ auth }) => {
    const aut = auth?.customerAuth?.token?.length > 0
    const {orders} = useSelector(data => data)
    const dispatch = useDispatch()
    const handleChoosePayment = (value) => {
        dispatch(setOrdersPTTT(value))
    }
    console.log(orders);
    return (
        <div>
            <div className="flex flex-col justify-between space-y-3 mt-3">
                <h3 className="uppercase mb-0">Chọn phương thức thanh toán</h3>
                {aut ?
                    <Select
                        defaultValue="0"
                        value={orders?.orderPTTT ? orders?.orderPTTT  : "0"}
                        onChange={handleChoosePayment}
                        style={{
                            width: "100%",
                        }}
                        options={[
                            {
                                value: '0',
                                label: 'Thanh toán khi hoàn thành dịch vụ',
                            },
                            {
                                value: '1',
                                label: 'Thanh toán bằng số dư của anh',
                            },
                            {
                                value: '2',
                                label: 'Thanh toán bằng điểm đã có',
                            },
                            {
                                value: '3',
                                label: 'Thanh toán trực tuyến',
                            },
                        ]}
                    />
                    :
                    <Select
                        defaultValue="0"
                        value={orders?.orderPTTT ? orders?.orderPTTT  : "0"}
                        onChange={handleChoosePayment}
                        style={{
                            width: "100%",
                        }}
                        options={[
                            {
                                value: '0',
                                label: 'Thanh toán khi hoàn thành dịch vụ',
                            },
                            {
                                value: '3',
                                label: 'Thanh toán trực tuyến',
                            },
                        ]}
                    />
                }

            </div>
        </div>
    )
}

export default ChoosePayment