import React, { useState } from 'react'

import { NavLink } from 'react-router-dom'

import { Button, makeStyles, Divider } from '@material-ui/core'
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import PlaylistAddCheckOutlinedIcon from '@material-ui/icons/PlaylistAddCheckOutlined';
import FolderSharedOutlinedIcon from '@material-ui/icons/FolderSharedOutlined';


import ForecastsBarChart from './Forecasts Components/ForecastsBarChart'
import Sales from '../views/Sales/Sales'
import Marketing from '../views/Marketing/Marketing'
import RD from '../views/RandD/RandD'
import GA from '../views/GandA/GandA'

import './CSS/ForecastsPage.scss'

const Styles = makeStyles({

    link: {
        color: "black"
    },

    btn: {
        width: '15%',
        backgroundColor: '#5abcdc',
        borderRadius: '1rem',
        fontWeight: 'bold',
        fontFamily: 'cerebri sans',
        fontSize: '1rem',
        padding: '.8rem 1rem',
    }
})
const ForcastsPage = () => {
    const [component, setComponent] = useState("revenue")

    const ForecastNavBtn = ({ props }) => {
        const classes = Styles();

        const changeComponent = () => {
            setComponent(props.link)
        }
        return (
            <>
                {
                    props.link == 'reports' ?
                        <Button startIcon={props.icon} className={classes.btn} id="btn"> <NavLink to="/reports" className={classes.link}> {props.title} </NavLink> </Button> :
                        <Button onClick={changeComponent} startIcon={props.icon} className={classes.btn} id="btn"> {props.title} </Button>

                }
            </>
        )
    }


    const AllComponents = (active) => {
        switch (active) {
            case "revenue":
                return <ForecastsBarChart />;
            case "sales":
                return <Sales />;
            case "marketing":
                return <Marketing />;
            case "rd":
                return <RD />;
            case "ga":
                return <GA />;
            default:
                return <ForecastsBarChart />;
        }
    }

    const ForecastsNavBtnData = [
        {
            title: 'Revenue',
            link: "revenue",
            icon: <EqualizerIcon />
        },
        {
            title: 'Sales',
            link: "sales",
            icon: <ReceiptOutlinedIcon />
        },
        {
            title: 'Marketing',
            link: "marketing",
            icon: <HomeWorkOutlinedIcon />
        },
        {
            title: 'R & D',
            link: "rd",
            icon: <EqualizerIcon />
        },
        {
            title: 'G & A',
            link: "ga",
            icon: <PlaylistAddCheckOutlinedIcon />
        },
        {
            title: 'Reports',
            link: "reports",
            icon: <FolderSharedOutlinedIcon />
        },
    ]

    return (
        <>
            <div className="forcastspage_container">
                <div className="forcasts_nav">
                    {
                        ForecastsNavBtnData.map((data, index) => {
                            return (
                                <>
                                    <ForecastNavBtn key={index} props={data} />
                                </>
                            )
                        })
                    }
                </div>
                <Divider />
                {AllComponents(component)}
            </div>
        </>
    )
}

export default ForcastsPage