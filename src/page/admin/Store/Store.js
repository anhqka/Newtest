import { Button, Popconfirm, Spin, Table, Image, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MinusCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { fetchStoresAsynk, removeStoresAsynk } from "./StoreSlice";
import Update from "components/admin/store/Update";
import New from "components/admin/store/New";
import { error, success } from "utils/messageAnt";
import UpdateServices from "components/admin/store/UpdateServices";

const Store = () => {
  const dispatch = useDispatch();
  const [totalPage, setTotalPage] = useState(1);
  const [perPage, setPerPage] = useState(1);
  const { stores } = useSelector((data) => data.stores);
  const storeStatus = useSelector((data) => data);
  const [datas, setDatas] = useState([]);

  const handleDelete = (key) => {
    const res = dispatch(removeStoresAsynk(key));

    res.then((data) => {
      if (data.payload.status === 200) {
        success("Xoá danh mục thành công!");
      }
      if (!data.payload.status) {
        error("Xoá danh mục thất bại");
      }
    });
  };

  const handleChange = (page) => {
    dispatch(fetchStoresAsynk(`?page=${page.current}`));
  };
  useEffect(() => {
    dispatch(fetchStoresAsynk("?page=1"));
  }, []);
  useEffect(() => {
    if (stores.status === 200) {
      setTotalPage(stores.data.total);
      setPerPage(stores.data.per_page);
      setDatas(stores.data.data);
    } else {
      setDatas([]);
    }
  }, [stores]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      width: "5%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      width: "15%",
      editable: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      width: "5%",
      editable: true,
      render: (image) => <Image width={70} src={`${image}`} />,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: "25%",
      editable: true,
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      width: "10%",
      editable: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: "10%",
      editable: true,
      render: (status) =>
        status == 1 ? (
          <Tag icon={<SyncOutlined spin />} color="processing">
            Đang hoạt động
          </Tag>
        ) : (
          <Tag icon={<MinusCircleOutlined />} color="default">
            Dừng hoạt động
          </Tag>
        ),
    },
    {
      title: "Ngày thêm",
      dataIndex: "created_at",
      width: "15%",
      editable: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updated_at",
      width: "20%",
      editable: true,
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      render: (_, record) => {
        return (
          <div className="flex flex-row space-x-3">
            <UpdateServices record={record} />
            <Update record={record} />{" "}
            {/* <Popconfirm
              title="Bạn chắc chắn xoá không?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button type="" danger ghost>
                Xoá
              </Button>
            </Popconfirm> */}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <New />
      <div className="my-6">
        <h1 className="text-center">Danh sách cửa hàng</h1>
      </div>
      <div className="">
        <Spin spinning={!stores?.data?.data && storeStatus.stores.loading}>
          <Table
            columns={columns}
            dataSource={datas}
            pagination={{
              pageSize: perPage,
              total: totalPage,
            }}
            onChange={(page) => handleChange(page)}
          />
        </Spin>
      </div>
    </div>
  );
};

export default Store;