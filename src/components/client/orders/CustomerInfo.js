import { Button, Form, Input, Modal, Popconfirm } from "antd"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerInfo, setLoadingCustomerInfo } from "page/client/Orders/OrderSlice";

const CustomerInfo = ({ orders, auth }) => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const handleShowModel = () => {
        dispatch(setLoadingCustomerInfo(false))
    }
    const onFinish = (value) => {
        dispatch(setLoadingCustomerInfo(false))
        dispatch(setCustomerInfo(value))
    }

    return (
        <Modal
            title="Thông tin khách hàng"
            centered
            open={orders.loadingCustomerInfo}
            onOk={() => handleShowModel()}
            onCancel={() => handleShowModel()}
            width={600}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <div className='flex md:flex-row flex-col md:gap-3 items-stretch'>
                    <Form.Item label="Tên" required tooltip="Không được để trống">
                        <Form.Item name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Trường này không được để trống!",
                                },
                            ]}
                        >
                            <Input defaultValue={orders?.customerInfo?.name} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Số điện thoại" required tooltip="Không được để trống">
                        <Form.Item name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Trường này không được để trống!",
                                },
                                {
                                    pattern: /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
                                    message: "Số điện thoại không hợp lệ!",
                                }
                            ]}
                        >
                            <Input defaultValue={orders?.customerInfo?.name} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Email" required tooltip="Không được để trống">
                        <Form.Item name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Trường này không được để trống!",
                                },
                                {
                                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Không đúng định dạng email",
                                },
                            ]}
                        >
                            <Input defaultValue={orders?.customerInfo?.email} />

                        </Form.Item>
                    </Form.Item>
                </div>
                <Form.Item>
                    <div className="flex space-x-3">
                        <Button style={{ backgroundColor: '#B4975A', color: "white" }} htmlType='submit'>Đồng ý</Button>
                        <Popconfirm title="Quý khách muốn tạm dừng thêm thông tin?" onConfirm={() => handleShowModel()}>
                            <p className='ant-btn' >
                                Trở lại
                            </p>
                        </Popconfirm>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CustomerInfo