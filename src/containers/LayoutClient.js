import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import InfoChange from "components/client/update_customer/InfoChange"
import PasswordChange from "components/client/update_customer/PasswordChange"
import Auth from "page/client/Auth/Auth"
import { fetchCustomersAsyc } from "page/client/Auth/AuthSlice"
import Customer from "page/client/Customer/Customer"
import Footer from "page/client/Footer/Footer"
import Navbar from "./Navbar"

const LayoutClient = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCustomersAsyc())
    }, [])
    const {auth} = useSelector(data => data)
    
    return (
        <div>
            <div><Navbar auth={auth}/> </div>
            <div className="">
                <Outlet />
                <Auth auth={auth}/>
                <Customer auth = {auth}/>
                <InfoChange customer = {auth?.customerAuth?.user}/>
                <PasswordChange auth={auth}/>
            </div>
            <div><Footer /> </div>
        </div>
    )
}

export default LayoutClient