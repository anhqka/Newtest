import { Button, Popconfirm, Spin, Table, Image, Tag, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewBanner from "components/admin/partials/banners/NewBanner";
import UpdateBanner from "components/admin/partials/banners/UpdateBanner";
import { error, success } from "utils/messageAnt";
import { fetchBannersAsync, removeBannesAsync, removeAndUpdateBanners, updateStatusBannersAsync } from "./PartialsSlice";
import isObject from "isobject";

const Banners = () => {
    const dispatch = useDispatch();
    const { partials } = useSelector((data) => data);
    const [loadingUpdate, setLoadingUpdate] = useState(false)

    useEffect(() => {
        dispatch(fetchBannersAsync())
    }, []);

    const handleRemove = (record) => {
        dispatch(removeBannesAsync(record.id))
            .then((data) => {
                if (data.payload.status === 200) {
                    success("Xoá banner thành công!")
                    dispatch(removeAndUpdateBanners(record))
                }
                if (!data.payload.status) {
                    error("Xoá banner thất bại")
                }
            })
    }
    const handleChangeStatus = ({ e, id }) => {
        const formData = new FormData()
        formData.append("id", id.id)
        formData.append("status", e)
        setLoadingUpdate(true)
        dispatch(updateStatusBannersAsync(formData))
            .then((data) => {
                if (data?.meta?.requestStatus === 'fulfilled') {
                    success("Cập nhật thành công")
                    
                } else {
                    success("Cập nhật thất bại")
                }
                setLoadingUpdate(false)
            })
    }

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
            title: "Url",
            dataIndex: "url",
            width: "15%",
            editable: true,
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            width: "5%",
            editable: true,
            render: (image) => <Image src={image} width={70} height={70}/>

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
            title: "Trạng thái",
            dataIndex: "status",
            width: "20%",
            editable: true,
            render: (status, id) => <Select
                defaultValue={`${status}`}
                onChange={(e) => {
                    handleChangeStatus({ e, id })
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
        },
        {
            title: "Chức năng",
            dataIndex: "operation",
            render: (_, record) => {
                return (
                    <div className="flex flex-row space-x-3">
                        <UpdateBanner record={record} />
                        {" "}
                        <Popconfirm title="Bạn chắc chắn xoá không?" onConfirm={() => handleRemove(record)}>
                            <Button type="" danger ghost >
                                Xoá
                            </Button>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            <NewBanner />
            <div className="my-6">
                <h1 className="text-center">Danh sách Slide</h1>
                {partials.loadingButtonModal &&
                    <Spin spinning={partials.loadingButtonModal}>
                        <div className="text-center">
                            <span>Đang xoá ...</span>
                        </div>
                    </Spin>
                }

                {loadingUpdate && <Spin spinning={loadingUpdate}>
                    <div className="text-center">
                        <span>Đang cập nhật trạng thái ...</span>
                    </div>
                </Spin>
                }
            </div>
            <div className="">
                <Spin spinning={!partials?.banners?.data && partials?.banners?.loadingModal}>
                    <Table
                        columns={columns}
                        dataSource={partials?.banners?.data?.data}
                        rowKey="id"
                    />
                </Spin>
            </div>
        </div>
    );
};

export default Banners;