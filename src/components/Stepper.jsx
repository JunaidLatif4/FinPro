import React from "react";

import PropTypes from "prop-types";
import clsx from "clsx";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import BusStep1 from './Steps/BusinessModelStep1'
import ComStep2 from './Steps/CompanyStageStep2'
import IntStep3 from './Steps/IntegrationsStep3'
import FinStep4 from './Steps/FinishStep4'

import "./CSS/Stepper.scss";

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)",
    },
    active: {
        "& $line": {
            borderColor: "#5ac2de",
        },
    },
    completed: {
        "& $line": {
            borderColor: "#5ac2de",
        },
    },
    line: {
        borderColor: "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: "#eaeaf0",
        display: "flex",
        height: 22,
        alignItems: "center",
    },
    active: {
        color: "#5ac2de",
        backgroundColor: "#5ac2de",
        boxSizing: 'border-box'

    },
    circle: {
        width: 22,
        height: 22,
        border: '2px solid #5ac2de',
        boxSizing: 'border-box'

    },
    completed: {
        color: "#5ac2de",
        zIndex: 1,
        fontSize: 18,
    },
    next: {
        color: '#5ac2de',
        backgroundColor: "currentColor",
        width: 22,
        height: 22,
        boxSizing: 'border-box',
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? (
                <div className={classes.next} />

            ) : (
                <div className={classes.circle} />
            )}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    button: {
        marginRight: theme.spacing(1),
        fontSize: "1.1rem",
        padding: ".3rem 2rem",
        backgroundColor: "#5ac2de"

    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const getSteps = () => {
    return ["Business Model", "Company Stage", "Integrations", "Finish"];
};

function getStepContent(step) {
    switch (step) {
        case 0:
            return <BusStep1 />;
        case 1:
            return <ComStep2 />;
        case 2:
            return <IntStep3 />;
        case 3:
            return <FinStep4 />;
        default:
            return "Unknown step";
    }
}

const StepperBody = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <>
            <div className="stepper_container">
                <h1>Let's get your company set up</h1>
                <div className={classes.root}>
                    <Stepper
                        alternativeLabel
                        activeStep={activeStep}
                        connector={<QontoConnector />}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        <div className="steps">
                            <Typography className={classes.instructions}>
                                {getStepContent(activeStep)}
                            </Typography>
                        </div>
                        <div className="stepper_btn">
                            {
                                activeStep === steps.length - 1 ? null
                                    :
                                    <>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            Next
                                        </Button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};



export default StepperBody;