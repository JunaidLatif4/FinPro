import React from "react";

import TrendingUpIcon from "@material-ui/icons/TrendingUp";

import "./CSS/MoneyBox.scss";

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
          <props.icon style={{ color: "#aaa" , fontSize:'2rem' }} />
        </div>
      </div>
    </>
  );
};

export default MoneyBox;
