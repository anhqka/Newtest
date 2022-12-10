import Slider from "react-slick";
import { Image } from "antd";
import React, { useState } from "react";

const TrendingServices = () => {

    let settings = {
        infinite: true,
        slidesToShow: 6,
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
                    slidesToShow: 5,
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
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000,
                    pauseOnHover: true,
                    initialSlide: 0,
                    autoplay: true,
                    pauseOnHover: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000,
                    pauseOnHover: true,
                    infinite: true,
                    initialSlide: 0,
                    autoplay: true,
                    pauseOnHover: true,
                }
            }
        ]
    };

    return (
        <div className="mt-9">
            <div className="container">
                <h1 className="text-black uppercase text-xxl mb-6 font-medium font-oswald text-left">Kiểu tóc thịnh hành tháng</h1>
            </div>
            <div className="container">
                <Slider {...settings}>
                    <div className="ml-[15px]">

                        <Image
                            width={170}
                            height={170}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                    <div className="ml-[15px]">
                        <Image
                            width={170}
                            height={170}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
                        />
                    </div>

                    <div className="ml-[15px]">
                        <Image
                            width={170}
                            height={170}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                    <div className="ml-[15px]">
                        <Image
                            width={170}
                            height={170}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                    <div className="ml-[15px]">
                        <Image
                            width={170}
                            height={170}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                    <div className="ml-[15px]">
                        <Image
                            width={170}
                            height={170}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                    <div className="ml-[15px]">
                        <Image
                            width={170}
                            height={170}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>

                </Slider>
            </div>

        </div>

    )
}

export default TrendingServices
