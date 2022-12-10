import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";

const HistoryHairCut = () => {
  const { auth } = useSelector((data) => data);
  const navigate = useNavigate();
  const [datas, setDatas] = useState();

  const listAllService = async () => {
    let url = `https://api-booking-baber.up.railway.app/api/history`;
    const res = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${auth.customerAuth.token}`,
        },
      })
      .then((data) => {
        console.log(data.data.data);
        if (data?.status === 200) {
          setDatas(data?.data.data);
        } else {
          setDatas([]);
        }
      });
  };
  // List All History Haircut
  useEffect(() => {
    listAllService();
  }, []);
  console.log(datas);
  return (
    <div className="flex flex-col justify-center items-center px-4">
      <h1 className="py-12 font-bold">Hành trình tỏa sáng</h1>

      <Spin spinning={!datas}>
        <div>
          {datas?.map((item) => {
            return (
              <div
                className="p-8 w-full border shadow-lg shadow-indigo-500/40 border-black rounded-lg flex justify-start flex-col lg:w-[800px]"
                key={item.id}
              >
                {/*  Tên cơ sở & ngày giờ */}
                <div className="flex flex-col py-2">
                  <h3 className="">{item.store.name}</h3>
                  <div className="flex justify-between w-32 opacity-70">
                    {item.date}
                  </div>
                </div>
                <div className="flex flex-col items-center md:flex md:flex-row">
                  <div className="image__stylist">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/59/User-avatar.svg"
                      width="180px"
                    />
                  </div>
                  <div className="px-2 mt-4">
                    <p className="p-2 flex gap-5">
                      Stylist :{" "}
                      {item.booking_details.map((staff1) => (
                        <div>
                          {staff1.staff !== null ? (
                            <div>{staff1.staff.user.name}</div>
                          ) : (
                            ""
                          )}
                        </div>
                      ))}
                    </p>

                    <div className="flex">
                      <p className="p-2">Dịch vụ :</p>
                      <div className="flex flex-col">
                        {item?.booking_details.map((item2) => (
                          <p className="py-2 flex">{item2.service.name}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-8 flex justify-center">
                  {item.status_rate === 1 ? (
                    "Đánh giá hoàn tất"
                  ) : (
                    <button
                      className="border-none text-white cursor-pointer p-2 w-[50%] bg-[#8B9A46] rounded-lg ease-in duration-200"
                      onClick={() => navigate(`detail/${item.id}`)}
                    >
                      Đánh giá ngay
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Spin>
    </div>
  );
};

export default HistoryHairCut;
