import { ClockCircleOutlined } from "@ant-design/icons";
import { Alert, InputNumber, Switch } from "antd"
import { useState } from "react";

const NotiOrders = () => {
    const [input, setInput] = useState()
    return (
        <>
            <div className="flex justify-between items-center py-3 ">
                <p className="text-[14px] mb-0">Thông báo cho anh trước khi cắt </p>
                <Switch
                    checked={input}
                    checkedChildren="Bật"
                    unCheckedChildren="Tắt"
                    onChange={() => {
                        setInput(!input);
                    }}
                />
            </div>
            {input &&
                <>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-3 ">
                        <InputNumber placeholder="Thống báo qua email cho anh trước mấy giờ..." style={{ width: '100%' }} prefix={<ClockCircleOutlined />} />
                        <InputNumber placeholder="Thống báo qua điện thoại cho anh trước mấy giờ..." style={{ width: '100%' }} prefix={<ClockCircleOutlined />} />
                    </div>
                    <div>
                        <Alert message="Ví dụ: Muốn nhận thống báo trước 3 giờ thì mời nhập: 3" type="info" showIcon />
                    </div>
                </>
            }


        </>
    )
}

export default NotiOrders