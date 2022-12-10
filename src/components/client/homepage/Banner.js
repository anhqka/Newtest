import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = ({ banners }) => {
    const navigate = useNavigate()
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    const handleNavigate = (url) => {
        navigate(url)
    }
    
    return (
        <div className="w-[100%] m-auto">
            <Carousel showArrows={true} showThumbs={false} onChange={onChange} >

                {banners.map((banner,index) => {
                    return <div key={index} className="cursor-pointer md:h-[650px]" onClick={() => handleNavigate(banner.url)}>
                        <img src={banner.image}/>
                    </div>
                })}

            </Carousel>
        </div>
    )
}

export default Banner