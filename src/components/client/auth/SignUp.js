import { ErrorMessage } from "@hookform/error-message";
import {  Form, Input, message, Modal, Spin } from "antd"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearOTPAsyc, finishRegisterAsyc, registerAsyc, setLoading, setOpenModal, setOpenModalSignIn } from "page/client/Auth/AuthSlice";


const SignUp = ({auth}) => {
    const [checkEmail, setCheckEmail] = useState(false)
    const dispatch = useDispatch()
    const [isRegister, setIsRegister] = useState(0)
    const [otp, setOtp] = useState(0)

    const navigate = useNavigate()

    const handleShowModal = () => {
        dispatch(setOpenModal(false))

        if(auth?.customer?.id){
            dispatch(clearOTPAsyc(auth?.customer?.id))
            .then(data => {
                console.log(data);
            })
        }
    }
    const handleModalSign = () => {
        dispatch(setOpenModal(false))
        dispatch(setOpenModalSignIn(true))
    }
    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid }, watch } = useForm({
        mode: "onChange"
    });

    const onSubmit = user => {
        if (checkEmail === false) {
            dispatch(registerAsyc(user))
                .then(data => {
                    if (data.meta.requestStatus === "fulfilled") {
                        setIsRegister(1)
                        setLoading(false)
                    }
                })
        } else {
            console.log("err");
            
        }
    };


    const handleCheckEmail = (value) => {
        const check = auth?.customers?.user.find((item) => item.email === value.target.value && item.status === 1 ) 
        if (check) {
            setCheckEmail(true)
        } else {
            setCheckEmail(false)
        }
    }

    const onSubmitOtp = async () => {
        console.log(auth.customer.id, otp);
        let formData = new FormData()
        formData.append("user_id",auth.customer.id)
        formData.append("otp_token", otp)

        await dispatch(finishRegisterAsyc(formData))
        .then(data => {
            if(data?.payload?.status === 200){
                setIsRegister(2)
            }else{
                message.error("Bạn nhập chưa đúng mã OTP. Mời nhập lại hoặc nhấn gửi lại mã để sử dụng mã mới!")
            }
        })
    }

    const handleLogin = () => {
        dispatch(setOpenModalSignIn(true))
        dispatch(setOpenModal(false))
    }

    return (
        <Modal
            title={`${isRegister === 0 ? "Đăng ký" : isRegister === 1 ? "Nhập mã OTP" : "Đăng ký thành công"}`}
            centered
            open={auth.openModal}
            onOk={() => handleShowModal()}
            onCancel={() => handleShowModal()}
            width={600}
            footer={null}
        >
            {isRegister === 0 ? <section class="">
                <div class="flex flex-col items-center px-6 mx-autolg:py-0">
                    <div class="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div class="space-y-4 md:space-y-6 sm:p-8">
                            <form onSubmit={handleSubmit(onSubmit)} class="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="name" class="block mb-2 text-sm font-medium text-black">Tên quý khách</label>
                                    <input
                                        {...register("name", {
                                            required: "Vui lòng không được để trống tên",
                                            pattern: {
                                                value: /^[a-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ/ ]+$/i,
                                                message: "Vui lòng không nhập số và kí tự đặc biệt"
                                            },
                                            minLength: {
                                                value: 2,
                                                message: "Cần nhập ít nhất 2 kí tự"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "Chỉ được nhập dưới 50 kí tự"
                                            }
                                        })}
                                        type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-[#B4975A] dark:focus:border-[#B4975A]" placeholder="Nhập tên quý khách..." required="" />
                                    <ErrorMessage errors={errors} style={{ color: "red" }} name="name" as="p" />
                                </div>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                    <input
                                        {...register("email", {
                                            required: "Vui lòng không được để trống email",
                                            pattern: {
                                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                message: "Email sai định dạng"
                                            },
                                            minLength: {
                                                value: 5,
                                                message: "Cần nhập ít nhất 9 kí tự"
                                            },
                                            maxLength: {
                                                value: 50,
                                                message: "Chỉ được nhập dưới 50 kí tự"
                                            }
                                        })}
                                        onChange={handleCheckEmail}
                                        type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập email ..." required="" />
                                    <ErrorMessage errors={errors} style={{ color: "red" }} name="email" as="p" />
                                    {checkEmail && <p style={{ color: "red" }}>Email đã tồn tại</p>}
                                </div>
                                <div>
                                    <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 ">Số điện thoại</label>
                                    <input
                                        {...register("phone", {
                                            required: "Vui lòng không được để trống số điện thoại",
                                            pattern: {
                                                value: /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
                                                message: "Số điện thoại sai định dạng"
                                            },
                                        })}
                                        type="text" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập số điện thoại..." required="" />
                                    <ErrorMessage errors={errors} style={{ color: "red" }} name="phone" as="p" />

                                </div>
                                <div>
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Mật khẩu</label>
                                    <input
                                        {...register("password", {
                                            required: "Vui lòng không được để trống password",
                                            minLength: {
                                                value: 6,
                                                message: "Cần nhập ít nhất 6 kí tự"
                                            },
                                            maxLength: {
                                                value: 21,
                                                message: "Chỉ được nhập dưới 21 kí tự"
                                            }
                                        })}
                                        type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    <ErrorMessage errors={errors} style={{ color: "red" }} name="password" as="p" />
                                </div>
                                <div>
                                    <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900">Nhập lại mật khẩu</label>
                                    <input
                                        {...register("password_confirmation", {
                                            required: true,
                                            validate: (val) => {
                                                if (watch('password') != val) {
                                                    return "Không trùng với mật khẩu trước bạn nhập";
                                                }
                                            },
                                        })}
                                        type="password" name="password_confirmation" id="password_confirmation" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                    <ErrorMessage errors={errors} style={{ color: "red" }} name="password_confirmation" as="p" />

                                </div>
                                <Spin spinning={auth.loading}>
                                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 bg-[#B4975A] outline-none border border-none font-medium text-sm px-5 py-2.5 text-center  cursor-pointer">Đăng ký</button>
                                </Spin>
                                <p class="text-sm font-light text-gray-500 dark:text-gray-400" onClick={handleLogin}>
                                    Nếu bạn có tài khoản rồi? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập ở đây!</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
                : isRegister === 1 ? <>
                    <section class="">
                        <div class="flex flex-col items-center px-6 mx-autolg:py-0">
                            <div class="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                                <div class="space-y-4 md:space-y-6 sm:p-8">
                                    <div class="space-y-4 md:space-y-6" action="#">
                                        <div className="flex flex-col justify-center items-stetch space-y-3 ">
                                            <div className="">
                                                <span className="">Vui lòng kiểm tra mail để xem tin nhắn có mã. Mã của bạn có 8 ký tự.</span>
                                                <input
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    type="text" name="otp_token" id="otp_token" class="md:mt-3 mt-0 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-[#B4975A] dark:focus:border-[#B4975A]" placeholder="Nhập mã otp ở đây ..." required="" />
                                            </div>
                                            <div>
                                                <span className="mb-0">Chúng tôi đã gửi mã cho bạn đến:  </span>
                                                <span>{auth?.customer.email}</span>
                                            </div>

                                        </div>

                                        <div className="flex space-x-3 justify-between">
                                            <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Gửi lại mã</a>
                                            <div className="flex  space-x-3">
                                                <div className="flex item-center">
                                                    <a class="w-[100%] px-3 mb-0 text-[#B4975A] border-solid border-[#B4975A] bg-primary-600 hover:bg-primary-700 bg-none outline-none border font-medium md:text-[13px] text-[9px] p-1 text-center  cursor-pointer" href="#" onClick={() => setIsRegister(0)}>Huỷ</a>
                                                </div>
                                                <Spin spinning={auth.loading}>
                                                    <div onClick={() => onSubmitOtp()} class="w-[100%] text-white bg-primary-600 hover:bg-primary-700 bg-[#B4975A] outline-none border border-none font-medium md:text-[13px] text-[9px]  p-1 text-center  cursor-pointer"> Tiếp tục</div>
                                                </Spin>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
                    : <>
                        <div className="flex space-x-3">
                            <div onClick={handleShowModal} class="w-[50%] text-white bg-primary-600 hover:bg-primary-700 bg-[#2C2D2C] outline-none border border-none font-medium md:text-[13px] text-[9px]  p-1 text-center  cursor-pointer"> Đồng ý </div>
                            <div onClick={handleModalSign} class="w-[50%] text-white bg-primary-600 hover:bg-primary-700 bg-[#B4975A] outline-none border border-none font-medium md:text-[13px] text-[9px]  p-1 text-center  cursor-pointer">Đăng nhập</div>
                        </div>
                    </>}
        </Modal>



    )
}

export default SignUp