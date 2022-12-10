import { useDispatch, useSelector } from "react-redux";
import { GrCheckboxSelected } from 'react-icons/gr';
import { setHideSuggestedService, setIndexServiceSelected, setListServiceSelected } from "page/client/Orders/OrderSlice";
import { useEffect } from "react";
import { Button, Empty } from "antd";
import moment from "moment/moment";
import { formatMoney } from "utils/formatMoney";

const ListServicesSelected = () => {
    const { orders } = useSelector(data => data)
    const dispatch = useDispatch()
    const handleOrderServices = () => {
        dispatch(setHideSuggestedService(true))
    }

    return (
        <>
            {orders.listServiceSelected.length > 0 && orders.listServiceSelected.map((service, index) => {
                return (
                    <div>
                        {!orders.hideSuggestedService &&
                            <div key={index} onClick={() => handleOrderServices()} className="group  hover:bg-[#B4975A] bg-white p-3  border-solid border-b-[0.5px] border-[#f2f2f2] grid grid-cols-10 gap-6 ">
                                <div className="col-span-8">
                                    <p className="group-hover:text-white text-sm uppercase font-normal text-black m-0">{service.name} </p>
                                    <p className="group-hover:text-white text-sm mt-1 font-thin text-[14px] text-black m-0 text-justify line-clamp-2">{service.description} </p>
                                </div>
                                <div className="col-span-2 flex flex-col justify-start items-start  md:flex-row-reverse md:items-start">
                                    <GrCheckboxSelected className={`group-hover:bg-[#B4975A] mt-1 bg-white text-sm absolute`} />
                                    <div className="flex flex-col mt-5 ml-[-15px] md:mt-0 md:ml-0">
                                        <p className="group-hover:text-white font-thin m-0 md:mr-9  p-0"> {formatMoney(service.price)}</p>
                                        <p className="group-hover:text-white font-thin m-0 p-0"> {moment.duration(service.work_time).asMinutes()} phút </p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )
            })}
    
            {(orders.listServiceSelected.length === 0 && !orders.hideSuggestedService) &&
                <div className="my-6">
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 60,
                        }}
                        description={
                            <span className="text-[#2D2C2D]">
                                Bạn chưa chọn dịch vụ nào cả!
                            </span>
                        }
                    >
                        <Button onClick={() => dispatch(setHideSuggestedService(true))} type="primary" style={{ background: "#B4975A", border: "none", borderRadius: "0" }}>Chọn dịch vụ</Button>
                    </Empty>
                </div>
            }
        </>
    )
}

export default ListServicesSelected