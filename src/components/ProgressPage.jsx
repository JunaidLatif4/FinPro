import React from "react";

import MoneyBox from './ProgressComponents/MoneyBox'

import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TimelineIcon from '@material-ui/icons/Timeline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


import "./CSS/ProgressPage.scss";

const ProgressPage = () => {

    const MoneyBoxData = [
        {
            title: "MARKITING SPEND TO DATE",
            money: "789,000",
            percent: "+3.19",
            icon: TrendingUpIcon
        },
        {
            title: "REVENUE TO DATE",
            money: "8,384,210",
            percent: "+10.19",
            icon: EqualizerIcon
        },
        {
            title: "SALES SPEND TO DATE",
            money: "459,033",
            percent: "-4.29",
            icon: TimelineIcon
        },
        {
            title: "BANK BALANCE",
            money: "799,380",
            percent: "+9.30",
            icon: AttachMoneyIcon
        },
    ]

    return (
        <>
            <div className="progresspage_container">
                <div className="moneystatus">
                    {
                        MoneyBoxData.map((data, index) => {
                            return (
                                <>
                                    <MoneyBox key={index} props={data} />

                                </>
                            )
                        })
                    }
                </div>
                <div className="progresschart">

                </div>

            </div>
        </>
    );
};

export default ProgressPage;
