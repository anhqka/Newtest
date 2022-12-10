import { ArrowUpOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Popconfirm, Select, Spin } from "antd"
import isObject from "isobject";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBanner } from "api/partials";
import { createBannersAsync, updateBanners, updateBannersAsync } from "page/admin/Partials/PartialsSlice";
import { warning, error, success } from "utils/messageAnt";
import { fetchBannersAsync } from "../../../../page/admin/Partials/PartialsSlice";

const UpdateBanner = ({ record }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const {partials} = useSelector(data => data);
    const [status, setStatus] = useState(record.status)
    const [form] = Form.useForm();
    const imgRef = useRef()
    const [image, setImage] = useState('')
    const [requiredMark, setRequiredMarkType] = useState('optional');

    const onFinish = async (value) => {
        let formData = new FormData()
        if (isObject(image)) {
            formData.append("id", record.id)
            formData.append("name", value.name)
            formData.append("url", value.url)
            formData.append("status", status)
            formData.append("image", image)
        } else {
            formData.append("id", record.id)
            formData.append("name", value.name)
            formData.append("url", value.url)
            formData.append("status", status)
        }
        if (image) {

            const res = await dispatch(updateBannersAsync(formData))
            if (res.meta.requestStatus == "fulfilled") {
                success("Cập nhật cửa hàng thành công!")
                setImage('')
                setOpen(false)
                dispatch(fetchBannersAsync())
            } else {
                error("Cập nhật cửa hàng thất bại!")
            }
        } else {
            warning("Yêu cầu bạn phải tải ảnh lên!")
            imgRef.current.click()
        }
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
            setImage(img)
        }
    }
    const handleCallUpdate = (record) => {
        form.setFieldsValue({
            name: record.name,
            url: record.url,
        });
        setImage(record.image)
        // setStatus(record.status)
        setOpen(true)
    }
    return (
        <>
            <Button type="primary" ghost onClick={() => handleCallUpdate(record)}>
                Chỉnh sửa
            </Button>

            <Modal
                title={`Thêm mới banners`}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={null}
                width={600}
            >
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
                    <div className='flex items-stretch space-x-3'>
                        <Form.Item label="Tên banner" className="w-[50%]" required tooltip="Không được để trống">
                            <Form.Item name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Trường này không được để trống!"
                                    },
                                    {
                                        min: 6,
                                        message: "Tên banners bắt buốc trên 6 ký tự!"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Url" className="w-[50%]" required tooltip="Không được để trống">
                            <Form.Item name="url"
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
                    </div>
                    <div className='flex flex-row space-x-3 items-start'>

                        <Form.Item label="Trạng thái" className="w-[30%]" required tooltip="Không được để trống">
                            <Select
                                value={`${status}`}
                                defaultValue={`${status}`}
                                onChange={(e) => {
                                    setStatus(e)
                                }}
                                options={[
                                    {
                                        value: '1',
                                        label: 'Ẩn',
                                    },
                                    {
                                        value: '2',
                                        label: 'Hiện',
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="Hình ảnh"  required tooltip="Không được để trống">
                            <div className='ant-upload ant-upload-select ant-upload-select-text'>
                                <label htmlFor='image' className='ant-btn ant-btn-default'>
                                    <ArrowUpOutlined />
                                    <span className="px-5">Tải ảnh lên</span>
                                </label>
                                <input  id="image" ref={imgRef} type="file" onChange={(e) => handleGetImage(e.target.files[0])} style={{ display: "none" }} />
                            </div>
                        </Form.Item>
                        <div className='flex items-center'>
                            {isObject(image) && <img className='w-[70px] h-[70px]' src={URL.createObjectURL(image)} />}
                            {(!isObject(image) && image.length > 3) && <img className='w-[70px] h-[70px]' src={image} />}
                        </div>
                    </div>

                    <Form.Item>
                        <Spin spinning={partials.loadingButtonModal}>
                            <div className="flex space-x-3">
                                <Button type="primary" htmlType='submit'>Đồng ý</Button>
                                <Popconfirm title="Dừng thêm mới?" onConfirm={() => setOpen(false)}>
                                    <p className='ant-btn' >
                                        Trở lại
                                    </p>
                                </Popconfirm>
                            </div>
                        </Spin>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
export default UpdateBanner