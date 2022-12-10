import { ErrorMessage } from "@hookform/error-message";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Progress,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCustomersAsyc,
  fetchForgotPassWorkAsync,
  fetchOtpForgotPassWorkAsync,
  setOpenModal,
  setOpenModalSignIn,
  signInAsyc,
} from "page/client/Auth/AuthSlice";

const SignIn = ({ auth }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [checkEmail, setCheckEmail] = useState(false);
  const [prevConfirm, setPrevConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [failLogin, setFailLogin] = useState(false);
  const [showContent, setShowContent] = useState("signin");
  const [otp, setOtp] = useState(0);

  const navigate = useNavigate();

  const handleShowModal = () => {
    dispatch(setOpenModalSignIn(false));
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(fetchCustomersAsyc());
  }, []);

  const onSubmit = (user) => {
    let formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);

    dispatch(signInAsyc(formData)).then((data) => {
      if (data?.payload?.status === 200) {
        message.success("Đăng nhập thành công!");
        dispatch(setOpenModalSignIn(false));
      } else {
        setFailLogin(true);
      }
    });
  };
  const onSubmitForgotEmail = () => {
    if (checkEmail) {
      let formData = new FormData();
      formData.append("email", email);
      dispatch(fetchOtpForgotPassWorkAsync(formData)).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          setPrevConfirm(true);
        } else {
          message.error("Vui lòng thử lại!");
        }
      });
    }
  };

  const onChange = (email) => {
    new Promise((resolve, reject) => {
      resolve(handleCheckEmail(email));
    }).then((data) => {
      setEmail(email);
      if (data === true) {
        setCheckEmail(true);
      } else {
        setCheckEmail(false);
      }
    });
  };

  const onSubmitForgot = (data) => {
    let formData = new FormData();
    formData.append("password", data.password);
    formData.append("token", data.otp_token);
    dispatch(fetchForgotPassWorkAsync(formData)).then((data) => {
      if (data.meta.requestStatus === "fulfilled") {
        message.success("Lấy lại mật khẩu thành công!");
        handleShowContent("signin");
        setPrevConfirm(false);
      } else {
        message.error("Mã OTP sai hoặc đã quá hạn! Vui lòng thử lại!");
      }
    });
  };

  const handleLogout = () => {
    dispatch(setOpenModalSignIn(false));
    dispatch(setOpenModal(true));
  };

  const handleShowContent = (value) => {
    switch (value) {
      case "forgot":
        setShowContent("forgot");
        break;
      case "signin":
        setShowContent("signin");
        break;
      default:
        break;
    }
  };
  const handleCheckEmail = (value) => {
    const check = auth?.customers?.user.find(
      (item) => item.email === value && item.status === 1
    );
    if (check) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Modal
      title={`${showContent === "signin" ? "Đăng nhập" : "Quyên mật khẩu"}`}
      centered
      open={auth.openModalSignIn}
      onOk={() => handleShowModal()}
      onCancel={() => handleShowModal()}
      width={600}
      footer={null}
    >
      {showContent === "signin" ? (
        <section class="">
          <div class="flex flex-col items-center px-6 mx-autolg:py-0">
            <div class="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
              <div class="space-y-4 md:space-y-6 sm:p-8">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  class="space-y-4 md:space-y-4"
                  action="#"
                >
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Email
                    </label>
                    <input
                      onMouseDown={() => setFailLogin(false)}
                      {...register("email", {
                        required: "Vui lòng không được để trống email",
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Email sai định dạng",
                        },
                        minLength: {
                          value: 5,
                          message: "Cần nhập ít nhất 9 kí tự",
                        },
                        maxLength: {
                          value: 50,
                          message: "Chỉ được nhập dưới 50 kí tự",
                        },
                      })}
                      type="email"
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Nhập email ..."
                      required=""
                    />
                    <ErrorMessage
                      errors={errors}
                      style={{ color: "red" }}
                      name="email"
                      as="p"
                    />
                  </div>

                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Mật khẩu
                    </label>
                    <input
                      onMouseDown={() => setFailLogin(false)}
                      {...register("password", {
                        required: "Vui lòng không được để trống password",
                        minLength: {
                          value: 6,
                          message: "Cần nhập ít nhất 6 kí tự",
                        },
                        maxLength: {
                          value: 21,
                          message: "Chỉ được nhập dưới 21 kí tự",
                        },
                      })}
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                    />
                    <ErrorMessage
                      errors={errors}
                      style={{ color: "red" }}
                      name="password"
                      as="p"
                    />
                  </div>
                  {failLogin && (
                    <p style={{ color: "red" }}>
                      Sai tài khoản hoặc mật khẩu. Vui lòng nhập lại!
                    </p>
                  )}
                  <Spin spinning={auth.loading}>
                    <button
                      type="submit"
                      class="w-full text-white bg-primary-600 hover:bg-primary-700 bg-[#B4975A] outline-none border border-none font-medium text-sm px-5 py-2.5 text-center  cursor-pointer"
                    >
                      Đăng nhập
                    </button>
                  </Spin>
                  <div className="mt-1">
                    <a
                      href="#"
                      class="font-medium text-primary-600 hover:underline mb-0"
                      onClick={() => handleShowContent("forgot")}
                    >
                      Quyên mật khẩu?
                    </a>
                  </div>
                  <p
                    class="text-sm font-light text-gray-500 dark:text-gray-400 mt-"
                    onClick={handleLogout}
                  >
                    Nếu bạn chưa có tài khoản?{" "}
                    <a
                      href="#"
                      class="font-medium text-primary-600 hover:underline"
                    >
                      Đăng ký ở đây!
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section class="">
          <div class="flex flex-col items-center px-6 mx-autolg:py-0">
            <div class="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
              <form
                class="space-y-4 md:space-y-6 p-4"
                onSubmit={handleSubmit(onSubmitForgot)}
                action="#"
              >
                <div class="space-y-4 md:space-y-6" action="#">
                  <div className="">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      {...register("email", {
                        required: "Vui lòng không được để trống email",
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Email sai định dạng",
                        },
                        minLength: {
                          value: 5,
                          message: "Cần nhập ít nhất 9 kí tự",
                        },
                        maxLength: {
                          value: 50,
                          message: "Chỉ được nhập dưới 50 kí tự",
                        },
                      })}
                      onChange={(e) => onChange(e.target.value)}
                      value={email}
                      type="text"
                      name="email"
                      id="email"
                      class="mt-0 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-[#B4975A] dark:focus:border-[#B4975A]"
                      placeholder="Nhập email ở đây ..."
                      required=""
                    />
                    {!checkEmail && email.length > 7 && (
                      <p className="text-red-600 mt-3">
                        Địa chỉ email không tồn tại!
                      </p>
                    )}
                  </div>
                  {checkEmail && prevConfirm && (
                    <>
                      <div>
                        <label
                          for="password"
                          class="block mb-2 text-sm font-medium text-gray-900 "
                        >
                          Mật khẩu mới
                        </label>
                        <input
                          {...register("password", {
                            required: "Vui lòng không được để trống password",
                            minLength: {
                              value: 6,
                              message: "Cần nhập ít nhất 6 kí tự",
                            },
                            maxLength: {
                              value: 21,
                              message: "Chỉ được nhập dưới 21 kí tự",
                            },
                          })}
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                        />
                        <ErrorMessage
                          errors={errors}
                          style={{ color: "red" }}
                          name="password"
                          as="p"
                        />
                      </div>
                      <div>
                        <label
                          for="password_confirmation"
                          class="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Nhập lại mật khẩu mới
                        </label>
                        <input
                          {...register("password_confirmation", {
                            required: true,
                            validate: (val) => {
                              if (watch("password") != val) {
                                return "Không trùng với mật khẩu trước bạn nhập";
                              }
                            },
                          })}
                          type="password"
                          name="password_confirmation"
                          id="password_confirmation"
                          placeholder="••••••••"
                          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required=""
                        />
                        <ErrorMessage
                          errors={errors}
                          style={{ color: "red" }}
                          name="password_confirmation"
                          as="p"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex flex-col justify-center items-stetch space-y-3 ">
                    <span
                      className={`${
                        checkEmail && prevConfirm ? "block" : "hidden"
                      }`}
                    >
                      Vui lòng kiểm tra mail để xem tin nhắn có mã. Mã của bạn
                      có 8 ký tự.
                    </span>
                    {checkEmail && prevConfirm ? (
                      <div className="grid grid-cols-3 items-center justify-between border-solid border-[0.6px]">
                        <div className="col-span-2">
                          <input
                            {...register("otp_token", {
                              required: "Vui lòng không được để trống mã otp",
                            })}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            name="otp_token"
                            id="otp_token"
                            class={` mt-0 bg-gray-50 block w-full p-2.5 border-none outline-none `}
                            placeholder="Nhập mã otp ở đây ..."
                            required=""
                          />
                        </div>
                        <Spin spinning={auth.loadingForgot}>
                          <button
                            type="submit"
                            class="w-full col-span-1 text-white bg-primary-600 hover:bg-primary-700 bg-[#B4975A] outline-none border border-none font-medium  text-center  cursor-pointer"
                          >
                            <p className="mb-0 p-2.5">Xác thực</p>
                          </button>
                        </Spin>
                      </div>
                    ) : (
                      <Spin spinning={auth.loadingForgot}>
                        <div
                          onClick={onSubmitForgotEmail}
                          class=" text-white bg-primary-600 hover:bg-primary-700 bg-[#B4975A] outline-none border border-none font-medium  text-center  cursor-pointer"
                        >
                          <p className="mb-0 p-2.5">Tiếp tục</p>
                        </div>
                      </Spin>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </Modal>
  );
};

export default SignIn;
