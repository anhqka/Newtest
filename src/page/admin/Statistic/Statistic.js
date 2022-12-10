import { Spin } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import MonthOrderCount from "components/admin/statistic/Orders/MonthOrderCount"
import MonthOrderTotal from "components/admin/statistic/Orders/MonthOrderTotal"
import OrderSucess from "components/admin/statistic/Orders/OrderSucess"
import OrderTotalSucces from "components/admin/statistic/Orders/OrderTotalSucces"
import { fetchStatisticOrdersAsync } from "./StatisticSlice"

const Statistic = () => {

    const dispatch = useDispatch()
    const statisticOrders = useSelector(data => data.statistic)
    const dataMonth = statisticOrders?.statisticOrders?.dataMonth
    let orderSucess = statisticOrders?.statisticOrders?.data?.countBookingSucces.map((month) => {
        return {
            Month: `Tháng: ${month.Month}`,
            countBooking: month.countBooking,
        }
    })

    let orderTotalSuccess = statisticOrders?.statisticOrders?.data?.sumBookingSucces.map((month) => {
        return {
            Month: `Tháng: ${month.Month}`,
            sumBooking: month.sumBooking,
        }
    })
    let orderCountMonth = [
        {
            status: "success",
            countBooking: dataMonth?.countBookingSucces
        },
        {
            status: "fail",
            countBooking: dataMonth?.countBookingUnSucces
        }
    ]
    let orderTotalMonth = [
        {
            status: "success",
            sumBooking: dataMonth?.sumBookingSucces,
        },
        {
            status: "fail",
            sumBooking: dataMonth?.sumBookingUnsucces
        }
    ]

    useEffect(() => {
        dispatch(fetchStatisticOrdersAsync())
    }, [])

    return (
        <>
            <Spin spinning={statisticOrders.loading} >
                <div>
                    <h3>Tổng hợp đơn hàng trong tháng</h3>
                    <div className="flex justify-between text-center">
                        <div className="space-b-3 w-[48%]">
                            <MonthOrderCount orderCount={orderCountMonth} />
                            <p>Tổng số đơn đặt</p>
                        </div>
                        <div className="space-b-3 w-[48%]">
                            <MonthOrderTotal orderTotal={orderTotalMonth} />
                            <p>Tổng tiền</p>
                        </div>
                    </div>

                    <h3>Đơn thành công trong năm</h3>
                    <div className="flex flex-col justify-between text-center">
                        <div className="space-y-3">
                            <OrderSucess statistic={orderSucess} />
                            <p>Tổng số đơn đặt</p>
                        </div>
                        <br/>
                        <hr/>
                        <div className="space-y-3 text-center">
                            <OrderTotalSucces statistic={orderTotalSuccess} />
                            <p>Tổng tiền </p>
                        </div>
                    </div>
                </div>
            </Spin>
        </>
    )
}

export default Statistic