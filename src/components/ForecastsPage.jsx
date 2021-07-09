import React from 'react'

import { Button, makeStyles, Divider } from '@material-ui/core'
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ReceiptOutlinedIcon from '@material-ui/icons/ReceiptOutlined';
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined';
import PlaylistAddCheckOutlinedIcon from '@material-ui/icons/PlaylistAddCheckOutlined';
import FolderSharedOutlinedIcon from '@material-ui/icons/FolderSharedOutlined';
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import TimelineIcon from '@material-ui/icons/Timeline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


import MoneyBoxForecast from './ProgressComponents/MoneyBox'
import ForecastsBarChart from './Forecasts Components/ForecastsBarChart'
import './CSS/ForecastsPage.scss'
const Styles = makeStyles({
    btn: {
        width: '15%',
        backgroundColor: '#5abcdc',
        fontWeight: 'bold',
        fontFamily: 'cerebri sans',
        padding: '.8rem 1rem',
        borderRadius: '1rem',
        fontSize: '1rem'
    }
})
const ForecastNavBtn = ({ props }) => {
    const classes = Styles();
    return (
        <>
            <Button startIcon={props.icon} className={classes.btn}> {props.title} </Button>
        </>
    )
}

const ForcastsPage = () => {

    const ForecastsNavBtnData = [
        {
            title: 'Revenue',
            icon: <EqualizerIcon />
        },
        {
            title: 'Sales',
            icon: <ReceiptOutlinedIcon />
        },
        {
            title: 'Marketing',
            icon: <HomeWorkOutlinedIcon />
        },
        {
            title: 'R & D',
            icon: <EqualizerIcon />
        },
        {
            title: 'G & A',
            icon: <PlaylistAddCheckOutlinedIcon />
        },
        {
            title: 'Reports',
            icon: <FolderSharedOutlinedIcon />
        },
    ]

    const MoneyBoxForecastData = [
        {
            title: "MARKITING SPEND FORECAST",
            money: "789,000",
            percent: "+3.19",
            icon: TrendingUpIcon
        },
        {
            title: "REVENUE FORECAST",
            money: "8,384,210",
            percent: "+10.19",
            icon: EqualizerIcon
        },
        {
            title: "SALES SPEND FORECAST",
            money: "459,033",
            percent: "-4.29",
            icon: TimelineIcon
        },
        {
            title: "STARTING CAPITAL",
            money: "799,380",
            percent: "+9.30",
            icon: AttachMoneyIcon
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
                <div className="moneyforecast">
                    {
                        MoneyBoxForecastData.map((data, index) => {
                            return (
                                <>
                                    <MoneyBoxForecast key={index} props={data} />
                                </>
                            )
                        })
                    }
                </div>
                <div className="forecastsbarchart">
                    <ForecastsBarChart/>
                </div>
            </div>
        </>
    )
}

export default ForcastsPage
