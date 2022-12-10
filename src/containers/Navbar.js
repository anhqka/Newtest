import { CloseOutlined, MenuOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setModal } from "page/client/Orders/OrderSlice";
import Slider from "react-slick";
import {
  logOutCustomer,
  setOpenInfoChange,
  setOpenModal,
  setOpenModalSignIn,
  setOpenPasswordChange,
  setOpenRecharge,
} from "page/client/Auth/AuthSlice";
import { Avatar, Badge } from "antd";
import "./containers.css";

const navItems = [
  { id: 1, name: "Trang Chủ", link: "/" },
  { id: 2, name: "Về Barber", link: "/barber" },
  { id: 2, name: "Tin Tức", link: "/news" },
  { id: 2, name: "Tìm BBarber Gần Nhất", link: "/map" },
  { id: 2, name: "Về Chúng Tôi", link: "/us" },
];
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
};

export default function Navbar({ auth }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [customerInfo, setCustomerInfo] = useState(false)
  const [isOpenInfo, setIssOpenInfo] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleOrder = () => {
    navigate("/orders");
  };

  const handleOrderMobile = () => {
    setIsOpenMenu(!isOpenMenu);
    navigate("/orders");
  };
  const handleShowModal = (type) => {
    console.log(type);
    if (type === "signin") {
      dispatch(setOpenModalSignIn(true))
    } else if (type === "signup") {
      dispatch(setOpenModal(true))
    }
  }

  const handleShowProperty = (value) => {
    setIssOpenInfo(false)
    switch (value) {
      case "recharge":
        dispatch(setOpenRecharge(true))
        break;
      case "info":
        dispatch(setOpenInfoChange(true))
        break;
      case "password":
        dispatch(setOpenPasswordChange(true))
        break;

      default:
        console.log("Không có key này");
        break;
    }
    setCustomerInfo(!customerInfo)
  }
  return (
    <div className="">
      <div className="bg-[#2C2D2C]">
        <div className="container flex flex-row justify-between ">
          <div></div>
          {auth?.customerAuth?.token?.length > 0 ? (
            <>
              <div class=" flex flex-col justify-center z-50">
                <div class="flex items-center justify-center">
                  <div class=" relative inline-block text-left">
                    <span class="shadow-sm">
                      <button
                        onClick={() => setIssOpenInfo(!isOpenInfo)}
                        class="inline-flex justify-center w-full my-1 px-4 py-1 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300   hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 cursor-pointer"
                        type="button"
                      >
                        {auth?.customerAuth?.user?.name && (
                          <span class="pr-1 font-semibold flex-1">
                            {auth?.customerAuth?.user?.name}
                          </span>
                        )}
                        <svg
                          class={`w-5 h-5 ml-2 -mr-1 rotate-180 ${isOpenInfo && "rotate-0"} `}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          ></path>
                        </svg>
                      </button>
                    </span>
                    <div class="itransition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                      <div
                        class="absolute right-0 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100   shadow-lg outline-none"
                      >
                        <div className="flex">
                          {isOpenInfo &&
                            <div class="px-4 w-80 ">
                              <div className="md:grid md:grid-cols-3 flex justify-between item-start">
                                <div className="col-span-1">
                                  <img
                                    src="https://thumbs.dreamstime.com/b/icono-formal-del-traje-del-hombre-73465164.jpg"
                                    width={100}
                                  />
                                </div>
                                <div class="px-4 col-span-2 md:space-y-2 space-y-3 ">
                                  {auth?.customerAuth?.user?.name && (
                                    <p class="text-sm leading-5 mb-0 mt-1 ">
                                      {auth?.customerAuth?.user?.email}
                                    </p>
                                  )}
                                  {auth?.customerAuth?.user?.name && (
                                    <p class="text-sm leading-5 mb-0 ">
                                      {auth?.customerAuth?.user?.phone}
                                    </p>
                                  )}
                                  <div className="flex space-y-1 flex-col" >
                                    <p class="text-sm leading-5 mb-0 ">
                                      Số dư 1340k
                                    </p>
                                    {/* <p class="text-sm leading-5 mb-0 ">
                                  Điểm 150
                                </p> */}
                                  </div>
                                  <p class="text-sm leading-5 text-blue-400 mb-0 cursor-pointer" onClick={() => handleShowProperty("recharge")}>Nạp tiền</p>
                                  <p class="text-sm leading-5 text-blue-400 mb-0 cursor-pointer" onClick={() => handleShowProperty("info")}>Đổi thông tin</p>
                                  <p class="text-sm leading-5 text-blue-400 pb-1 cursor-pointer" onClick={() => handleShowProperty("password")}>Đổi mật khẩu</p>
                                </div>
                              </div>
                              <div className="col-span-2 text-center py-1 cursor-pointer">
                                <p
                                  class="text-[13px] py-1 text-white bg-[#8B9A46] "
                                  onClick={() => {
                                    dispatch(logOutCustomer())
                                    setIssOpenInfo(false)
                                  }}
                                >
                                  Đăng xuất
                                </p>
                              </div>
                            </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <ul className="mb-0 py-1 space-x-3">
              <li className="list-none inline">
                <a
                  className="text-white text-sm font-sans hover:text-gray-500"
                  onClick={() => handleShowModal("signup")}
                >
                  Đăng kí
                </a>
              </li>
              <li className="list-none inline">
                <a
                  className="text-white text-sm font-sans hover:text-gray-500  "
                  onClick={() => handleShowModal("signin")}
                >
                  Đăng nhập
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="bg-white">
        <nav className="container flex justify-between items-center z-20">
          <div className="my-5 lg:my-6">
            <img
              className="w-[40px]"
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
              alt="easybank logo"
            />
          </div>

          <div className="hidden lg:block text-sm ">
            {navItems.map((navItem, index) => (
              <a
                key={index}
                className="mx-3 py-5  text-black font-semibold  text-xl hover:text-gray-500  "
                href={navItem.link}
              >
                {navItem.name}
              </a>
            ))}
          </div>

          <button
            className="hidden lg:block font-sans bg-[#B4975A] text-white border-none hover:text-gray-500 cursor-pointer px-5 py-1"
            onClick={() => handleOrder()}
          >
            Đặt lịch{" "}
          </button>

          <button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className={`lg:hidden ${isOpenMenu && "hidden"
              }  cursor-pointer  hover:text-[#8B9A46] hover:bg-[#541212]`}
          >
            <MenuOutlined className={`${isOpenMenu && "hidden"}, p-1 `} />
          </button>
        </nav>
      </div>
      <div
        className={`fixed inset-0 z-30 bg-gray-800
      bg-opacity-50 ${isOpenMenu ? "block" : "hidden"} lg:hidden`}
      >
        <div className="bg-gray-300 flex flex-col text-center mx-5 my-20 py-4 rounded ">
          <div
            className="absolute right-9 top-[87px] cursor-pointer"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            {" "}
            <CloseOutlined />
          </div>
          {navItems.map((navItem, index) => (
            <a
              key={index}
              className="py-2 text-black font-sans text-xl uppercase hover:text-gray-500"
              href={navItem.link}
            >
              {navItem.name}
            </a>
          ))}
          <button
            className=" font-sans bg-[#B4975A] text-white border-none hover:text-gray-500 cursor-pointer px-5 py-1"
            onClick={() => handleOrderMobile()}
          >
            Đặt lịch{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
