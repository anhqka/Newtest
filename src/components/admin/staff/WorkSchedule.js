import { Button, Modal, Form, Table, Select, Spin } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addScheduleAsynk,
  fetchScheduleAsynk,
} from "page/admin/Staff/StaffSlice";
import { error, success } from "utils/messageAnt";

const WorkSchedule = ({ record }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { staffs } = useSelector((data) => data);
  const staffsStatus = useSelector((data) => data);
  const [form] = Form.useForm();
  const columns = [
    {
      title: "Thời gian bắt đầu",
      dataIndex: "start_time",
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "end_time",
    },
  ];
  const save = async () => {
    let formData = new FormData();
    formData.append("day", day);
    selectedRowKeys.map((item, index) => {
      if (item === 1) {
        formData.append(`time[${index}]`, `08:00:00 - 12:00:00`);
      } else if (item === 2) {
        formData.append(`time[${index}]`, `12:00:00 - 16:00:00`);
      } else if (item === 3) {
        formData.append(`time[${index}]`, `16:00:00 - 22:00:00`);
      } else if (item === null) {
        formData.append(`time[${index}]`, `[]`);
      }
    });
    const upData = {
      data: formData,
      id: record.id,
    };
    await dispatch(addScheduleAsynk(upData)).then((data) => {
      if (data.payload.status === 200) {
        success("Đăng ký thành công!");
        setOpen(false);
      } else if (data.payload.status === 400) {
        error("Bạn không thể cập nhật thời gian làm việc");
      } else {
        error("Đăng ký thất bại!");
      }
    });
  };
  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          let schedules = [];
          dispatch(fetchScheduleAsynk(record.id)).then((schedule) => {
            if (schedule.payload.status === 200) {
              schedule.payload.data.map((data) => {
                schedules = [...schedules, data.id];
                setSelectedRowKeys(schedules);
              });
            } else {
              setSelectedRowKeys([]);
            }
          });
          setOpen(true);
        }}
      >
        Đăng ký ca làm
      </Button>

      <Modal
        title="Đăng ký ca làm"
        centered
        open={open}
        onOk={() => handleClose()}
        onCancel={() => handleClose()}
        width={1000}
      >
        <Spin spinning={staffsStatus.staffs.loadingModal}>
          <Form form={form} layout="vertical">
            <Form.Item name="day" label="Chọn ngày làm việc">
              <Select
                defaultValue={day}
                onChange={(value) => {
                  setDay(value);
                }}
                options={[
                  {
                    value: 1,
                    label: "Thứ hai",
                  },
                  {
                    value: 2,
                    label: "Thứ ba",
                  },
                  {
                    value: 3,
                    label: "Thứ tư",
                  },
                  {
                    value: 4,
                    label: "Thứ năm",
                  },
                  {
                    value: 5,
                    label: "Thứ sáu",
                  },
                  {
                    value: 6,
                    label: "Thứ bảy",
                  },
                  {
                    value: 0,
                    label: "Chủ Nhật",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item label="Chọn thời gian làm việc">
              <Table
                rowSelection={rowSelection}
                columns={columns}
                disabled={!hasSelected}
                dataSource={staffs?.schedule?.data}
                rowKey="id"
              />
            </Form.Item>

            <Button type="primary" onClick={save}>
              Đăng ký
            </Button>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

export default WorkSchedule;
