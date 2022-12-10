import { Button, Form, Input, InputNumber, message, Popconfirm, Space, Spin, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesAsynk, addCategoryAsynk, updateCategoryAsynk, removeCategoryAsynk } from './CategoriesSlice';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';


const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                        {
                            min: 5,
                            message: "Cần nhập ít nhất 5 kí tự"
                        }
                        ,
                        {
                            max: 50,
                            message: "Chỉ được nhập dưới 50 kí tự"
                        },
                        {
                            pattern: /^[a-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ/ ]+$/i,
                            message: "Danh mục không được chứa số và kí tự đặc biệt"
                        }
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const Categories = () => {
    const dispatch = useDispatch();
    const [addNew, setAddNew] = useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const [perPage, setPerPage] = useState(1)
    const { categories } = useSelector(data => data.categories);
    const categoryStatus = useSelector(data => data);
    const [datas, setDatas] = useState([]);
    const [form] = Form.useForm()

    const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
        mode: "onChange"
    });
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.id === editingKey;

    const onSubmit = async data => {

        const status = datas.find(item => item.name === data.name)

        if (!status) {
            const res = dispatch(addCategoryAsynk(data))
            res.then((data) => {
                if (data.payload.status === 200) {
                    success("Thêm mới thành công!")
                    reset();
                }
                if (!data.payload.status) {
                    error("Thêm mới thất bại")
                }
            })
        } else {
            error("Thêm mới thất bại, không được trùng tên danh mục!")
        }
    };

    const handleChange = (page) => {
        dispatch(fetchCategoriesAsynk(`?page=${page.current}`))
        console.log(page, "page");
    };
    useEffect(() => {
        dispatch(fetchCategoriesAsynk("?page=1"))
    }, [])

    useEffect(() => {
        if (categories.status === 200) {
            setTotalPage(categories.data.total)
            setPerPage(categories.data.per_page)
            setDatas(categories.data.data)
        } else {
            setDatas([])
        }
    }, [categories])

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            ...record,
        });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...datas];
            const index = newData.findIndex((item) => key === item.id);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                const category = { ...row, id: item.id }

                const status = datas.find(item => item.name === row.name )

                if (!status) {
                    const res = dispatch(updateCategoryAsynk(category))
                    res.then((data) => {
                        if (data.payload.status === 200) {
                            success("Chỉnh sửa thành công!")
                            setDatas(newData);
                            setEditingKey('');
                        }
                    })
                } else {
                    error("Chỉnh sửa thất bại, không được trùng tên danh mục!")
                }
            } else {
                newData.push(row);
                setDatas(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = (key) => {
        const res = dispatch(removeCategoryAsynk(key))

        res.then((data) => {
            if (data.payload.status === 200) {
                success("Xoá danh mục thành công!")
                const newData = datas.filter((item) => item.id !== key)
                setDatas(newData);
                reset();
            }
            if (!data.payload.status) {
                error("Xoá danh mục thất bại")
            }
        })

    };

    const success = (pmess) => {
        message.success(pmess);
    };
    const error = (pmess) => {
        message.error(pmess);
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: '25%',
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'Chức năng',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => {
                                save(record.id)
                            }}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Đồng ý
                        </Typography.Link>
                        <Popconfirm title="Dừng chỉnh sửa?" onConfirm={cancel}>
                            <a>Trở lại</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <div>

                        <Button type="primary" ghost disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Chỉnh sửa
                        </Button>
                        {" "}
                        <Popconfirm title="Bạn chắc chắn xoá không?" onConfirm={() => handleDelete(record.id)}>
                            <Button type="" danger ghost >
                                Xoá
                            </Button>
                        </Popconfirm>
                    </div>


                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });


    return (
        <div>
            {/* new */}
            <div className="">
                {!addNew ?
                    <button onClick={() => setAddNew(!addNew)} type="button" className="relative w-[200px] flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   rounded-md bg-[#001529]  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out">
                        <PlusOutlined />
                        <span className="pl-2 mx-1" >Thêm mới</span>
                    </button>
                    :
                    <button onClick={() => {
                        setAddNew(!addNew)
                    }} type="button" className="relative w-[200px] flex justify-center items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   rounded-md bg-[#001529]  focus:outline-none   transition duration-300 transform active:scale-95 ease-in-out">
                        <CheckOutlined />
                        <span className="pl-2 mx-1" >Thêm mới</span>
                    </button>
                }
            </div>
            {addNew &&
                <div className="m-auto w-[30%]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='text-center'>Thêm mới danh mục</h1>
                        <div className="mt-5 bg-white shadow flex flex-col items-center space-y-3 p-3">
                            <input
                                placeholder="Nhập tên danh mục ở đây"
                                {...register("name", {
                                    required: "Không được để trống",
                                    pattern: {
                                        value: /^[a-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ/ ]+$/i,
                                        message: "Danh mục không được chứa số và kí tự đặc biệt"
                                    },
                                    minLength: {
                                        value: 5,
                                        message: "Cần nhập ít nhất 5 kí tự"
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Chỉ được nhập dưới 50 kí tự"
                                    }
                                })}
                                className=" text-white placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent  bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                            <ErrorMessage errors={errors} style={{ color: "red" }} name="name" as="p" />
                            <button type="submit" disabled={!isDirty && !isValid || categoryStatus.categories.sendRequest} className="flex items-center px-5 py-1.5 font-medium tracking-wide capitalize outline-none hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                                <span className="mx-1 text-gray-600 hover:text-white">Thêm</span>
                            </button>
                        </div>
                    </form>
                </div>
            }
            {/* list */}
            <div className='my-6'>
                <h1 className='text-center'>Danh sách danh mục</h1>
            </div>
            <div className='' >
                <Spin spinning={!categories.data && categoryStatus.categories.loading}>
                    <Form form={form} component={false}> 
                        <Table 
                            components={{
                                body: {
                                    cell: EditableCell
                                }
                            }}
                            columns={mergedColumns}
                            dataSource={datas}
                            pagination={{
                                pageSize: perPage,
                                total: totalPage,
                            }}
                            onChange={(page) => handleChange(page)}
                        />
                    </Form>
                </Spin>
            </div>
        </div>
    )
}

export default Categories