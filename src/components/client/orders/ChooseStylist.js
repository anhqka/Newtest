import { useState, useEffect } from "react";
import { GrCheckboxSelected, GrCheckbox } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { fetchStylistInOrderAsynk } from "page/client/Orders/OrderSlice";
import { setSylist } from "page/client/Orders/OrderSlice";
import { Spin } from "antd";

const ChooseStylist = () => {
  const [activeStylist, setActiveStylist] = useState({});
  const [indexSuggestedService, setIndexSuggestedService] = useState([]);
  const { orders } = useSelector((data) => data);
  const [hideStylist, setHideStylist] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchStylistInOrderAsynk("get-staff-time/" + orders.allInfoOrders.data.id)
    );
  }, [orders.allInfoOrders]);
  const handleSetStylist = (stylist) => {
    dispatch(setSylist(stylist));
    setHideStylist(!hideStylist);
  };

  return (
    <div className="m-3">
      <div className="flex flex-row justify-between">
        <h3 className="uppercase">Chọn stylist</h3>
      </div>

      <Spin spinning={orders.loading}>
        <>
          <div className="bg-white cursor-pointer">
            {hideStylist && (
              <div
                onClick={() =>
                  handleSetStylist({ id: 0, name: "Cửa hàng chọn" })
                }
                className="md:col-span-2 border border-t-[0.2px] border-t-[#e0e0e0] md:border-[#e0e0e0] group p-3 border-solid border-b-[0.5px] border-[#f2f2f2] flex flex-row justify-between items-start gap-6 "
              >
                <div className="">
                  <p className="text-[16px] m-0"> Cửa hàng chọn</p>
                </div>
                <div className="flex flex-row justify-start items-start space-x-3">
                  {orders.stylist.id == 0 ? (
                    <GrCheckboxSelected className={` text-[#B4975A] `} />
                  ) : (
                    <GrCheckbox className={``} />
                  )}
                </div>
              </div>
            )}
            {hideStylist && (
              <div className="md:grid md:grid-cols-4">
                {orders?.listStylist?.staffs &&
                  orders.listStylist.staffs.map((stylist, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleSetStylist(stylist.user)}
                        className="md:col-span-2 border border-t-[0.2px] border-t-[#e0e0e0] md:border-[#e0e0e0] group p-3 border-solid border-b-[0.5px] border-[#f2f2f2] flex flex-row justify-between items-start gap-6 "
                      >
                        <div className="">
                          <p className="text-[16px] m-0">{stylist.user.name}</p>
                        </div>
                        <div className="flex flex-row justify-start items-start  space-x-3">
                          {stylist.user_id == orders.stylist.id ? (
                            <GrCheckboxSelected
                              className={` text-[#B4975A] `}
                            />
                          ) : (
                            <GrCheckbox className={``} />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {/* Object.keys(orders.stylist).length !== 0 */}
            {!hideStylist && (
              <div
                onClick={() => setHideStylist(!hideStylist)}
                className="md:col-span-2 border border-t-[0.2px] border-t-[#e0e0e0] md:border-[#e0e0e0] group p-3 border-solid border-b-[0.5px] border-[#f2f2f2] flex flex-row justify-between items-start gap-6  cursor-pointer"
              >
                <div className="">
                  <p className="text-[16px] m-0">{orders.stylist.name}</p>
                </div>
                <div className="flex flex-row justify-start items-start space-x-3">
                  <GrCheckboxSelected className={` text-[#B4975A] `} />
                </div>
              </div>
            )}
          </div>
        </>
      </Spin>
    </div>
  );
};

export default ChooseStylist;
