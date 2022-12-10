import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Select, Space, Spin, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerAsynk } from "./CustomerSlice"
import moment from "moment/moment";

const Customer = () => {

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

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

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCustomerAsynk())
    })

    const { customers } = useSelector(data => data)

    const users = [];
    customers?.customers?.user?.map(user => {
        users.push({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            status: user.status,
            email_verified_at: moment(user.email_verified_at).format("HH:mm DD/MM/YY"),
        });
    });

    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps("name")
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps("email")
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            ...getColumnSearchProps("phone")
        },

        {
            title: 'Trạng thái',
            dataIndex: 'status',
            filters: [
                {
                    text: 'Chưa kích hoạt',
                    value: '0',
                },
                {
                    text: 'Đã kích hoạt',
                    value: '1',
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
                            label: `${status}` == "0" ? 'Chưa kích hoạt' : status == "1" ? "Đã kích hoạt" : "Không xác định",
                        }}
                        style={{
                            width: 150,
                        }}
                        options={[
                            {
                                value: '0',
                                label: 'Chưa kích hoạt',
                            },
                            {
                                value: '1',
                                label: 'Đã kích hoạt',
                            },
                        ]}
                    />
                )
            }
        },
        {
            title: 'Ngày kích hoạt',
            dataIndex: 'email_verified_at',
            key: 'email_verified_at',
            ...getColumnSearchProps("email_verified_at")
        },

    ];

    return (
        <>
            <Spin spinning={!customers?.customers?.user?.length > 0 && customers?.customers?.loading}>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="id"
            />
            </Spin>
        </>
    )
}

export default Customer