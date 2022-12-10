import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';

const serviceSuggested = [
    { id: 1, time: "30", name: "Lông mày", price: "100k", },
    { id: 2, time: "30", name: "Vuốt sáp", price: "100k", },
    { id: 3, time: "30", name: "Láy ráy tay", price: "100k", },
    { id: 3, time: "30", name: "Matxa", price: "100k", },
]

const ChooseSuggestedServices = () => {
    const dispatch = useDispatch()

    const [suggestedService, setSuggestedService] = useState([])
    const [indexSuggestedService, setIndexSuggestedService] = useState([])
    const [hideServices, setHideServices] = useState(false)

    const handleSuggestedService = ({ service, index }) => {
        let suggestedServices = [...suggestedService, service]
        let indexSuggested = [...indexSuggestedService, index]

        if (indexSuggestedService.includes(index)) {
            indexSuggested = indexSuggestedService.filter(item => item != index)
            suggestedServices = suggestedService.filter(item => item.id !== service.id)
        }
        setIndexSuggestedService(indexSuggested)
        setSuggestedService(suggestedServices)
      
    }
    const handleHideService = () => {
        dispatch(setHideServices(!hideServices))
    }

    const { orders } = useSelector(data => data)

    return (
        <>
            {(!orders.hideSuggestedService && orders?.listServiceSelected?.length > 0)  &&
                <div className="">
                    {(!hideServices) &&
                        <>
                            <p className="px-3 pt-3 text-[14px] ">Đề xuất dịch vụ đi kèm </p>
                            <div className="md:grid md:grid-cols-4 bg-white ">
                                {serviceSuggested.map((service, index) => {
                                    return (
                                        <div key={index} onClick={() => handleSuggestedService({ service, index })} className="md:col-span-2 border border-t-[0.2px] border-t-[#e0e0e0] md:border-t-[#e0e0e0] md:border-x-[#e0e0e0] group p-3 border-solid border-b-[0.5px] border-[#f2f2f2] flex flex-row justify-between items-start gap-6 ">
                                            <div className="">
                                                <p className="text-[16px] m-0">{service.name}</p>
                                            </div>
                                            <div className="flex flex-row justify-start items-start  space-x-3">
                                                <div className="flex flex-col items-start">
                                                    <p className="font-thin m-0"> {service.price} </p>
                                                    <p className="font-thin m-0"> {service.time} phút </p>
                                                </div>
                                                <GrCheckbox className={`group-hover:bg-[#B4975A] ${indexSuggestedService.includes(index) && "bg-[#B4975A] hidden"}`} />
                                                <GrCheckboxSelected className={`${!indexSuggestedService.includes(index) && "bg-[#B4975A] hidden"}`} />
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </>
                    }

                    <div className="bg-white flex justify-center border-[0.2px] border-solid border-[#e0e0e0]" onClick={() => handleHideService()}>
                        <p className="m-0 py-1">{!hideServices ? "Ẩn đi" : "Hiện đề xuất dịch vụ đi kèm"}</p>
                    </div>
                </div>
            }
        </>

    )
}

export default ChooseSuggestedServices