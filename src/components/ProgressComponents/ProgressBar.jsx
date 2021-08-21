import React from "react";

import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

import "./CSS/ProgressBar.scss";

const ProgressBar = ({ props }) => {
    return (
        <>
            <div className="progressbar_container">
                <h2> {props.title} </h2>
                <div className="progressbar_box">
                    <CircularProgressbarWithChildren
                        value={props.progress}
                        styles={buildStyles({
                            strokeLinecap: 'butt',
                            textSize: '16px',
                            pathTransitionDuration: 0.5,
                            pathColor: props.progress < 30 ? `red` : props.progress < 55 ? "#d9588c" : props.progress < 75 ? "#58b7d9" : "#58d99b",
                            textColor: '#f88',
                            backgroundColor: '#3e98c7',
                        })}
                    >
                        {props.progress}%
                    </CircularProgressbarWithChildren>
                </div>
                <div className="content">
                    {props.content()}
                </div>
            </div>
        </>
    );
};

export default ProgressBar;