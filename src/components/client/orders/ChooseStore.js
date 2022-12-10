import React, { useEffect, useState } from "react";
import { BiMap } from 'react-icons/bi';
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { fetchAllInfoInOrders, setIndexServiceSelected, setListServiceSelected, setModal, setSylist } from "page/client/Orders/OrderSlice";

const ChooseStore = () => {
    const dispatch = useDispatch()
    const [dataStores, setDataStores] = useState({})
    const { orders } = useSelector(data => data)
    const { stores } = useSelector(data => data)
    const [open, setOpen] = useState(false)
    const handleChangeStore = (store) => {
        dispatch(fetchAllInfoInOrders("services/"+store.id))
        dispatch(setIndexServiceSelected([]))
        dispatch(setListServiceSelected([]))
        dispatch(setSylist({}))
        setOpen(false)
    }
    useEffect(() => {
        setDataStores(stores?.stores?.data?.data?.filter((item) => item.status != "0"))
    }, [orders.allInfoOrders])

    return (
        <>
            <div className="m-3">
                <h3 className="uppercase">Cửa hàng</h3>
                <div className="bg-white flex p-[12px]  justify-between">
                    <p className="text-sm font-normal uppercase m-0 p-0">  {orders.allInfoOrders.data.name} </p>
                    <p className="text-sm font-normal m-0 p-0 cursor-pointer" onClick={() => setOpen(true)}><BiMap className="text-[#B4975A]" /> Thay đổi </p>
                </div>
            </div>
            <Modal
                title="Chuyển cửa hàng"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={false}
                width={1000}
            >
                <div className="flex flex-col">
                    <div className="mb-3 pb-3">
                        <form className="relative  md:mr-12 w-[90.5%]">
                            <input className="px-5 py-[8px] border-[0.5px] outline-0 w-[70%] md:w-full" />
                            <button className="absolute top-0 inline-flex items-center justify-start px-8 py-2 overflow-hidden font-medium transition-all bg-white hover:bg-white group outline-none border-[#B4975A] border-[0.5px] border-l-0 rounded-none cursor-pointer">
                                <span className="w-48 h-48 rounded rotate-[-40deg] bg-black absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Tìm</span>
                            </button>
                        </form>
                    </div>
                    {dataStores?.length > 0 && dataStores.map((store, index) => {
                        return (
                            <div key={index} onClick={() => { handleChangeStore(store) }}
                                className="flex justify-between hover:bg-[#f2f2f2] border-solid border-[#f2f2f2] cursor-pointer">
                                <div className="flex flex-col space-y-3  px-9">
                                    <p className="font-normal text-xl uppercase flex m-0 pt-3">{store.name}</p>
                                    <p className="font-normal ml-9 m-0"> Địa chỉ: </p>
                                    <p className="font-light ml-12 mb-0 pb-3"> {store.address}</p>
                                </div>
                                <div className="px-8 hidden md:flex md:items-center">
                                    <img className="w-[130px] h-[100px]" src={store.image} />
                                </div>
                            </div>
                        )
                    })}

                </div>
            </Modal>
        </>
    )

}

export default ChooseStore