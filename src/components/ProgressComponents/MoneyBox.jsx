import React from "react";

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
          <props.icon style={{ color: "#aaa", fontSize: 'inherit' }} />
        </div>
      </div>
    </>
  );
};


export { MoneyBox };