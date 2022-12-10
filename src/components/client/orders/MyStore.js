import { useState } from "react"
import { useSelector } from "react-redux"

const MyStore = () => {
    const { orders } = useSelector(data => data)
    const [hideStore, setHideStore] = useState(true)

    return (
        <div className="col-span-1 md:mr-[12px] ">
            <div className="flex flex-col justify-center bg-white p-3 space-y-3">
                <button onClick={() => setHideStore(!hideStore)} className= {`${hideStore && "md:hidden"} bg-black outline-none text-white border-none px-2 py-1 mt-1 `}>
                    {!hideStore ? <span>Hiển thị thông tin cửa hàng</span> : <span>Ẩn thông tin cửa hàng</span>} 
                </button>
                {
                    hideStore &&
                    <div className="my-3 flex flex-col ">
                        <div className="">
                            <img className="w-full" src={orders.allInfoOrders.data.image} alt="" />
                            <p className="text-xl font-normal mt-3 mb-1">Địa chỉ: </p>
                            <p className="text-sm font-normal m-0">{orders.allInfoOrders.data.address}</p>
                        </div>
                        <div>
                            <p className="text-xl font-normal mt-3 mb-1">Số điện thoại: </p>
                            <p className="text-sm font-normal m-0">{orders.allInfoOrders.data.phone}</p>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default MyStore