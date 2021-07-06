import React from 'react'

import { Button , makeStyles } from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import './CSS/FinishStep4.scss'

const Styles = makeStyles({
    btn:{
        backgroundColor:"#5ac2de",
        fontSize:"1rem"
    }
})

const FinishStep4 = () => {
    const classes = Styles()

    return (
        <>
            <div className="finishstep4_container">
                <h2> Success! 🎉 </h2>
                <div className="finish_btn">
                    <Button className={classes.btn} endIcon={<ArrowRightIcon/>} > Go to Dashboard </Button>
                </div>
            </div>
        </>
    )
}

export default FinishStep4
