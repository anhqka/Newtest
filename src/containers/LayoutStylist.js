import React, { useState } from "react"
import { Outlet } from "react-router-dom"

const LayoutStylist = () => {
    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div>
  <header className="">
     <nav
        className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          px-4
          text-lg text-gray-700
          bg-white
          fixed 
          z-50
        "
      >
       <div>
            <img width={50} src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png" />          
        </div>
       
         <svg
            onClick={() => setOpenMenu(!openMenu)}
            xmlns="http://www.w3.org/2000/svg"
            id="menu-button"
            className="h-6 w-6 cursor-pointer md:hidden block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
       
       <div className={`${!openMenu && "hidden"} w-full md:flex md:items-center md:w-auto `} id="menu">
          <ul
            className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0 "
          >
            <li className="text-center list-none">
              <a className="md:p-4 py-2 block hover:text-purple-400 " href="#"
                >Đơn đặt</a
              >
            </li>
            <li className="text-center list-none"s>
              <a
                className="md:p-4 py-2 block hover:text-purple-400 text-purple-500"
                href="#"
                >Đăng xuất</a
              >
            </li>
          </ul>
        </div>
    </nav>
  </header>
  
  <div className="relative top-[80px] md:top-[105px] z--1">
        <Outlet />
    </div>
</div>
    )
}

export default LayoutStylist