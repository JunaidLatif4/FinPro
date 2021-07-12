import React from "react";

import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TimelineIcon from '@material-ui/icons/Timeline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


import "./CSS/MoneyBox.scss";

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

const MoneyBox = ({ props }) => {
  return (
    <>
      <div className="moneybox_container">
        <div className="textfield">
          <p> {props.title} </p>
          <div className="moneybox">
            <h3> $ {props.money} </h3>
            <p
              className={props.percent < 0 ? "warning" : null}
            > {props.percent}% </p>
          </div>
        </div>
        <div className="img">
          <props.icon style={{ color: "#aaa", fontSize: '2rem' }} />
        </div>
      </div>
    </>
  );
};

const MoneyBoxPage = () => {
  return (
    <>
      <div className="moneyforecast">
        {
          MoneyBoxForecastData.map((data, index) => {
            return (
              <>
                <MoneyBox key={index} props={data} />
              </>
            )
          })
        }
      </div>
    </>
  )
}

export default MoneyBoxPage;
