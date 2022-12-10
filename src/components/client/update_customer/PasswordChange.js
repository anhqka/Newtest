import { ErrorMessage } from "@hookform/error-message";
import { Form, Modal, Spin } from "antd"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setOpenPasswordChange } from "page/client/Auth/AuthSlice";

const PasswordChange = ({auth}) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const handleShowModal = () => {
        dispatch(setOpenPasswordChange(false))
    }
    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid }, watch } = useForm({
        mode: "onChange"
    });

    const onSubmit = user => {
        let formData = new FormData()
        formData.append("email", user.email)
        formData.append("password", user.password)
    };
    useEffect(() => {
        reset(auth?.customerAuth?.user)
    }, [auth,reset])

    return (
        <Modal
            title="Đổi mật khẩu"
            centered
            open={auth.openPasswordChange}
            onOk={handleShowModal}
            onCancel={handleShowModal}
            width={500}
            footer={null}
        >
            <section class="">
                <div class="flex flex-col items-center px-6 mx-autolg:py-0">
                    <div class="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                        <div class="space-y-4 md:space-y-6 sm:p-8">
                            <form onSubmit={handleSubmit(onSubmit)} class="space-y-4 md:space-y-6" action="#">
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
                                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Mật khẩu mới</label>
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
                                    <label for="password_confirmation" class="block mb-2 text-sm font-medium text-gray-900">Nhập lại mật khẩu mới</label>
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
                                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 bg-[#B4975A] outline-none border border-none font-medium text-sm px-5 py-2.5 text-center  cursor-pointer">Cập nhật</button>
                                </Spin>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Modal>
    )
}

export default PasswordChange