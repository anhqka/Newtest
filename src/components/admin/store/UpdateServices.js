import { Button, Modal, Divider, Table, Spin } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServicesStoreAsynk,
  updateServicesStoreAsynk,
} from "page/admin/Store/StoreSlice";
import { error, success } from "utils/messageAnt";

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
    render: (image) => <img src={image} alt="image" width={70} />,
  },
  {
    title: "Giá",
    dataIndex: "price",
  },
  {
    title: "Thời gian cắt",
    dataIndex: "work_time",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
  },
];
const UpdateServices = ({ record }) => {
  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const storeStatus = useSelector((data) => data);
  const { stores } = useSelector((data) => data);

  const start = async () => {
    setLoading(true);
    let formData = new FormData();
    selectedRowKeys.map((item, index) => {
      formData.append(`services[${index}]`, item);
    });
    const upData = {
      data: formData,
      id: record.id,
    };
    await dispatch(updateServicesStoreAsynk(upData)).then((data) => {
      if (data.payload.status === 200) {
        success("Thêm dịch vụ cho cửa hàng thành công!");
      } else {
        error("Thêm dịch vụ cho cửa hàng thất bại!");
      }
    });

    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
    <>
      <Button
        type="primary"
        onClick={() => {
          let idServices = [];
          dispatch(fetchServicesStoreAsynk(record.id)).then((services) => {
            console.log(services);
            if (services.payload.status === 200) {
              services.payload.store_service.services.map((service) => {
                idServices = [...idServices, service.id];
                setSelectedRowKeys(idServices);
              });
            } else {
              setSelectedRowKeys([]);
            }
          });
          setOpen(true);
        }}
      >
        Cập nhật dịch vụ
      </Button>

      <Modal
        title="Cập nhật dịch vụ"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={"80%"}
        footer={null}
      >
        <Spin spinning={storeStatus.stores.loadingModal}>
          <div>
            <div
              style={{
                marginBottom: 16,
              }}
            >
              <Button
                type="primary"
                onClick={start}
                disabled={!hasSelected}
                loading={loading}
              >
                Lưu
              </Button>
              <span
                style={{
                  marginLeft: 8,
                }}
              >
                {hasSelected ? `Đã chọn ${selectedRowKeys.length} dịch vụ` : ""}
              </span>
            </div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={stores?.servicesStore?.services}
              rowKey="id"
            />
          </div>
        </Spin>
      </Modal>
    </>
  );
};

export default UpdateServices;
