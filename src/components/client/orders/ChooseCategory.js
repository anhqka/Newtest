import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategorySelected } from "page/client/Orders/OrderSlice";

const ChooseCategory = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const categoryStatus = useSelector((data) => data);
  const { orders } = useSelector((data) => data);
  const dispatch = useDispatch();
  const handleActiveCategory = (index, id) => {
    setActiveCategory(index);
    dispatch(setCategorySelected(id))
  };

  return (
    <>
      {!orders.activedServices && (
        <div className=" col-span-2">
          {orders.hideSuggestedService && (
            <>
              <Spin spinning={categoryStatus.categories.loading}>
                {orders?.allInfoOrders?.categories?.length > 0 &&
                  orders.allInfoOrders.categories.map((category, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleActiveCategory(index, category.id)}
                        className={`${
                          activeCategory === index
                            ? "bg-[#B4975A] text-white"
                            : "bg-white text-black"
                        } p-3 border-solid border-b-[0.5px] border-[#f2f2f2] cursor-pointer`}
                      >
                        <p className="text-sm uppercase font-sans m-0">
                          {category.name}{" "}
                        </p>
                      </div>
                    );
                  })}
              </Spin>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChooseCategory;
