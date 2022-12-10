import { DownOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, message, Select, Space, Spin, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPurchaseOrders, updateStatusPurchaseOrderAsync } from 'page/admin/Order/OrderAdminSlice';
import moment from "moment/moment";
import { formatMoney } from 'utils/formatMoney';
import Highlighter from "react-highlight-words";
import { getEmptyStaffPurchaseOrder, updateEmptyStaffPurchaseOrder } from 'api/orders';
import { error } from 'utils/messageAnt';
import { warning } from '@remix-run/router';

const PurchaseOrder = () => {
    const dispatch = useDispatch()
    const ordersData = useSelector(data => data.ordersAdmin)
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    console.log(ordersData);
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
        }) => (
            <div
                style={{
                    padding: 8
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    style={{
                        marginBottom: 8,
                        display: "block"
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Tìm
                    </Button>

                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1890ff" : undefined
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            )
    });

    const options = [];
    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }
    const handleChangeStaff = (value) => {
        setStylist(value);
    };

    useEffect(() => {
        dispatch(fetchPurchaseOrders())
    }, [])

    const handleChange = (value) => {
        dispatch(updateStatusPurchaseOrderAsync(value))
            .then((data) => {
                if (data.meta.requestStatus === "fulfilled") {
                    message.success("Cập nhật trạng thái thành công")
                } else {
                    message.error("Cập nhật trạng thái thất bại")
                }
            })
    };

    const [hideSelectStylist, SetHideSelectStylist] = useState(false)
    const [stylistSelected, setStylistSelected] = useState([])
    const [stylist, setStylist] = useState([])
    const [storeId, setStoreId] = useState()
    const [loading, setLoading] = useState(false)

    const updateStylist = (key) => {
        setLoading(true)
        getEmptyStaffPurchaseOrder(key.key)
            .then(({data}) => {
                console.log(data);
                setStoreId(key.key)
                setStylistSelected(data.data)
                SetHideSelectStylist(true)
                setLoading(false)
            })
            .catch(() => {
                warning("Không có nhân viên trống")
                setLoading(false)
            })
    }

    const submitUpdateStylist = () => {
        let formData = new FormData()
        formData.append("id",storeId)
        formData.append("staff_id",stylist)
        setLoading(true)
        updateEmptyStaffPurchaseOrder(formData)
        .then((data) => {
            console.log(data);
            if(data?.data?.status === 200) {
                message("Cập nhật thành công")
                SetHideSelectStylist(false)
            }else{
                message("Cập nhật thất bại")
                setLoading(false)
            }
            
        })
    }

    const expandedRowRender = (detail) => {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'key',
                key: 'key',
            },
            {
                title: 'Tên dịch vụ',
                dataIndex: 'sevice',
                key: 'sevice',
            },
            {
                title: 'Giá',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Nhân viên',
                dataIndex: 'staff',
                key: 'staff',
                render: (staff,key) => (staff === "undefined" && hideSelectStylist) ? <Select
                    showSearch
                    style={{
                        width: 200,
                    }}
                    placeholder="Chọn nhân viên"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    onChange={handleChangeStaff}
                    options={
                        stylistSelected?.length > 0 && stylistSelected?.map((stylist) => {
                            return (
                                {
                                    label: `${stylist.staff.user.name}`,
                                    value: `${stylist.staff_id}`
                                }
                            )
                        })
                        }
                /> : <p>{staff}</p>
            },
            {       
                title: 'Cập nhật nhân viên',
                dataIndex: 'staff',
                key: 'staff',
                render: (staff, key) => staff == "undefined" ? (!hideSelectStylist?  <Button onClick={() => updateStylist(key)}>Cập nhật nhân viên</Button> : <p className='flex mb-0'><Button type="primary" onClick={submitUpdateStylist}>Đồng ý</Button> <Button onClick={() => SetHideSelectStylist(false)}>Huỷ</Button> </p>) : <></>
            },
        ];
      
        const data = [];
        detail.booking_details.forEach(detail => {
            data.push({
                key: detail.id,
                sevice: `${detail.service.name}`,
                price: `${formatMoney(detail.price)}`,
                staff: `${detail?.staff?.user?.name}`,
            });
        });

        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const orders = [];
    ordersData?.purchaseOrder?.data?.map(order => {
        orders.push({
            id: order.id,
            userId: order.user.id,
            userName: `${order.user.name}`,
            booking_details: order.booking_details,
            store_id: order.store.name,
            created_at: `${moment(order.created_at).format("HH:mm DD/MM/YY")}`,
            date: `${moment(order.date).format("HH:mm DD/MM/YY")}`,
            total_time: `${moment(order.total_time, "HH:mm").format("HH giờ mm") + " phút"}`,
            total: formatMoney(order.total),
            status: order.status,
        });
    });

    const columns = [
        {
            title: 'MĐH',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps("id")
        },
        {
            title: 'MKH',
            dataIndex: 'userId',
            key: 'userId',
            ...getColumnSearchProps("userId")
        },
        {
            title: 'TKH',
            dataIndex: 'userName',
            key: 'userName',
            ...getColumnSearchProps("userName")
        },
        {
            title: 'Cửa hàng',
            dataIndex: 'store_id',
            key: 'store_id',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'created_at',
            key: 'created_at',
            ...getColumnSearchProps("created_at")
        },
        {
            title: 'Ngày làm',
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps("date")
        },
        {
            title: 'Tổng thời gian làm',
            dataIndex: 'total_time',
            key: 'total_time',
            ...getColumnSearchProps("total_time")
        },

        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            ...getColumnSearchProps("total")
        }, {
            title: 'Trạng thái',
            dataIndex: 'status',
            filters: [
                {
                    text: 'Đang chờ',
                    value: '1',
                },
                {
                    text: 'Xác nhận',
                    value: '2',
                },
                {
                    text: 'Thành công',
                    value: '3',
                },
                {
                    text: 'Huỷ',
                    value: '4',
                },
            ],
            key: 'status',
            onFilter: (value, record) => String(record.status).indexOf(value) === 0,
            render: (status, id) => {
                return (
                    <Select
                        labelInValue
                        defaultValue={{
                            value: `${status}`,
                            label: `${status}` == "1" ? 'Đang chờ' : status == "2" ? "Xác nhận" : status == "3" ? "Thành công" : status == "4" ? "Huỷ" : "Không xác định",
                        }}
                        style={{
                            width: 120,
                        }}
                        onChange={(status) => handleChange({
                            status: status.value,
                            orderId: id.id
                        })}
                        options={[
                            {
                                value: '1',
                                label: 'Đang chờ',
                            },
                            {
                                value: '2',
                                label: 'Xác nhận',
                            },
                            {
                                value: '3',
                                label: 'Thành công',
                            },
                            {
                                value: '4',
                                label: 'Huỷ',
                            },
                        ]}
                    />
                )
            }
        },

    ];

    return (
        <>
            <div className='text-center mb-3'>
                <Spin spinning={ordersData.loadingUpdate}>
                    <div className='text-left '>
                        <p className='font-bold'>Chú thích</p>
                        <span>MĐH: Mã đơn hàng, MKH: Mã khách hàng, TKH: Tên khách hàng</span>
                    </div>
                </Spin>
            </div>

            <Spin spinning={ordersData?.loading || loading}>
                <Table
                    columns={columns}
                    expandable={{
                        expandedRowRender,
                        defaultExpandedRowKeys: ['0'],
                    }}
                    dataSource={orders}
                    rowKey="id"
                />
            </Spin>
        </>
    );
};
export default PurchaseOrder;