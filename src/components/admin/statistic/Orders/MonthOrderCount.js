
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

const MonthOrderCount = ({orderCount}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        setData(orderCount)
    }, [orderCount])
    const config = {
        appendPadding: 10,
        data,
        angleField: 'countBooking',
        colorField: 'status',
        radius: 0.8,
        legend: false,
        label: {
            type: 'inner',
            offset: '-50%',
            style: {
                fill: '#fff',
                fontSize: 18,
                textAlign: 'center',
            },
        },
        pieStyle: ({ status }) => {
            if (status === 'success') {
                return {
                    fill: 'p(a)https://gw.alipayobjects.com/zos/antfincdn/FioHMFgIld/pie-wenli1.png',
                };
            }

            return {
                fill: 'p(a)https://gw.alipayobjects.com/zos/antfincdn/Ye2DqRx%2627/pie-wenli2.png',
            };
        },
        tooltip: false,
        interactions: [
            {
                type: 'element-single-selected',
            },
        ],
    };
    return <Pie {...config} />;
};

export default MonthOrderCount

