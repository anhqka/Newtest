import { AiOutlineDown, AiOutlineHome } from "react-icons/ai"
import moment from "moment/moment";

export const OrderMe = ({data, handleActiveMenu, activedMenu}) => {

    return (
        <div>
            <div className="bg-[#f2f2f2] p-3">
                {data?.map((order, index) => {
                    return (
                        <div className="bg-white divide-y divide-yellow-200 mb-3" onClick={() => handleActiveMenu(index)} key={index}>
                            <div class='grid grid-cols-10 justify-between items-center p-[8px] mx-[8px' >
                                <div className="col-span-2">
                                    <div className="border-solid border-[1px]  border-orange-500">
                                        {/* <p className="mb-0  text-center font-serif">{order?.timeWorks[0]?.start_time ? moment(order?.timeWorks[0]?.start_time, "HH-mm-ss" ).format("HH:mm") : <></>}</p> */}
                                        <p className="mb-0 text-center font-serif">{moment(order?.time, "YYYY-MM-DD").format("DD-MM")}</p>
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
                                        <p className="whitespace-nowrap font-semibold mb-0">Dịch vụ:</p>
                                        <div className="flex flex-col">
                                            {order?.timeWorks?.map((service, index) => {
                                                return (
                                                    <div>
                                                        Lịch thứ {index + 1}

                                                        <div className="bg-orange-400 p-3 my-3">
                                                            <p className="mb-0 text-white" key={index}>Tên khách hàng: <span className="font-bold">{service?.nameUser}</span> </p>
                                                            <span className="mb-0 text-white" key={index}>{service?.start_time} - </span>
                                                            <span className="mb-0 text-white" key={index}>{service?.end_time}</span>
                                                            <p className="mb-0 text-white" key={index}>{service?.nameService}</p>
                                                        </div>

                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div></>
                            }
                        </div>
                    )
                })}
            </div>
        </div>
    )
}