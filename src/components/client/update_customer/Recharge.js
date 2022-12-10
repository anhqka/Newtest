import { Button, Image, message, Modal } from "antd"
import React, { useState } from 'react';
import { Collapse, Space } from 'antd';
import { BankOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { setOpenRecharge } from "page/client/Auth/AuthSlice";

const { Panel } = Collapse;
const iconMomo = <svg viewBox="6.7169296377637995 5.309796557160162 81.4130703622362 74.62020344283985" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><rect fill="#a50064" height="87" rx="12.06" width="96" /><path d="M71 7.07c-9.45 0-17.11 7.36-17.11 16.43S61.57 39.93 71 39.93s17.13-7.36 17.13-16.43S80.47 7.07 71 7.07zm0 23.44a7.14 7.14 0 0 1-7.27-7 7.28 7.28 0 0 1 14.54 0 7.14 7.14 0 0 1-7.27 7zm-22-11.1V40h-9.88V19.31a2.9 2.9 0 0 0-5.8 0V40h-9.84V19.31a2.9 2.9 0 0 0-5.8 0V40H7.87V19.41A12.62 12.62 0 0 1 20.72 7.07a13.11 13.11 0 0 1 7.7 2.48 13.14 13.14 0 0 1 7.69-2.48A12.63 12.63 0 0 1 49 19.41zM71 47c-9.45 0-17.11 7.35-17.11 16.43S61.57 79.89 71 79.89s17.11-7.35 17.11-16.42S80.47 47 71 47zm0 23.44a7 7 0 1 1 7.27-7A7.14 7.14 0 0 1 71 70.48zM49 59.38v20.55h-9.88V59.27a2.9 2.9 0 0 0-5.8 0v20.66h-9.84V59.27a2.9 2.9 0 0 0-5.8 0v20.66H7.87V59.38A12.61 12.61 0 0 1 20.72 47a13.17 13.17 0 0 1 7.7 2.47A13.11 13.11 0 0 1 36.11 47 12.62 12.62 0 0 1 49 59.38z" fill="#fff" /></svg>

const Recharge = ({ auth }) => {
    const dispatch = useDispatch()
    const handleShowModal = () => {
        dispatch(setOpenRecharge(false))
    }

    const copyCodeRecharge = (code) => {
        navigator.clipboard.writeText(code)
        message.success("Đã sao chép!")
    }
    return (
        <Modal
            title="Chọn hình thức nạp tiền"
            centered
            open={auth.openRecharge}
            onOk={handleShowModal}
            onCancel={handleShowModal}
            width={700}
            footer={null}
        >
            <Space direction="vertical">
                <Collapse className="md:w-[650px] w-[315px]"
                    expandIcon={({ isActive }) => isActive ? <BankOutlined /> : <BankOutlined />}
                    collapsible="icon" defaultActiveKey={['1']}>
                    <Panel header={<p className="mb-0">Nạp tiền qua chuyển khoản ngân hàng</p>} key="1">
                        <div>
                            <p>Quý khách vui lòng chuyển khoản với thông tin dưới đây!</p>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <p className="mb-0">Số tài khoản: 02128197777</p>
                            <p className="mb-0">Chủ tài khoản: Nguyễn Nhật Anh</p>
                            <p className="mb-0">Ngân hàng: TP Bank</p>
                            <p className="mb-0 ">Nội dung chuyển khoản: <span className="font-semibold">naptien {auth?.customerAuth?.user?.id}</span></p>
                            <div className="flex justify-center">
                                <button className='font-sans bg-[#B4975A] text-white border-none hover:text-gray-500 cursor-pointer px-3 py-1 break-wordsx' onClick={() => copyCodeRecharge(`naptien ${auth?.customerAuth?.user?.id}`)}>Sao chép</button>
                            </div>
                            <div className="bg-[#ffe29f] p-1">
                                <p className="mb-0 text-red-600">Bạn nên nhấn vào nút "Sao chép" rồi dán vào nội dung chuyển khoản để tránh việc nhầm lẫn. Hệ thống sẽ cập nhật số dư cho bạn trong vòng 3-5 phút sau khi bạn chuyển khoản thành công. Xin Cảm ơn!</p>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
                <Collapse className="md:w-[650px] w-[315px]"
                    expandIcon={({ isActive }) => isActive ? iconMomo : iconMomo}
                    collapsible="icon" defaultActiveKey={['1']}>
                    <Panel header={<p className="mb-0">Nạp tiền qua ví MOMO</p>} key="2">
                        <div>
                            <p>Quét mã QR bên dưới từ app MOMO hoặc chuyển tiền về số điện thoại: <br /> <span>0971145489 - Nguyễn Nhật Anh</span>.</p>
                            <p>Lời nhắn: <span className="font-semibold"> naptien {auth?.customerAuth?.user?.id} </span></p>
                        </div>
                        <div className="md:w-[30%] m-auto">
                            <div className="">
                                <Image src="https://scontent.xx.fbcdn.net/v/t1.15752-9/317607187_1503767446695275_579842934867809005_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=aee45a&_nc_ohc=U-W4X5o1ek4AX8MJVfQ&_nc_oc=AQkiqUWanLypUBbUqKqrT8k41ryuweYcpj5YTiGwlu2HXWxgGqRgbDyP8prDU5q2NjpokgygsN9CiPXbicmmDd2w&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdS1jdV62F_EL_RMT_bc8BGg2qtdcxMoZ2wL-ci4cJ4vUA&oe=63B11175" alt="" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1 mt-3 items-center">
                            <button className='font-sans bg-[#B4975A] text-white border-none hover:text-gray-500 cursor-pointer px-3 py-1 break-wordsx' onClick={() => copyCodeRecharge(`naptien ${auth?.customerAuth?.user?.id}`)}>Sao chép</button>
                            <div className="bg-[#ffe29f] p-1">
                                <p className="mb-0 text-red-600">Bạn nên nhấn vào nút "Sao chép" rồi dán vào nội dung chuyển khoản để tránh việc nhầm lẫn. Hệ thống sẽ cập nhật số dư cho bạn trong vòng 3-5 phút sau khi bạn chuyển khoản thành công. Xin Cảm ơn!</p>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
            </Space>
        </Modal>
    )
}

export default Recharge