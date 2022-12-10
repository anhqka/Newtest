import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setOpenModalSignIn } from "page/client/Auth/AuthSlice"

const Auth = () => {
    const dispatch = useDispatch()
    return (
        <div className="bg-[#FFFDDF] p-3 flex flex-col justify-center items-center md:flex-row md:justify-between md:px-6">
            <p className="text-sm m-0 py-1">Đăng nhập để tích điểm mỗi khi đặt lịch anh nhé! </p>
            <button onClick={() => dispatch(setOpenModalSignIn(true))} className="bg-[#B4975A] outline-none text-white  border-none px-2 py-1 cursor-pointer">Đăng nhập</button>
        </div>
    )
}

export default Auth