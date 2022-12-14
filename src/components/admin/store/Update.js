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
                success("C???p nh???t c???a h??ng th??nh c??ng!")
                dispatch(fetchStoresAsynk("?page=1"))
            } else {
                error("C???p nh???t c???a h??ng th???t b???i!")
                dispatch(setLoadingModal(false))
            }

        } else {
            warning("Y??u c???u b???n ph???i t???i ???nh l??n!")
            imgRef.current.click()
        }

    }
    const handleGetImage = (img) => {
        if (img.size > 500000) {
            if (img.size >= 1024) {
                let size = (img.size / 1024).toFixed(0) + " KB"
                alert(`Ch??? cho ph??p k??ch th?????c ???nh nh??? h??n 500kb, ???nh c???a b???n ${size}`)
            }
        } else {
            setImage(img)
        }
    }



    return (

        <>
            <Button type="primary" ghost onClick={() => handleCallUpdate(record)}>
                Ch???nh s???a
            </Button>
            <Modal
                title={`C???p nh???t th??ng tin c???a h??ng`}
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
                        <Form.Item label="T??n c???a h??ng" required tooltip="Kh??ng ???????c ????? tr???ng">
                            <Form.Item name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tr?????ng n??y kh??ng ???????c ????? tr???ng!"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="?????a ch???" required tooltip="Kh??ng ???????c ????? tr???ng">
                            <Form.Item name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tr?????ng n??y kh??ng ???????c ????? tr???ng!"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Form.Item>
                        <div className='flex flex-row gap-12 items-start'>
                            <Form.Item label="??i???n tho???i" required tooltip="Kh??ng ???????c ????? tr???ng">
                                <Form.Item name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Tr?????ng n??y kh??ng ???????c ????? tr???ng!",
                                        },
                                        {
                                            pattern: /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
                                            message: "S??? ??i???n tho???i kh??ng h???p l???!",
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Kinh ?????" required tooltip="Kh??ng ???????c ????? tr???ng">
                                <Form.Item name="longitude"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Tr?????ng n??y kh??ng ???????c ????? tr???ng!",
                                        },
                                        // {
                                        //     pattern: /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
                                        //     message: "S??? ??i???n tho???i kh??ng h???p l???!",
                                        // }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="V?? ?????" required tooltip="Kh??ng ???????c ????? tr???ng">
                                <Form.Item name="latitude"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Tr?????ng n??y kh??ng ???????c ????? tr???ng!",
                                        },
                                        // {
                                        //     pattern: /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
                                        //     message: "S??? ??i???n tho???i kh??ng h???p l???!",
                                        // }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Form.Item>

                        </div>
                        <div className='flex flex-row gap-12 items-start'>
                            <Form.Item label="Tr???ng th??i" required tooltip="Kh??ng ???????c ????? tr???ng">
                                <Select
                                    defaultValue={status}
                                    onChange={(e) => {
                                        setStatus(e)
                                    }}
                                    options={[
                                        {
                                            value: 1,
                                            label: '??ang ho???t ?????ng',
                                        },
                                        {
                                            value: 0,
                                            label: 'D???ng ho???t ?????ng',
                                        },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item label="H??nh ???nh" required tooltip="Kh??ng ???????c ????? tr???ng">
                                <div className='ant-upload ant-upload-select ant-upload-select-text'>
                                    <label htmlFor='image' className='ant-btn ant-btn-default'>
                                        <ArrowUpOutlined />
                                        <span>T???i ???nh l??n</span>
                                    </label>
                                    <input id="image" ref={imgRef} type="file" onChange={(e) => handleGetImage(e.target.files[0])} style={{ display: "none" }} />
                                </div>
                            </Form.Item>

                            <div className='flex items-center'>
                                {isObject(image) && <img className='w-[70px] h-[70px]' src={URL.createObjectURL(image)} />}
                                {(!isObject(image) && image.length > 3) && <img className='w-[70px] h-[70px]' src={image} />}
                            </div>
                        </div>

                        <Form.Item label="M?? t???" required tooltip="M?? t???">
                            <TextArea
                                showCount
                                maxLength={100}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                style={{ height: 120 }}
                                placeholder="T???i ??a 100 k?? t???"
                                value={description}

                            />
                            
                        </Form.Item>
                        <Form.Item>
                            <div className="flex space-x-3">
                                <Button type="primary" htmlType='submit'>?????ng ??</Button>
                                <Popconfirm title="D???ng ch???nh s???a?" onConfirm={() => setOpen(false)}>
                                    <p className='ant-btn' >
                                        Tr??? l???i
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