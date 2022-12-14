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
                        T??m
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
                    message.success("C???p nh???t tr???ng th??i th??nh c??ng")
                } else {
                    message.error("C???p nh???t tr???ng th??i th???t b???i")
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
                warning("Kh??ng c?? nh??n vi??n tr???ng")
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
                message("C???p nh???t th??nh c??ng")
                SetHideSelectStylist(false)
            }else{
                message("C???p nh???t th???t b???i")
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
                title: 'T??n d???ch v???',
                dataIndex: 'sevice',
                key: 'sevice',
            },
            {
                title: 'Gi??',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Nh??n vi??n',
                dataIndex: 'staff',
                key: 'staff',
                render: (staff,key) => (staff === "undefined" && hideSelectStylist) ? <Select
                    showSearch
                    style={{
                        width: 200,
                    }}
                    placeholder="Ch???n nh??n vi??n"
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
                title: 'C???p nh???t nh??n vi??n',
                dataIndex: 'staff',
                key: 'staff',
                render: (staff, key) => staff == "undefined" ? (!hideSelectStylist?  <Button onClick={() => updateStylist(key)}>C???p nh???t nh??n vi??n</Button> : <p className='flex mb-0'><Button type="primary" onClick={submitUpdateStylist}>?????ng ??</Button> <Button onClick={() => SetHideSelectStylist(false)}>Hu???</Button> </p>) : <></>
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
            total_time: `${moment(order.total_time, "HH:mm").format("HH gi??? mm") + " ph??t"}`,
            total: formatMoney(order.total),
            status: order.status,
        });
    });

    const columns = [
        {
            title: 'M??H',
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
            title: 'C???a h??ng',
            dataIndex: 'store_id',
            key: 'store_id',
        },
        {
            title: 'Ng??y ?????t',
            dataIndex: 'created_at',
            key: 'created_at',
            ...getColumnSearchProps("created_at")
        },
        {
            title: 'Ng??y l??m',
            dataIndex: 'date',
            key: 'date',
            ...getColumnSearchProps("date")
        },
        {
            title: 'T???ng th???i gian l??m',
            dataIndex: 'total_time',
            key: 'total_time',
            ...getColumnSearchProps("total_time")
        },

        {
            title: 'T???ng ti???n',
            dataIndex: 'total',
            key: 'total',
            ...getColumnSearchProps("total")
        }, {
            title: 'Tr???ng th??i',
            dataIndex: 'status',
            filters: [
                {
                    text: '??ang ch???',
                    value: '1',
                },
                {
                    text: 'X??c nh???n',
                    value: '2',
                },
                {
                    text: 'Th??nh c??ng',
                    value: '3',
                },
                {
                    text: 'Hu???',
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
                            label: `${status}` == "1" ? '??ang ch???' : status == "2" ? "X??c nh???n" : status == "3" ? "Th??nh c??ng" : status == "4" ? "Hu???" : "Kh??ng x??c ?????nh",
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
                                label: '??ang ch???',
                            },
                            {
                                value: '2',
                                label: 'X??c nh???n',
                            },
                            {
                                value: '3',
                                label: 'Th??nh c??ng',
                            },
                            {
                                value: '4',
                                label: 'Hu???',
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
                        <p className='font-bold'>Ch?? th??ch</p>
                        <span>M??H: M?? ????n h??ng, MKH: M?? kh??ch h??ng, TKH: T??n kh??ch h??ng</span>
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