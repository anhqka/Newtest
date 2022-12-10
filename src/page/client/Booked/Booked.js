import { Modal } from "antd";

const Booked = () => {
    const countDown = () => {
        let secondsToGo = 10;
        const modal = Modal.success({
          title: 'Vui lòng đợi barber một chút!',
        })
        const timer = setInterval(() => {
          secondsToGo -= 1;
          modal.update({
            content: `Chúc quý khách một ngày tốt lành! Quý khách sẽ được điều hướng đến trang thanh toán trong khoảng  ${secondsToGo} giây. Xin cảm ơn!`,
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(timer);
          modal.destroy()
        }, secondsToGo * 1000);
    };

    countDown()
    return (
        <div> Theo dõi đơn hàng </div>
    )
}

export default Booked