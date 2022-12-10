
import React, { useEffect, useState } from "react";
import TrendingServices from "components/client/homepage/TrendingServices";
import Services from "components/client/homepage/Serviecs";
import Banner from "components/client/homepage/Banner";
import Pledge from "components/client/homepage/Pledge";
import { useDispatch, useSelector } from "react-redux";
import { fetchBannersAsync, fetchCategoriesAsync, fetchServicesByCategoryAsync } from "./HomePageSlice";
import { Spin } from "antd";

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

const HomePage = () => {

  const [activeCategory, setActiveCategory] = useState(0);
  const categoryStatus = useSelector((data) => data);
  const { homepage } = useSelector((data) => data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBannersAsync())
  }, [])
  
  const banners = homepage?.banners?.data?.data

  useEffect(() => {
    dispatch(fetchCategoriesAsync())
      .then((data) => {
        if (data.meta.requestStatus = "fulfilled") {
          if(!homepage?.categories?.data){
            dispatch(fetchServicesByCategoryAsync(data?.payload?.data?.data[0]?.id))
          }
        }
      })
  }, [])

  return (
    <div className='w-full '>
      {banners && <Banner banners={banners}/>}
      <TrendingServices />
      <div className="container">
        <h1 className="text-black uppercase text-xxl my-6 font-oswald  text-left">Các dịch vụ</h1>
        {<Spin spinning={!homepage?.categories?.data && !homepage?.services?.data && homepage.loadingHome}>
          {homepage?.categories?.data && homepage?.services?.data && <Services />}
        </Spin>}
      </div>
      <Pledge />

    </div>
  )
}
export default HomePage