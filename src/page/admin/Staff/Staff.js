import { Button, Image, Popconfirm, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Add from "components/admin/staff/Add";
import Date from "components/admin/staff/DatePicker";
import Update from "components/admin/staff/Update";
import WorkSchedule from "components/admin/staff/WorkSchedule";
import { fetchStaffAsynk } from "./StaffSlice";

const Staff = () => {
  const dispatch = useDispatch();
  const { staffs } = useSelector((data) => data.staffs);
  const staffsStatus = useSelector((data) => data);
  const [perPage, setPerPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [datas, setDatas] = useState([]);
  const handleChange = (page) => {
    dispatch(fetchStaffAsynk(`?page=${page.current}`));
  };
  useEffect(() => {
    dispatch(fetchStaffAsynk("?page=1"));
  }, []);
  useEffect(() => {
    if (staffs.status === 200) {
      setTotalPage(staffs.data.total);
      setPerPage(staffs.data.per_page);
      setDatas(staffs.data.data);
    } else {
      setDatas([]);
    }
  }, [staffs]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "user",
      key: "user",
      render: (user) => user.name,
    },
    {
      title: "Số điện thoại",
      dataIndex: "user",
      key: "user",
      render: (user) => user.phone,
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Image src={avatar} width={70}></Image>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Kinh nghiệm",
      dataIndex: "experiences",
      key: "experiences",
    },
    {
      title: "KPI",
      dataIndex: "proposed_kpi",
      key: "proposed_kpi",
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      render: (_, record) => (
        <div className="flex gap-3">
          <WorkSchedule record={record} />
          <Date />
          <Update record={record} />
          <Popconfirm title="Bạn có chắc chắn không?">
            <Button type="" danger ghost>
              Nghỉ việc
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Spin spinning={!staffs?.data?.data && staffsStatus.staffs.loading}>
        <Add />
        <h1 className="text-center py-4">Danh sách nhân viên</h1>
        <Table
          columns={columns}
          dataSource={datas}
          pagination={{
            pageSize: perPage,
            total: totalPage,
          }}
          onChange={(page) => handleChange(page)}
          rowKey="id"
        />
      </Spin>
    </div>
  );
};

export default Staff;
