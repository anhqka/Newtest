import { Image, Spin, Tabs } from 'antd';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchServicesByCategoryAsync } from 'page/client/Home/HomePageSlice';
import { setListServiceSelected } from 'page/client/Orders/OrderSlice';
import { formatMoney } from 'utils/formatMoney';

const Services = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const { homepage } = useSelector((data) => data);
    const handleOrders = () => {
        navigation("/orders")
    }
    const [loadMore, setLoadMore] = useState(4)

    const servicesLength = homepage?.services?.data.length

    return (
        <div className="flex flex-col bg-white">
            <Tabs type="card" onChange={(id) => {
                dispatch(fetchServicesByCategoryAsync(id))
                setLoadMore(4)
            }}>
                {homepage?.categories?.data && homepage?.categories?.data?.data?.map((category, index) => {
                    return (
                        <Tabs.TabPane tab={category.name} key={category.id}>
                            <Spin spinning={homepage.loading}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 relative">
                                    {homepage?.services?.data.slice(0, loadMore).map((service, index) => {
                                        return (

                                            <div key={index}
                                                className="flex flex-col bg-white drop-shadow hover:drop-shadow-lg hover:opacity-70">
                                                <Image
                                                    src="https://phongbvb.com/upload/anh-menu-chinh/1.jpg?v=1.0.2"
                                                // {service.image}
                                                />
                                                <div className="flex flex-col justify-around items-center">
                                                    <div className='flex md:px-3'>
                                                        <p className="font-medium py-2 md:py-3 m-0 md:min-h-[5em]">{service.name}</p>
                                                    </div>
                                                    <div className='md:absolute top-0 left-0 md:bg-[#B4975A]'>
                                                        <p className="font-medium md:p-1 mb-2 md:m-0">{formatMoney(service.price)}</p>
                                                    </div>
                                                    <button className='font-sans bg-[#B4975A] w-full text-white border-none hover:text-gray-300 px-5 py-1 cursor-pointer' onClick={() => handleOrders()}>Đặt lịch ngay</button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className='text-center mt-6 cursor-pointer' onClick={() => setLoadMore(loadMore + 4)}>
                                    <span className='text-[16px] text-[#B4975A]'> {loadMore >= servicesLength ? "" : "Nhiều hơn nữa"}</span>
                                </div>
                            </Spin>
                        </Tabs.TabPane>
                    )
                })}
            </Tabs>
        </div>

    )
}

export default Services