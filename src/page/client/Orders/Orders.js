import { Spin } from "antd";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { warning } from "utils/messageAnt";
import { fetchStoresAsynk } from "../../admin/Store/StoreSlice";
import { fetchAllInfoInOrders, setIndexServiceSelected, setListServiceSelected, setStoreOrder, setSylist } from "./OrderSlice";

const ChooseStore = () => {
    const dispatch = useDispatch();
    const { stores } = useSelector(data => data.stores);
    const { orders } = useSelector(data => data);
    const storeStatus = useSelector(data => data);
    const [dataStore, setDataStore] = useState([]);
    const navigate = useNavigate()
    console.log(orders);
    useEffect(() => {
        dispatch(fetchStoresAsynk())
    }, [])

    useEffect(() => {
        if (stores.status === 200) {
            setDataStore(stores.data.data.filter((item) => item.status != 0))
        } else {
            setDataStore([])
        }
    }, [stores])
    const handleOrders = (store) => {
        navigate(`/orders/service`)
        dispatch(fetchAllInfoInOrders("services/" + store.id))
        console.log(orders.allInfoOrders.data, store.id);

        if(orders.allInfoOrders.data){
    console.log(orders.allInfoOrders.data,"đasa");

            if(store.id === orders.allInfoOrders.data.id){
                console.log('old store');
            }else{
                dispatch(setIndexServiceSelected([]))
                dispatch(setListServiceSelected([]))
                dispatch(setSylist({}))
            }
        }
    }
    const handleAlert = () => { 
        warning("Chức năng đang trong thời gian phát triển. Xin cảm ơn!")
    }

    return (
        <div className="container">
            <div className="flex flex-col justify-center items-center">
                <p className="font-sans font-semibold text-[24px] text-center text-[#B4975A] md:text-[34px] my-3">Nhập địa chỉ</p></div>

            <div className="flex justify-center">
                <form className="relative mr-20 md:mr-12">
                    <input className="px-5 py-[8px] border-[0.5px] outline-0 md:w-[400px]" />
                    <button className="absolute top-0 inline-flex items-center justify-start px-6 py-2 overflow-hidden font-medium transition-all bg-white hover:bg-white group outline-none border-[#B4975A] border-[0.5px] border-l-0 rounded-none cursor-pointer">
                        <span className="w-48 h-48 rounded rotate-[-40deg] bg-black absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Tìm</span>
                    </button>
                </form>
            </div>
            <Spin spinning={!stores?.data?.data && storeStatus.stores.loading}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mt-9">
                    {dataStore.map((store, index) => {
                        return (
                            <div key={index}
                                className="flex flex-col bg-[#f5f5f5] drop-shadow hover:drop-shadow-lg  cursor-pointer">
                                <img
                                    src={store.image}
                                    className="md:h-[240px]"
                                />
                                <div className="px-3 py-2 relative">
                                    <p className="font-medium py-1 text-center p-0 m-0"> {store.name}</p>
                                    <p className="font-sans py-1 text-center line-clamp-3 md:min-h-[5.3em]"> {store.address}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-full flex flex-col">
                                        <a onClick={handleAlert} href="#_" className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white  hover:bg-white group">
                                            <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#2C2D2C] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                            <span className="text-center relative w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white" >Đăng kí thành viên</span>
                                        </a>
                                        <a onClick={() => handleOrders(store)} href="#_" className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white  hover:bg-white group">
                                            <span className=" w-48 h-48 rounded rotate-[-40deg] bg-[#B4975A] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                            <span className="relative w-full text-center text-black transition-colors duration-300 ease-in-out group-hover:text-white">Đặt lịch ngay</span>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        )
                    })}

                </div>
            </Spin>

        </div>
    )
}

export default ChooseStore