import { fetchPurchaseOrdersOfStylist, fetchRegisteredOrdersOfStylistAsync } from "page/admin/Order/OrderAdminSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { OrderMe } from "../../components/stylist/OrderMe"
import { useState } from "react"
import { Register } from "components/stylist/Register"
import { RegisteredOrders } from "components/stylist/RegisteredOrders"


const Order = () => {

  const dispatch = useDispatch()
  const [activedMenu, setActivedMenu] = useState([])
  const handleActiveMenu = (index) => {
    const checkActive = activedMenu && activedMenu.includes(index)
    !checkActive ? setActivedMenu([...activedMenu, index]) : setActivedMenu(activedMenu.filter(item => item != index))
  }

  const Order_Me = "order_me"
  const Received_Order = "received_order"
  const Register = "register"

  useEffect(() => {
    dispatch(fetchPurchaseOrdersOfStylist())
  }, [])

  useEffect(() => {
    dispatch(fetchRegisteredOrdersOfStylistAsync())
  }, [])

  const { data } = useSelector(data => data?.ordersAdmin?.ordersOfStylist)
  const [screen, setScreen] = useState(Order_Me)

  return (
    <div>
      <div className="flex justify-between mx-3">
        <p onClick={() => setScreen(Received_Order)} className={`${screen === Received_Order ? 'bg-orange-500' : "bg-orange-200" } w-[33%] h-[40px]  text-white text-[18px] font-sans  flex items-center justify-center   border-solid border-b-[0.5px] border-[#f2f2f2] cursor-pointer`}>Lịch đăng ký</p>
        <p onClick={() => setScreen(Order_Me)} className={`${screen === Order_Me ? 'bg-orange-500' : "bg-orange-200" } w-[33%] h-[40px]  text-white text-[18px] font-sans  flex items-center justify-center   border-solid border-b-[0.5px] border-[#f2f2f2] cursor-pointer`}>Lịch làm</p>
        <p onClick={() => setScreen(Register)} className={`${screen === Register ? 'bg-orange-500' : "bg-orange-200" } w-[33%] h-[40px]  text-white text-[18px] font-sans  flex items-center justify-center   border-solid border-b-[0.5px] border-[#f2f2f2] cursor-pointer`}>Đăng ký</p>
      </div>
      {screen === Order_Me && <OrderMe data={data} handleActiveMenu={handleActiveMenu} activedMenu={activedMenu} />}
      {screen === Received_Order && <RegisteredOrders /> }
      {screen === Register && <Register /> }
    </div>

  )
}

export default Order