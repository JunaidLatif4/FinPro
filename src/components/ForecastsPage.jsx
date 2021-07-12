import React from 'react'

import { Switch , Route , NavLink} from 'react-router-dom'

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
    btn: {
        width: '15%',
        backgroundColor: '#5abcdc',
        fontWeight: 'bold',
        fontFamily: 'cerebri sans',
        padding: '.8rem 1rem',
        borderRadius: '1rem',
        fontSize: '1rem',
        '& a':{
            color:"black"
        }
    }
})
const ForecastNavBtn = ({ props }) => {
    const classes = Styles();
    return (
        <>
            <Button startIcon={props.icon} className={classes.btn}><NavLink to={`/forecasts/${props.link}`} > {props.title}  </NavLink></Button>
           
        </>
    )
}

const ForcastsPage = () => {

    const ForecastsNavBtnData = [
        {
            title: 'Revenue',
            link:"revenue",
            icon: <EqualizerIcon />
        },
        {
            title: 'Sales',
            link:"sales",
            icon: <ReceiptOutlinedIcon />
        },
        {
            title: 'Marketing',
            link:"marketing",
            icon: <HomeWorkOutlinedIcon />
        },
        {
            title: 'R & D',
            link:"rd",
            icon: <EqualizerIcon />
        },
        {
            title: 'G & A',
            link:"ga",
            icon: <PlaylistAddCheckOutlinedIcon />
        },
        {
            title: 'Reports',
            link:"reports",
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
                <switch>
                    <Route exact path="/forecasts/revenue" component={ForecastsBarChart}/>
                    <Route exact path="/forecasts/sales" component={Sales}/>
                    <Route exact path="/forecasts/marketing" component={Marketing}/>
                    <Route exact path="/forecasts/rd" component={RD}/>
                    <Route exact path="/forecasts/ga" component={GA}/>
                </switch>
                
            </div>
        </>
    )
}

export default ForcastsPage
