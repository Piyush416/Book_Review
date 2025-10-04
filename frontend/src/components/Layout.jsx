import React from 'react'
import Header from "./Header"
import { Outlet } from 'react-router-dom'
import Footer from "./Footer.jsx"


const Layout = () => {
    return (
        <>
            <Header />
            <div>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Layout
