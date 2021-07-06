import React from "react";

import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
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

    },
    circle: {
        width: 18,
        height: 18,
        // borderRadius: "50%",
        // backgroundColor: "#5ac2de",
        border:'2px solid #5ac2de'
    },
    completed: {
        color: "#5ac2de",
        zIndex: 1,
        fontSize: 18,
    },
    next: {
        color:'#5ac2de',
        backgroundColor: "currentColor",
        width: 18,
        height: 18,
        // zIndex: 1,
        // fontSize: 18,
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
                // <Check className={classes.completed} />
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
        backgroundColor:"#5ac2de"

    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const getSteps = () => {
    return ["Business Model", "Company Stage", "Integrations" , "Finish"];
};

function getStepContent(step) {
    switch (step) {
        case 0:
            return <BusStep1 />;
        case 1:
            return <ComStep2/>;
        case 2:
            return <IntStep3/>;
        case 3:
            return <FinStep4/>;
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

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
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
                        {activeStep === steps.length ? (
                            <div className="stepper_btn">
                                <Typography className={classes.instructions}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Button onClick={handleReset} className={classes.button}>
                                    Reset
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <div className="steps">
                                    <Typography className={classes.instructions}>
                                        {getStepContent(activeStep)}
                                    </Typography>
                                </div>
                                <div className="stepper_btn">
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default StepperBody;
