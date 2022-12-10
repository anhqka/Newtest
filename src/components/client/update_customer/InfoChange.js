import { ErrorMessage } from "@hookform/error-message";
import { Form, Modal, Spin } from "antd"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setOpenInfoChange } from "page/client/Auth/AuthSlice";

const InfoChange = ({customer}) => {
    const { auth } = useSelector(data => data)
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const handleShowModal = () => {
        dispatch(setOpenInfoChange(false))
    }
    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid }, watch } = useForm({
        mode: "onChange"
    });

    const onSubmit = user => {
        let formData = new FormData()
        formData.append("email", user.email)
        formData.append("name", user.name)
        formData.append("phone", user.phone)
    };
    useEffect(() => {
        reset(customer)
    },[customer,reset])

    return (
        <Modal
            title="Đổi thông tin cá nhân"
            centered
            open={auth.openInfoChange}
            onOk={handleShowModal}
            onCancel={handleShowModal}
            width={500}
            footer={null}
        >
            <section class="">
                <div class="flex flex-col items-center px-6 mx-autolg:py-0">
                    <div class="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div class="space-y-4 md:space-y-6 sm:p-8">
                            {customer && 
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
                                <fieldset disabled>
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
                                    
                                    type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập email ..." required="" />
                               </fieldset>
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

                            <Spin spinning={auth.loading}>
                                <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 bg-[#B4975A] outline-none border border-none font-medium text-sm px-5 py-2.5 text-center  cursor-pointer">Cập nhật</button>
                            </Spin>

                        </form>}
                        </div>
                    </div>
                </div>
            </section>
        </Modal>
    )
}

export default InfoChange