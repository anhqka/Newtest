import { Rate } from "antd"
import { useSelector } from "react-redux";
import Slider from "react-slick";

const Footer = () => {

    const {socials} = useSelector(data => data.partials)

    let settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        initialSlide: 0,
        autoplay: true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplaySpeed: 2000,
                    pauseOnHover: true,
                    initialSlide: 0,
                    autoplay: true,
                    pauseOnHover: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    autoplaySpeed: 2000,
                    pauseOnHover: true,
                    initialSlide: 0,
                    autoplay: true,
                    pauseOnHover: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000,
                    pauseOnHover: true,
                    initialSlide: 0,
                    autoplay: true,
                    pauseOnHover: true,
                }
            },
        ]
    };


    return (
        <div className="bg-[#2C2D2C] mt-9">
            <div className="text-center my-3">
                <h3 className="text-[52px] mb-0  text-[#e4ca95]">Đánh giá</h3>
            </div>
            <div className="container">
                <Slider {...settings}>
                    <div className="p-6 text-center space-y-3 bg-[#e4ca95] border-solid border-[#2C2D2C] border-r-[25px] ml-[15px]">
                        <p className="mb-0">Nguyễn Nhật Anh</p>
                        <Rate value={5} />
                        <p className="mb-0">Anh kia đẹp trai, chị này xinh gái! Anh kia đẹp trai, chị này xinh gái Anh kia đẹp trai</p>
                    </div>
                    <div className="p-6 text-center space-y-3 bg-[#e4ca95] border-solid border-[#2C2D2C] border-r-[25px] ml-[15px]">
                        <p className="mb-0">Nguyễn Nhật Anh</p>
                        <Rate value={5} />
                        <p className="mb-0">Anh kia đẹp trai, chị này xinh gái! Anh kia đẹp trai, chị này xinh gái Anh kia đẹp trai</p>
                    </div>
                    <div className="p-6 text-center space-y-3 bg-[#e4ca95] border-solid border-[#2C2D2C] border-r-[25px] ml-[15px]">
                        <p className="mb-0">Nguyễn Nhật Anh</p>
                        <Rate value={5} />
                        <p className="mb-0">Anh kia đẹp trai, chị này xinh gái! Anh kia đẹp trai, chị này xinh gái Anh kia đẹp trai</p>
                    </div>
                    <div className="p-6 text-center space-y-3 bg-[#e4ca95] border-solid border-[#2C2D2C] border-r-[25px] ml-[15px]">
                        <p className="mb-0">Nguyễn Nhật Anh</p>
                        <Rate value={5} />
                        <p className="mb-0">Anh kia đẹp trai, chị này xinh gái! Anh kia đẹp trai, chị này xinh gái Anh kia đẹp trai</p>
                    </div>
                    <div className="p-6 text-center space-y-3 bg-[#e4ca95] border-solid border-[#2C2D2C] border-r-[25px] ml-[15px]">
                        <p className="mb-0">Nguyễn Nhật Anh</p>
                        <Rate value={5} />
                        <p className="mb-0">Anh kia đẹp trai, chị này xinh gái! Anh kia đẹp trai, chị này xinh gái Anh kia đẹp trai</p>
                    </div>
                </Slider>
            </div>

            <div className="container grid grid-cols-4 my-20 justify-start item-start">
                <div className="col-span-1">
                    <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png" alt="" />
                </div>
                <div className="col-span-1">
                    <ul>
                        <li className="text-[#e4ca95] text-[16px] font-serif list-none">Tìm kiếm địa chỉ gần nhất</li>
                        <li className="text-[#e4ca95] text-[16px] font-serif list-none">Đặt lịch ngay</li>
                        <li className="text-[#e4ca95] text-[16px] font-serif list-none">Liên hệ</li>
                    </ul>
                </div>
                <div className="col-span-1">
                    <ul>
                        <li className="text-[#e4ca95] text-[16px] font-serif list-none" >Tìm kiếm địa chỉ gần nhất</li>
                        <li className="text-[#e4ca95] text-[16px] font-serif list-none">Đặt lịch ngay</li>
                        <li className="text-[#e4ca95] text-[16px] font-serif list-none">Liên hệ</li>
                    </ul>
                </div>
                <div className="col-span-1 space-x-3">
                    {socials?.data?.data?.map((social, index) => {
                        return (
                                <a key={index} href={social.url}>
                                    <img className="w-6" src={social.image} alt="" />
                                </a>
                        )
                    })}
                </div>
            </div>
            <div className="text-center pb-3">
                <span className="text-[#e4ca95] text-sm font-serif list-none ">© 2022 Brothers Barber, All Rights Reserved.</span>
            </div>
        </div>
    )
}

export default Footer