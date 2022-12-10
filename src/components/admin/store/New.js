import { ArrowUpOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, Select, Spin } from "antd"
import TextArea from "antd/lib/input/TextArea";
import isObject from "isobject";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStoresAsynk } from "page/admin/Store/StoreSlice";
import { error, success, warning } from "utils/messageAnt";

const New = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const storeStatus = useSelector(data => data);
    const [form] = Form.useForm();
    const imgRef = useRef()
    const [imageNew, setImageNew] = useState('')
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const [status, setStatus] = useState("1")
    const [desc, setDesc] = useState('')
    console.log(imageNew);

    const onFinish = async (value) => {
        let formData = new FormData()
        formData.append("name", value.name)
        formData.append("address", value.address)
        formData.append("longitude", value.longitude)
        formData.append("latitude", value.latitude)
        formData.append("description", desc)
        formData.append("phone", value.phone)
        formData.append("image", imageNew)
        formData.append("status", status)

        if (imageNew) {
            const res = await dispatch(addStoresAsynk(formData))
            if (res.meta.requestStatus == "fulfilled") {
                success("Thêm mới cửa hàng thành công!")
                setImageNew('')
                setDesc('')
                setOpen(false)
            } else {
                error("Thêm mới cửa hàng thất bại!")
            }
        } else {
            warning("Yêu cầu bạn phải tải ảnh lên!")
            imgRef.current.click()
        }
    }

    const handleCreate = () => {
        form.setFieldsValue({
            name: "",
            address: "",
            phone: "",
            description: ""
        });
        setOpen(true)
    }
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    const handleGetImage = (img) => {
        if (img.size > 500000) {
            if (img.size >= 1024) {
                let size = (img.size / 1024).toFixed(0) + " KB"
                alert(`Chỉ cho phép kích thước ảnh nhỏ hơn 500kb, ảnh của bạn ${size}`)
            }
        } else {
            setImageNew(img)
        }
    }

    return (
        <>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleCreate()}
            >
                Thêm mới
            </Button>

            <Modal
                title={`Cập nhật thông tin cửa hàng`}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={null}
                width={"60%"}
            >
                <Spin spinning={storeStatus.stores.loadingModal}>

                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={{
                            requiredMarkValue: requiredMark,
                        }}
                        onValuesChange={onRequiredTypeChange}
                        requiredMark={requiredMark}
                        onFinish={onFinish}
                    >
                        <Form.Item label="Tên cửa hàng" required tooltip="Không được để trống">
                            <Form.Item name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Trường này không được để trống!"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Địa chỉ" required tooltip="Không được để trống">
                            <Form.Item name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Trường này không được để trống!"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <div className='flex flex-row gap-12 items-start'>
                            <Form.Item label="Điện thoại" required tooltip="Không được để trống">
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
                                    <Input />
                                </Form.Item>
                            </Form.Item>

                            <Form.Item label="Kinh độ" required tooltip="Không được để trống">
                                <Form.Item name="longitude"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Trường này không được để trống!",
                                        },
                                        // {
                                        //     pattern: /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
                                        //     message: "Số điện thoại không hợp lệ!",
                                        // }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Vĩ độ" required tooltip="Không được để trống">
                                <Form.Item name="latitude"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Trường này không được để trống!",
                                        },
                                        // {
                                        //     pattern: /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
                                        //     message: "Số điện thoại không hợp lệ!",
                                        // }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form.Item>
                            <div className='flex items-center'>
                                {isObject(imageNew) && <img className='w-[70px] h-[70px]' src={URL.createObjectURL(imageNew)} />}
                            </div>
                        </div>
                        <div className='flex flex-row gap-12 items-start'>
                            <Form.Item label="Trạng thái" required tooltip="Không được để trống">
                                <Select
                                    defaultValue={status}
                                    onChange={(e) => {
                                        setStatus(e)
                                    }}
                                    options={[
                                        {
                                            value: '1',
                                            label: 'Đang hoạt động',
                                        },
                                        {
                                            value: '0',
                                            label: 'Dừng hoạt động',
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <Form.Item label="Hình ảnh" required tooltip="Không được để trống">
                                <div className='ant-upload ant-upload-select ant-upload-select-text'>
                                    <label htmlFor='image' className='ant-btn ant-btn-default'>
                                        <ArrowUpOutlined />
                                        <span>Tải ảnh lên</span>
                                    </label>
                                    <input id="image" ref={imgRef} type="file" onChange={(e) => handleGetImage(e.target.files[0])} style={{ display: "none" }} />
                                </div>
                            </Form.Item>
                        </div>
                        <Form.Item label="Mô tả" required tooltip="Mô tả">
                            <TextArea
                                showCount
                                maxLength={100}
                                onChange={(e) => setDesc(e.target.value)}
                                style={{ height: 120 }}
                                placeholder="Tối đa 100 kí tự"
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className="flex space-x-3">
                                <Button type="primary" htmlType='submit'>Đồng ý</Button>
                                <Popconfirm title="Dừng thêm mới?" onConfirm={() => setOpen(false)}>
                                    <p className='ant-btn' >
                                        Trở lại
                                    </p>
                                </Popconfirm>
                            </div>
                        </Form.Item>
                    </Form>
                </Spin>

            </Modal>

        </>
    )
}
export default New