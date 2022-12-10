import { ArrowUpOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, Select, Spin } from "antd"
import TextArea from "antd/lib/input/TextArea";
import isObject from "isobject";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoresAsynk, setLoadingModal, updateStoresAsynk } from "page/admin/Store/StoreSlice";
import { error, success, warning } from "utils/messageAnt";

const Update = ({ record }) => {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const imgRef = useRef()
    const [image, setImage] = useState('')
    const [requiredMark, setRequiredMarkType] = useState('optional')
    const [status, setStatus] = useState("1")
    const storeStatus = useSelector(data => data);
    const dispatch = useDispatch()
    const [description, setDescription] = useState('')

    const handleCallUpdate = (record) => {
        form.setFieldsValue({
            name: record.name,
            address: record.address,
            phone: record.phone,
            longitude: record.longitude,
            latitude: record.latitude,
            status: record.status,
        });
        setDescription(record.description)
        setImage(record.image)
        setStatus(record.status)
        setOpen(true)
    }
    const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    const onFinish = async (value) => {
        let formData = new FormData()
        formData.append("id", record.id)
        formData.append("name", value.name)
        formData.append("address", value.address)
        formData.append("description", description)
        formData.append("phone", value.phone)
        formData.append("longitude", parseFloat(value.longitude))
        formData.append("latitude", parseFloat(value.latitude))
        formData.append("status", status)
        isObject(image) && formData.append("image", image)
        
        if (image) {
            const res = await dispatch(updateStoresAsynk(formData))
            dispatch(setLoadingModal(true))
            if (res.meta.requestStatus == "fulfilled") {
                setOpen(false)
                dispatch(setLoadingModal(false))
                success("Cập nhật cửa hàng thành công!")
                dispatch(fetchStoresAsynk("?page=1"))
            } else {
                error("Cập nhật cửa hàng thất bại!")
                dispatch(setLoadingModal(false))
            }

        } else {
            warning("Yêu cầu bạn phải tải ảnh lên!")
            imgRef.current.click()
        }

    }
    const handleGetImage = (img) => {
        if (img.size > 500000) {
            if (img.size >= 1024) {
                let size = (img.size / 1024).toFixed(0) + " KB"
                alert(`Chỉ cho phép kích thước ảnh nhỏ hơn 500kb, ảnh của bạn ${size}`)
            }
        } else {
            setImage(img)
        }
    }



    return (

        <>
            <Button type="primary" ghost onClick={() => handleCallUpdate(record)}>
                Chỉnh sửa
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
                                            value: 1,
                                            label: 'Đang hoạt động',
                                        },
                                        {
                                            value: 0,
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

                            <div className='flex items-center'>
                                {isObject(image) && <img className='w-[70px] h-[70px]' src={URL.createObjectURL(image)} />}
                                {(!isObject(image) && image.length > 3) && <img className='w-[70px] h-[70px]' src={image} />}
                            </div>
                        </div>

                        <Form.Item label="Mô tả" required tooltip="Mô tả">
                            <TextArea
                                showCount
                                maxLength={100}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                style={{ height: 120 }}
                                placeholder="Tối đa 100 kí tự"
                                value={description}

                            />
                            
                        </Form.Item>
                        <Form.Item>
                            <div className="flex space-x-3">
                                <Button type="primary" htmlType='submit'>Đồng ý</Button>
                                <Popconfirm title="Dừng chỉnh sửa?" onConfirm={() => setOpen(false)}>
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

export default Update