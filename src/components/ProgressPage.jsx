import React from "react";

import MoneyBox from './ProgressComponents/MoneyBox'
import ProgressBar from './ProgressComponents/ProgressBar'
import InformationSection from './ProgressComponents/InformationSection'

import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TimelineIcon from '@material-ui/icons/Timeline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Divider } from '@material-ui/core'


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

    const ProgressBarData = [
        {
            companyName: 'Finpro',
            title: "Revenue",
            progress: '80',
            industry: 'Finance',
            content: function () { return (` ${this.companyName} revenue is in the ${this.progress} percentile of ${this.industry} companies `) }
        },
        {
            companyName: 'Finpro',
            title: "Marketing Spend",
            progress: '60',
            industry: 'Finance',
            content: function () { return (` ${this.companyName} marketing spend is in the ${this.progress} percentile of ${this.industry} teams. `) }
        },
        {
            companyName: 'Finpro',
            title: "Sales Spend",
            progress: '50',
            industry: 'Finance',
            content: function () { return (` ${this.companyName} sales spend is in the ${this.progress} percentile of ${this.industry} teams. `) }
        },
        {
            companyName: 'Finpro',
            title: "R & D Spend",
            progress: '20',
            industry: 'Finance',
            content: function () { return (` ${this.companyName} R & D spend is in the ${this.progress} percentile of ${this.industry} teams. `) }
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
                    <h3>
                        How FinPro Compares
                    </h3>
                    <Divider />
                    <div className="progressbar">

                        {
                            ProgressBarData.map((data, index) => {
                                return (
                                    <>

                                        <ProgressBar props={data} />
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="information">
                        <h3> Benchmark Information  </h3>
                        <Divider/>
                        <InformationSection/>
                    </div>

                </div>

            </div>
        </>
    );
};

export default ProgressPage;
