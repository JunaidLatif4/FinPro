import React from "react";

import { withStyles, makeStyles, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Dialog from "@material-ui/core/Dialog";
import NativeSelect from "@material-ui/core/NativeSelect";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ShareIcon from "@material-ui/icons/Share";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

import "./CSS/Share.scss";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const MStyles = makeStyles({
    btn: {
        color: "#aaa",
        margin: "0 .5rem 0 0",

        "& svg": {
            fontSize: "2.5rem",
        },
    },
    formdiv: {
        display: "flex",
        justifyContent: "center",
    },

    nestdiv: {
        border: "2px solid #5abcdc",
        borderRadius: "10px",
        padding: ".5rem .5rem",
        "& input": {
            margin: "0 5rem 0 1rem",
        },
    },
    invite_btn: {
        width: "15%",
        backgroundColor: "#5abcdc",
        fontWeight: "bold",
        fontFamily: "cerebri sans",
        padding: ".5rem 3.5rem",
        borderRadius: "1rem",
        fontSize: "1rem",
        margin: "0 1rem",
    },

    datadiv: {
        margin: "2.5rem 1rem",
    },
});

const ShareStyles = makeStyles({
    sharedata_container: {
        padding: "0 2rem",
        display: "flex",
        justifyContent: "space-between",
        "& input": {
            margin: "0 3rem 0 1rem",
        },
    },
});

const ShareDiv = ({ props }) => {
    const classes = ShareStyles();
    return (
        <>
            <div className={classes.sharedata_container}>
                <InputBase placeholder="Enter Email Junaid" />

                <NativeSelect
                    value="junaid"
                    name="age"
                    // onChange={handleChange}
                    disableUnderline
                >
                    <optgroup label="Full Control">
                        <option value={10}>Ten</option>
                    </optgroup>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                    <option value={"junaid"}>Junaid</option>
                </NativeSelect>
                <div>
                    <Button>
                        {" "}
                        <DeleteForeverOutlinedIcon />
                    </Button>
                </div>
            </div>
            <Divider />
        </>
    );
};

const Share = () => {
    const classes = MStyles();

    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState("junaid");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const ShareData = [
        {
            email: "junaidlatif@gmail.com",
            access: "full",
        },
        {
            email: "zahidghafoor40@gmail.com",
            access: "edit",
        },
        {
            email: "tayyabashraf47@gmail.com",
            access: "view",
        },
        {
            email: "amarayasin24@gmail.com",
            access: "full",
        },
    ];

    return (
        <>
            <div className="share_container">
                <div>
                    <Button className={classes.btn} onClick={handleClickOpen}>
                        <ShareIcon />
                    </Button>
                    <Dialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                    >
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Invite
                        </DialogTitle>
                        <DialogContent dividers>
                            <div className={classes.formdiv}>
                                <div className={classes.nestdiv}>
                                    <InputBase placeholder="Enter Email Junaid" />

                                    <NativeSelect
                                        value={age}
                                        name="age"
                                        onChange={handleChange}
                                        disableUnderline
                                    >
                                        <option value={10}>Ten</option>
                                        <option value={20}>Twenty</option>
                                        <option value={30}>Thirty</option>
                                        <option value={"junaid"}>Junaid</option>
                                    </NativeSelect>
                                </div>
                                <Button className={classes.invite_btn}> Invite </Button>
                            </div>

                            <div className={classes.datadiv}>
                                {
                                    ShareData.map((data, index) => {
                                        return (
                                            <>
                                                <ShareDiv />
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    );
};

export default Share;
