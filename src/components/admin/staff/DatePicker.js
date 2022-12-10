import React, { useState } from "react";
import { Button, Form, message, Modal, Table } from "antd";
import { useDispatch } from "react-redux";
import { getDateAsynk } from "page/admin/Staff/StaffSlice";
const Date = () => {
  const dispatch = useDispatch();
  const [work, setWork] = useState(true);
  const [detailWork, setDetailWork] = useState();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const handleOpen = () => {
    form.setFieldValue("");
    setOpen(true);
    setWork(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const closeDetailWork = () => {
    setOpen(false);
    setDetailWork(null);
  };
  const onFinish = async () => {
    const res = await dispatch(getDateAsynk());
    if (res.meta.requestStatus === "fulfilled") {
      setDetailWork(res.payload.data);
      message.success(
        "Lấy lịch làm việc thành công, vui lòng ấn vào chi tiết để biết thêm"
      );
      form.resetFields("");
    } else {
      message.error("Ngày hôm nay bạn chưa có lịch");
    }
  };
  const columns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "nameService",
      key: "nameService",
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "end_time",
      key: "end_time",
    },
  ];
  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
        }}
      >
        Lịch làm việc
      </Button>
      {work ? (
        <Modal
          title="Check lịch làm việc"
          centered
          open={open}
          onOk={() => handleClose()}
          onCancel={() => handleClose()}
          width={300}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          {detailWork ? (
            <>
              <div className="flex justify-center items-center">
                <Button onClick={() => setWork(false)}>Chi tiết</Button>
              </div>
            </>
          ) : (
            ""
          )}
        </Modal>
      ) : (
        <div className="flex justify-center items-center">
          <Modal
            title="Chi tiết lịch làm việc"
            centered
            open={open}
            onOk={() => closeDetailWork()}
            onCancel={() => closeDetailWork()}
            width={1000}
          >
            <Table columns={columns} dataSource={detailWork} rowKey="id" />
          </Modal>
        </div>
      )}
    </>
  );
};
export default Date;
