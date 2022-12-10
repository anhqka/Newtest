import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

const OrderSucess = ({ statistic }) => {
    console.log(statistic);
    const [data, setData] = useState([])

    useEffect(() => {
        setData(statistic)
    }, [statistic])

    const config = {
        data,
        xField: 'Month',
        yField: 'countBooking',
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            Month: {
                alias: 'Tháng',
            },
            countBooking: {
                alias: 'Số lượng',
            },
        },
        minColumnWidth: 20,
        maxColumnWidth: 20,
    };
    return (
        <Column {...config} />
    )
};

export default OrderSucess