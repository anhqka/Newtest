import React from "react"

const Pledge = () => {
    return (
        <div class="container my-6 ">
            <div className="flex justify-between">
                <div className="text-left">
                    <h1 className="text-black uppercase text-xxl font-medium font-oswald">Hoàn tiền</h1>
                    <span></span>
                </div>
                <a href="#">Xem tất cả  </a>
            </div>
            <div class="hexagonContainer ">
                <div className=" flex flex-row gap-3">
                    <div class="hexagon-wrapper">
                        <div class="hexagon">
                            <i class="fab fa-facebook font-oswald ">7</i>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start flex-wrap w-[200px]">
                        <p className="text-black font-bold font-oswald  text-xl"> 7 ngày </p>
                        <p className="text-gray-500"> Bảo hành uốn nhuộm </p>
                    </div>
                </div>
                <div className=" flex flex-row gap-3">
                    <div class="hexagon-wrapper">
                        <div class="hexagon">
                            <i class="fab fa-facebook font-oswald">7</i>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start flex-wrap w-[200px]">
                        <p className="text-black font-bold text-xl font-oswald"> 7 ngày </p>
                        <p className="text-gray-500"> Bảo hành uốn nhuộm gì đấy content viết để xoá </p>
                    </div>
                </div>
                <div className=" flex flex-row gap-3">
                    <div class="hexagon-wrapper">
                        <div class="hexagon">
                            <i class="fab fa-facebook font-oswald">27</i>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start flex-wrap w-[200px]">
                        <p className="text-black font-bold text-xl font-oswald"> 27 ngày </p>
                        <p className="text-gray-500"> Bảo hành uốn nhuộm gì đấy content viết để xoá </p>
                    </div>
                </div>
                <div className=" flex flex-row gap-3">
                    <div class="hexagon-wrapper">
                        <div class="hexagon">
                            <i class="fab fa-facebook font-oswald">17</i>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start flex-wrap w-[200px]">
                        <p className="text-black font-bold text-xl font-oswald"> 17 ngày </p>
                        <p className="text-gray-500"> Bảo hành uốn nhuộm gì đấy content viết để xoá </p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Pledge