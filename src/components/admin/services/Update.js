import { Button, Modal, Form, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editServicesAsync,
  fetchServicesAsync,
} from "page/admin/Services/ServiceSlice";
import { fetchCategoriesAsynk } from "page/admin/Categories/CategoriesSlice";
import isObject from "isobject";
const { Option } = Select;

const UpdateService = ({ record, datas, setDatas }) => {
  const dispatch = useDispatch();
  const [cate, setCate] = useState([]);
  const [images, setImages] = useState();
  const [status, setStatus] = useState("1");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const [form] = Form.useForm();
  const { categories } = useSelector((data) => data.categories);
  useEffect(() => {
    dispatch(fetchCategoriesAsynk());
  }, []);
  useEffect(() => {
    if (categories.status === 200) {
      setCate(categories.data.data);
    } else {
      setCate([]);
    }
  }, [categories]);
  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };
  const handleCallUpdate = async (record) => {
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      price: record.price,
      category_id: record.category_id,
      work_time: record.work_time,
      status: record.status,
    });
    setImages(record.image);
    setStatus(record.status);
    setOpen(true);
  };
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const handleGetImage = (img) => {
    if (img.size > 500000) {
      if (img.size >= 1024) {
        let size = (img.size / 1024).toFixed(0) + " KB";
        alert(`Chỉ cho phép kích thước ảnh nhỏ hơn 500kb, ảnh của bạn ${size}`);
      }
    } else {
      setImages(img);
    }
  };
  const onFinish = async (value) => {
    console.log(value);
    let formData = new FormData();
    formData.append("id", record.id);
    formData.append("name", value.name);
    formData.append("description", desc);
    formData.append("price", value.price);
    formData.append("work_time", value.work_time);
    formData.append("image", images);
    formData.append("category_id", value.category_id);
    formData.append("status", status);
    const res = await dispatch(editServicesAsync(formData));

    if (res.meta.requestStatus === "fulfilled") {
      message.success("Sửa dịch vụ thành công");
      setOpen(!open);
      form.resetFields();
      dispatch(fetchServicesAsync("?page=1"));
    } else {
      message.error("Sửa dịch vụ thất bại");
    }
  };
  return (
    <div>
      <Button type="primary" onClick={() => handleCallUpdate(record)}>
        Chỉnh sửa
      </Button>
      <div>
        <Modal
          title="Chỉnh sửa dịch vụ"
          centered
          open={open}
          onOk={() => handleClose()}
          onCancel={() => handleClose()}
          width={1000}
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
            <Form.Item
              name="name"
              label="Tên dịch vụ"
              rules={[
                {
                  required: true,
                  message: "Tên này không được để trống!",
                },
              ]}
            >
              <Input placeholder="Điền tên dịch vụ" />
            </Form.Item>
            <div className="flex justify-start items-center gap-5">
              <Form.Item
                label="Hình ảnh"
                name="image"
                required
                tooltip="Không được để trống"
                rules={[
                  {
                    required: true,
                    message: "Ảnh này không được để trống!",
                  },
                ]}
              >
                <input
                  type="file"
                  className="avatar-uploader"
                  onChange={(e) => handleGetImage(e.target.files[0])}
                />
              </Form.Item>
              <div>
                {isObject(images) && (
                  <img
                    className="w-[100px] h-[70px]"
                    src={URL.createObjectURL(images)}
                  />
                )}
                {!isObject(images) && (
                  <img className="w-[100px] h-[70px]" src={images} />
                )}
              </div>
            </div>
            <Form.Item
              name="description"
              label="Chi tiết dịch vụ"
              rules={[
                {
                  required: true,
                  message: "Chi tiết không được để trống!",
                },
              ]}
            >
              <Input
                placeholder="Điền chi tiết dịch vụ"
                onChange={(e) => setDesc(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="price"
              label="Giá dịch vụ"
              rules={[
                {
                  required: true,
                  message: "Giá không được để trống!",
                },
              ]}
            >
              <Input placeholder="Điền giá của dịch vụ" />
            </Form.Item>
            <Form.Item
              name="work_time"
              label="Thời gian của dịch vụ"
              rules={[
                {
                  required: true,
                  message: "Thời gian không được để trống!",
                },
              ]}
            >
              <Input placeholder="Điền thời gian của dịch vụ" />
            </Form.Item>
            <Form.Item
              name="category_id"
              label="Danh mục dịch vụ"
              rules={[
                {
                  required: true,
                  message: "Danh mục không được để trống!",
                },
              ]}
            >
              <Select placeholder="Vui lòng chọn danh mục" allowClear>
                {cate.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="status"
              label="Trạng thái của dịch vụ"
              required
              tooltip="Không được để trống trạng thái"
            >
              <Select
                defaultValue={status}
                onChange={(e) => {
                  setStatus(e);
                }}
                options={[
                  {
                    value: 1,
                    label: "Đang hoạt động",
                  },
                  {
                    value: 0,
                    label: "Dừng hoạt động",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Chỉnh sửa
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default UpdateService;
