import { Button, Modal, Form, Input, Select, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editStaffAsynk } from "page/admin/Staff/StaffSlice";
const Update = ({ record }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState();
  const [status, setStatus] = useState("1");
  const [exp, setExp] = useState("");
  const [requiredMark, setRequiredMarkType] = useState("optional");
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const handleCreate = async (record) => {
    form.setFieldsValue({
      name: record.user.name,
      phone: record.user.phone,
      address: record.address,
      experiences: record.experiences,
      salary: record.salary,
      proposed_kpi: record.proposed_kpi,
      status: record.status,
    });
    setStatus(record.status);
    setOpen(true);
  };
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };
  // const handleGetImage = (img) => {
  //   if (img.size > 500000) {
  //     if (img.size >= 1024) {
  //       let size = (img.size / 1024).toFixed(0) + " KB";
  //       alert(`Chỉ cho phép kích thước ảnh nhỏ hơn 500kb, ảnh của bạn ${size}`);
  //     }
  //   } else {
  //     setImages(img);
  //   }
  // };
  const onFinish = async (value) => {
    let formData = new FormData();
    formData.append("id", record.id);
    formData.append("name", value.name);
    formData.append("phone", value.phone);
    formData.append("experiences", exp);
    formData.append("address", value.address);
    formData.append("salary", value.salary);
    formData.append("proposed_kpi", value.proposed_kpi);
    formData.append("status", status);
    console.log(value);
    const res = await dispatch(editStaffAsynk(formData));
    console.log(res);
    if (res.meta.requestStatus === "fulfilled") {
      message.success("Sửa nhân viên thành công");
      setOpen(!open);
      form.resetFields();
    } else {
      message.error("Sửa nhân viên thất bại");
    }
  };
  return (
    <div>
      <Button type="primary" onClick={() => handleCreate(record)}>
        Chỉnh sửa
      </Button>
      <Modal
        title="Sửa thông tin nhân viên"
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
            label="Tên nhân viên"
            rules={[
              {
                required: true,
                message: "Tên này không được để trống!",
              },
            ]}
          >
            <Input placeholder="Điền tên của nhân viên" />
          </Form.Item>
          {/* <Form.Item
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
          </Form.Item> */}
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "SĐT không được để trống!",
              },
            ]}
          >
            <Input placeholder="Điền số điện thoại của nhân viên"></Input>
          </Form.Item>
          <Form.Item
            name="experiences"
            label="Kinh nghiệm"
            rules={[
              {
                required: true,
                message: "Kinh nghiệm không được để trống!",
              },
            ]}
          >
            <Input
              placeholder="Điền kinh nghiệm của nhân viên"
              onChange={(e) => setExp(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[
              {
                required: true,
                message: "Địa chỉ không được để trống!",
              },
            ]}
          >
            <Input placeholder="Điền địa chỉ của nhân viên" />
          </Form.Item>
          <Form.Item
            name="salary"
            label="Lương"
            rules={[
              {
                required: true,
                message: "Lương không được để trống!",
              },
            ]}
          >
            <Input placeholder="Điền lương của nhân viên" />
          </Form.Item>
          <Form.Item
            name="proposed_kpi"
            label="KPI"
            rules={[
              {
                required: true,
                message: "KPI không được để trống!",
              },
            ]}
          >
            <Input placeholder="Điền KPI của nhân viên" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng thái nhân viên"
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
                  label: "Đang làm việc",
                },
                {
                  value: 0,
                  label: "Tạm nghỉ việc",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Update;
