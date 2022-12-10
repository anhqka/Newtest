import { useState } from "react"
import { useSelector } from "react-redux"
import { AiOutlineDown } from "react-icons/ai"
import moment from "moment/moment";


export const RegisteredOrders = () => {

    const [activedMenu, setActivedMenu] = useState([])
    const handleActiveMenu = (index) => {
        const checkActive = activedMenu && activedMenu.includes(index)
        !checkActive ? setActivedMenu([...activedMenu, index]) : setActivedMenu(activedMenu.filter(item => item != index))
    }
    const data = useSelector(data => data?.ordersAdmin)


    const formatData = data?.registeredOrders
    console.log(formatData);

    var objectMerge = function(){
        var out = {};
        if(!formatData.length)
            return out;
        for(var i=0; i<formatData.length; i++) {
            for(var key in formatData[i]){
                out[key] = formatData[i][key];
            }
        }
        return out;

    }
    
    console.log(objectMerge({a:1, b:2}, {a:2, c:4}));
    return (
        <div className="bg-[#f2f2f2] p-3">
            {data?.registeredOrders.map((order, index) => {
                return (
                    <div className="bg-white divide-y divide-yellow-200 mb-3" >
                        <div className="bg-white divide-y divide-yellow-200 mb-3" onClick={() => handleActiveMenu(index)} key={index}>
                            <div class='grid grid-cols-10 justify-between items-center p-[8px] mx-[8px' >
                                <div className="col-span-2">
                                    <div className="border-solid border-[1px]  border-orange-500">
                                        {/* <p className="mb-0  text-center font-serif">{order?.timeWorks[0]?.start_time ? moment(order?.timeWorks[0]?.start_time, "HH-mm-ss" ).format("HH:mm") : <></>}</p> */}
                                        <p className="mb-0 text-center font-serif">{order.day === 0 ? "Chủ Nhật" : order.day === 1 ? "Thứ Hai" : order.day === 2 ? "Thứ Ba" : order.day === 3 ? "Thứ Tư" : order.day === 4 ? "Thứ Năm" : order.day === 5 ? "Thứ Sáu" : "Thứ Bảy"}</p>
                                    </div>
                                </div>

                                <div className="ml-[16px] col-span-7">
                                    {/* <p className="mb-0 font-serif"><BsPeople /> <span className="ml-1">Tên khách hàng</span></p> */}
                                </div>
                                <div className="col-span-1 text-right">
                                    <AiOutlineDown className={!activedMenu.includes(index) && "rotate-180"} />
                                </div>
                            </div>
                            {activedMenu.includes(index) &&
                                <>
                                    <hr className="mx-4 " />
                                    <div class='flex flex-col justify-start mx-4'>
                                        <div className="flex flex-col">
                                            <div>
                                                <div className="bg-orange-400 p-3 my-3" key={index}>
                                                    <span className="mb-0 text-white" >{order?.start_time} - </span>
                                                    <span className="mb-0 text-white" >{order?.end_time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div></>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}