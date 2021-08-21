import React from 'react'

import Header from './Header'
import SideBar from './SideBar'
import Stepper from './Stepper'

import './CSS/Body.scss'

const Body = () => {
    return (
        <>
            <div className="body_container">
                <SideBar />
                <div className="body_box">
                    <Header />
                    <div className="data">
                        <h1> Let's get your company set up </h1>
                        <Stepper />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Body;