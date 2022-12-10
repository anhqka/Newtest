import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';

const OrderTotalSucces = ({ statistic }) => {
    console.log(statistic);
    const [data, setData] = useState([])

    useEffect(() => {
        setData(statistic)
    }, [statistic])

    const config = {
        data,
        xField: 'Month',
        yField: 'sumBooking',
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
            sumBooking: {
                alias: 'Tổng tiền',
            },
        },
        minColumnWidth: 20,
        maxColumnWidth: 20,
    };
    return (
        <Column {...config} />
    )
};

export default OrderTotalSucces