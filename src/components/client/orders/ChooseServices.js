import { useDispatch, useSelector } from "react-redux";
import { GrCheckboxSelected } from "react-icons/gr";
import { GrCheckbox } from "react-icons/gr";
import { useEffect, useState } from "react";
import {
  setHideSuggestedService,
  setIndexServiceSelected,
  setListServiceSelected,
} from "page/client/Orders/OrderSlice";
import { Empty } from "antd";
import moment from "moment/moment";
import { formatMoney } from "utils/formatMoney";

const ChooseServices = () => {
  const { orders } = useSelector((data) => data);
  const dispatch = useDispatch();
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const data = orders?.allInfoOrders?.data.services.filter(
      (service) => service.category_id === orders.categorySelected
    );
    setServicesData(data);
  }, [orders]);

  const handlelistServiceSelected = (service) => {
    let services = [...orders.listServiceSelected, service];
    let indexServices = [...orders.indexServiceSelected, service.id];
    if (orders.indexServiceSelected.includes(service.id)) {
      indexServices = orders.indexServiceSelected.filter(
        (item) => item != service.id
      );
      services = orders.listServiceSelected.filter(
        (item) => item.id !== service.id
      );
    } else {
      handleActiveService();
    }
    dispatch(setIndexServiceSelected(indexServices));
    dispatch(setListServiceSelected(services));
  };

  const handleActiveService = () => {
    dispatch(setHideSuggestedService(false));
  };

  return (
    <div className="col-span-5 cursor-pointer mt-3 md:mt-0">
      {orders.hideSuggestedService && (
        <>
          {servicesData.length > 0 ? (
            servicesData.map((service, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handlelistServiceSelected(service)}
                  className="group  hover:bg-[#B4975A] bg-white p-3 border-solid border-b-[0.5px] border-[#f2f2f2] grid grid-cols-10 gap-6 "
                >
                  <div className="col-span-8">
                    <p className="group-hover:text-white text-sm uppercase font-normal text-black m-0">
                      {service.name}{" "}
                    </p>
                    <p className="group-hover:text-white mt-1 font-thin text-sm text-black m-0 text-justify line-clamp-2">
                      {service.description}{" "}
                    </p>
                  </div>
                  <div className="col-span-2 flex flex-col justify-start items-start  md:flex-row-reverse md:items-start">
                    {orders.listServiceSelected.map((serviceSelected) => {
                      if (service.id === serviceSelected.id) {
                        return (
                          <GrCheckboxSelected
                            className={`group-hover:bg-[#B4975A] bg-white text-sm absolute`}
                          />
                        );
                      } else {
                        return <GrCheckbox className="text-sm absolute " />;
                      }
                    })}
                    <GrCheckbox className="text-sm absolute " />

                    <div className="flex flex-col mt-5 ml-[-15px] md:mt-0 md:ml-0">
                      <p className="group-hover:text-white font-thin m-0 md:mr-9  p-0">
                        {" "}
                        {formatMoney(service.price)}{" "}
                      </p>
                      <p className="group-hover:text-white font-thin m-0 md:mr-9 p-0">
                        {" "}
                        {moment
                          .duration(service.work_time)
                          .asMinutes()} phút{" "}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <Empty
                description="Rất tiếc hiện tại store chưa có dịch vụ này. Mời quý khách chọn dịch vụ khác, xin cảm ơn!"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChooseServices;