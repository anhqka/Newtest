import { Calendar, message, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Slider from "react-slick";
import './Orders.css'
import moment from "moment/moment";
import { createOrdersAsync, createPayOrderAsync, fetchTimesOrders, setLoadingCustomerInfo } from "page/client/Orders/OrderSlice";
import { DownOutlined, HourglassOutlined, UpOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import ChoosePayment from "./ChoosePayment";
import NewWindow from "react-new-window";
import { error, success } from "utils/messageAnt";
import { useNavigate } from "react-router-dom";

const ChooseTime = () => {
    const [apiVNPAY, setApiVNPAY] = useState('')
    const dispatch = useDispatch()
    const { auth } = useSelector(data => data)
    const { orders } = useSelector(data => data)
    const [activedTime, setActivedTime] = useState(0)
    const [selectedValue, setSelectedValue] = useState(() => moment());
    const [selectedTime, setSelectedTime] = useState("");
    const [openPay, setOpenPay] = useState(false)
    const [hideTime, setHideTime] = useState(false)
    const [hideDate, setHideDate] = useState(false)

    let totalTimeListSelected = '00:00:00'
    let totalPrice = 0

    orders.listServiceSelected.map((service, index) => {
        totalTimeListSelected = moment(totalTimeListSelected, "HH:mm").add(service.work_time, "minutes").format('HH:mm')
    })
    console.log(orders.listServiceSelected, "orders.listServiceSelected");
    if (orders.listServiceSelected.length > 1) {
        totalPrice = orders.listServiceSelected.reduce(
            (total, num) => Number(total) + Number(num.price),
            0
        )
    } else {
        totalPrice = orders.listServiceSelected[0].price
    }
    const onSelect = (newValue) => {
        setSelectedValue(newValue);
        setHideTime(false)
    };

    const settings = {
        className: "center",
        infinite: true,
        slidesToShow: 2,
        speed: 500,
        rows: 3,
        slidesPerRow: 2,
    };
    const handleActiveCategory = (index, time) => {
        setActivedTime(index)
        setSelectedTime(time)
        setHideDate(true)
    }
    const disabledDay = current => {
        return current && (current > moment().add(2, 'day') || current < moment().subtract(1, 'days'));
    }
    useEffect(() => {
        const formData = new FormData()
        if (selectedValue?.format('DD-MM-YYYY').length > 0) {
            formData.append("time", selectedValue.format('YYYY-MM-DD'))
            formData.append("store_id", orders.allInfoOrders.data.id)
            dispatch(fetchTimesOrders(formData))
        }

    }, [selectedValue])

    let data = []
    if (auth?.customerAuth?.token?.length > 0) {
        data = {
            store_id: orders.allInfoOrders.data.id,
            date: (`${selectedValue.format('YYYY-MM-DD')} ${moment(selectedTime, "HH:mm").format("HH:mm:ss")}`),
            total_time: (`${moment(totalTimeListSelected, "HH:mm").format("HH:mm:ss")}`),
            total: totalPrice,
            end_cut: `${selectedValue.format('YYYY-MM-DD')} ${selectedTime && moment(selectedTime, "HH:mm").add(totalTimeListSelected, "minutes").format('HH:mm:ss')}`,
            services: orders.listServiceSelected,
            payment: orders.orderPTTT,
            customerInfo: {
                name: auth.customerAuth.user.name,
                phone: auth.customerAuth.user.phone,
                email: auth.customerAuth.user.email,
            },
        }
    } else {
        data = {
            store_id: orders.allInfoOrders.data.id,
            date: (`${selectedValue.format('YYYY-MM-DD')} ${moment(selectedTime, "HH:mm").format("HH:mm:ss")}`),
            total_time: (`${moment(totalTimeListSelected, "HH:mm").format("HH:mm:ss")}`),
            total: totalPrice,
            end_cut: `${selectedValue.format('YYYY-MM-DD')} ${selectedTime && moment(selectedTime, "HH:mm").add(totalTimeListSelected, "minutes").format('HH:mm:ss')}`,
            services: orders.listServiceSelected,
            customerInfo: orders.customerInfo,
            payment: orders.orderPTTT,
        }
    }



    const countDown = (order) => {
        console.log(order);
        const formData = new FormData()
        formData.append("order_id", order.id)
        formData.append("amount", order.total)
        formData.append("email", order.user.email)

        dispatch(createPayOrderAsync(formData))
            .then((data) => {
                setApiVNPAY(data.payload.data)
            })
            .then(() => {
                modal.destroy();
                setOpenPay(true)
            })
            .catch(() => {
                modal.destroy();
            })

        let secondsToGo = 5;
        const modal = Modal.success({
            title: 'Th??ng b??o',
            content: `Ch??c qu?? kh??ch m???t ng??y t???t l??nh! Qu?? kh??ch s??? ???????c ??i???u h?????ng ?????n trang thanh to??n trong kho???ng ${secondsToGo} gi??y. Xin c???m ??n!`,
        });
        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `Ch??c qu?? kh??ch m???t ng??y t???t l??nh! Qu?? kh??ch s??? ???????c ??i???u h?????ng ?????n trang thanh to??n trong kho???ng ${secondsToGo} gi??y. Xin c???m ??n!`,
            });
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
        }, secondsToGo * 1000);
    };

    const isPopupBlocked = () => {
        var newWinDow = window.open(null, "")
        try {
            newWinDow.close()
            return false
        } catch (error) {
            return true
        }
    }
    const [popUpBlock, setPopUpBlock] = useState(false)
    const navigate = useNavigate()
    const handlePopUpBlock = (value) => {
        setPopUpBlock(false)
        if(value === "cancel"){
            window.open("https://support.google.com/chrome/answer/95472?hl=vi&co=GENIE.Platform%3DDesktop").focus()
        }
    }

    const handleOrders = () => {
        if (data.customerInfo.name && data.customerInfo.name.length > 0) {
            dispatch(createOrdersAsync(data))
                .then((data) => {
                    console.log(data);
                    if (data?.meta?.requestStatus === "fulfilled") {

                        if (orders.orderPTTT == "3") {
                            if (isPopupBlocked()) {
                                setPopUpBlock(true)
                            } else {
                                countDown(data?.payload?.booking)
                            }
                        } else {
                            success("?????t l???ch th??nh c??ng")
                            navigate("/booked")

                        }
                    } else {
                        error("?????t l???ch th???t b???i")
                    }

                })
        } else {
            dispatch(setLoadingCustomerInfo(true))
        }
    }

    return (
        <div className="m-3">
            <Modal
                title="C???nh b??o"
                open={popUpBlock}
                onOk={() => handlePopUpBlock("ok")}
                onCancel={() => handlePopUpBlock("cancel")}
                okText="?????ng ??"
                cancelText="Xem h?????ng d???n"
            >
                <p> Vui l??ng t???t pop-ups blocked ??? tr??nh duy???t c???a qu?? kh??ch ????? ch??ng t??i c?? th??? ????a qu?? kh??ch t???i trang thanh to??n. Xin c???m ??n!</p>
            </Modal>
            <div className="flex flex-col justify-between space-y-3">
                <h3 className="uppercase mb-0">Ch???n th???i gian</h3>
                <div className="">
                    <div onClick={() => setHideTime(!hideTime)} className={`cursor-pointer bg-white flex justify-between  items-center border-[0.2px] border-solid border-[#e0e0e0]`} >
                        <p className="m-0 py-1 pl-3"> Ng??y : {selectedValue?.format('DD-MM-YYYY')}</p>
                        <div className="py-1 pr-3 ">
                            {hideTime ? <DownOutlined /> : <UpOutlined />}
                        </div>
                    </div>

                    <div className={`${!hideTime && "hidden "}`}>
                        <Calendar format="YYYY-MM-DD"
                            disabledDate={disabledDay}
                            onSelect={onSelect}
                            fullscreen={false}
                            locale={{
                                lang: {
                                    locale: 'en',
                                    dayFormat: moment.updateLocale('en', {
                                        weekdaysMin: ['Ch??? Nh???t', 'Th??? Hai', 'Th??? Ba', `Th??? T??`, 'Th??? N??m', 'Th??? S??u', 'Th??? B???y',]
                                    })
                                }
                            }}

                        />
                    </div>

                </div>
                <Spin spinning={orders.loadingTime}>
                    <div className="md:block hidden">
                        <div onClick={() => setHideDate(!hideDate)} className="cursor-pointer bg-white flex justify-between  items-center border-[0.2px] border-solid border-[#e0e0e0]" >
                            <p className="m-0 py-1 pl-3"> B???t ?????u v??o l??c: {selectedTime && moment(selectedTime, "HH:mm").format("HH gi??? mm") + " ph??t"} </p>
                            <div className="py-1 pr-3 ">
                                {!hideDate ? <DownOutlined /> : <UpOutlined />}
                            </div>
                        </div>

                        <div className={`grid grid-cols-9 md:grid-cols-8 gap-1 cursor-pointer`}>
                            {(orders?.timesOrders?.length > 0 && !hideDate) && orders.timesOrders?.map((order, index) => {
                                return (
                                    <div key={index} onClick={() => handleActiveCategory(index, order.time)} className={`${activedTime === index && "bg-[#B4975A] text-white border-none"} px-6 py-3 border-solid border-white text-center hover:bg-[#B4975A] hover:text-white hover:border-none  text-center   "`}  >
                                        <span className=" ">{order.time}</span>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>

                    <div className={`block md:hidden`} >
                        <div onClick={() => setHideDate(!hideDate)} className="bg-white flex justify-between  items-center border-[0.2px] border-solid border-[#e0e0e0]" >
                            <p className="m-0 py-1 pl-3"> B???t ?????u v??o l??c: {selectedTime && moment(selectedTime, "HH:mm").format("HH gi??? mm") + " ph??t"}</p>

                            <div className="py-1 pr-3 ">
                                {!hideDate ? <DownOutlined /> : <UpOutlined />}
                            </div>
                        </div>

                        <div className=" mx-4">
                            <Slider {...settings}>
                                {(orders?.timesOrders?.length > 0 && !hideDate) && orders?.timesOrders?.map((order, index) => {
                                    return (
                                        <div key={index} onClick={() => handleActiveCategory(index, order.time)} className={`${activedTime === index && " bg-[#B4975A] text-white border-none"} cursor-pointer px-6 py-3 border-solid border-white text-center hover:bg-[#B4975A] hover:text-white hover:border-none `} >
                                            <span className=" ">{order.time}</span>
                                        </div>
                                    )
                                })
                                }
                            </Slider>
                        </div>

                    </div>
                </Spin>
                {selectedTime &&
                    <div>
                        <div className="bg-white flex justify-between  items-center border-[0.2px] border-solid border-[#e0e0e0]" >
                            <p className="m-0 py-1 pl-3">  K???t th??c v??o kho???ng: {selectedTime && moment(selectedTime, "HH:mm").add(totalTimeListSelected, "minutes").format('HH gi??? mm') + ' ph??t'}</p>
                            <div className="py-1 pr-3 ">
                                <HourglassOutlined />
                            </div>
                        </div>
                    </div>
                }
            </div>
            <ChoosePayment auth={auth} />

            {auth?.customerAuth?.token?.length > 0 &&
                <div className="">
                    <div className="flex justify-between items-center">
                        <h3 className="uppercase my-3">Th??ng tin c???a kh??ch h??ng</h3>
                        <></>
                    </div>
                    <div className="md:grid md:grid-cols-3">
                        <div className="bg-white flex justify-between  items-center border-[0.2px] border-solid border-[#e0e0e0] " >
                            <p className="m-0 py-1 pl-3">T??n qu?? kh??ch:  {auth?.customerAuth?.user?.name}</p>
                        </div>
                        <div className="bg-white border-[0.2px] border-solid border-[#e0e0e0] " >
                            <p className="m-0 py-1 pl-3">S??? ??i???n tho???i: {auth?.customerAuth?.user?.phone}</p>
                        </div>
                        <div className="bg-white border-[0.2px] border-solid border-[#e0e0e0]" >
                            <p className="m-0 py-1 pl-3">Email: {auth?.customerAuth?.user?.email}</p>
                        </div>
                    </div>
                </div>
            }

            {orders?.customerInfo?.name?.length > 0 && !auth?.customerAuth?.token?.length > 0 &&
                <div className="">
                    <div className="flex justify-between items-center">
                        <h3 className="uppercase my-3">Th??ng tin c???a kh??ch h??ng</h3>
                        <div className="pr-3 cursor-pointer" onClick={() => dispatch(setLoadingCustomerInfo(true))}>
                            <EditOutlined />
                        </div>
                    </div>

                    <div className="md:grid md:grid-cols-3">
                        <div className="bg-white flex justify-between  items-center border-[0.2px] border-solid border-[#e0e0e0] " >
                            <p className="m-0 py-1 pl-3">T??n qu?? kh??ch:  {orders.customerInfo.name}</p>
                        </div>
                        <div className="bg-white border-[0.2px] border-solid border-[#e0e0e0] " >
                            <p className="m-0 py-1 pl-3">S??? ??i???n tho???i: {orders.customerInfo.phone}</p>
                        </div>
                        <div className="bg-white border-[0.2px] border-solid border-[#e0e0e0]" >
                            <p className="m-0 py-1 pl-3">Email: {orders.customerInfo.email}</p>
                        </div>
                    </div>

                </div>
            }
            {selectedTime.length > 0 &&
                <div className="bg-white mt-3">
                    <button onClick={() => handleOrders()} class="w-full bg-transparent hover:bg-[#B4975A] text-[#B4975A]font-semibold hover:text-white py-2 px-4 border border-[#B4975A] hover:border-transparent ">
                        ?????t l???ch
                    </button>
                </div>

            }
            <div>
                {openPay && orders.orderPTTT == "3" && apiVNPAY.length > 0 && <NewWindow url={apiVNPAY} onOpen={() => setOpenPay(false)}>
                </NewWindow>}
            </div>

        </div>
    )
}

export default ChooseTime