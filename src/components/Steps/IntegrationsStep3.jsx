import React from 'react'

import {Button , makeStyles} from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import './CSS/IntegrationsStep3.scss'

const Styles = makeStyles({
    btn:{
        backgroundColor:"#5ac2de",
        fontSize:'1rem'
    }
})

const IntegrationsStep3 = () => {
    const classes = Styles();

    return (
        <>
        <div className="integrationsstep3_container">
            <h2> Sync your company finances </h2>
            <div className="integration_btn">
                <Button className={classes.btn} endIcon={<ArrowRightIcon/>}> Connect Bank Account </Button>
            </div>
        </div>
        </>
    )
}

export default IntegrationsStep3
