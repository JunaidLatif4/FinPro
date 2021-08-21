import React, { useEffect } from "react";
import axios from 'axios';

import { withStyles, makeStyles, Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Dialog from "@material-ui/core/Dialog";
import Select from '@material-ui/core/Select';
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import ShareIcon from "@material-ui/icons/Share";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import CircularProgress from '@material-ui/core/CircularProgress';

import "./CSS/Share.scss";
import { useState } from "react";

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

const MStyles = makeStyles({
    btn: {
        color: "#aaa",
        margin: "0 0 0 0",

        "& svg": {
            fontSize: "2rem",
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

const ShareDiv = (props) => {
    const classes = ShareStyles();
    return (
        <>
            <div style={{ margin: '1rem 0' }}>
                <div className={classes.sharedata_container}>
                    <InputBase fullWidth value={props.data.email} />

                    <Select
                        value={props.data.access}
                        name="age"
                        // onChange={handleChange}
                        disableUnderline
                    >
                        <MenuItem value={"full"}>Full Access</MenuItem>
                        <ListSubheader>Can edit & share with others.</ListSubheader>
                        <MenuItem value={"edit"}>Can Edit</MenuItem>
                        <ListSubheader>Can edit but not share with others.</ListSubheader>
                        <MenuItem value={"view"}>Can View</MenuItem>
                        <ListSubheader>Cannot edit or share with others.</ListSubheader>
                    </Select>
                    <div>
                        <Button onClick={() => props.del(props.data._id)}>
                            <DeleteForeverOutlinedIcon />
                        </Button>
                    </div>
                </div>
                <Divider />
            </div>
        </>
    );
};

const Share = () => {
    const classes = MStyles();

    const [open, setOpen] = React.useState(false);

    const [prog, setProg] = useState(true)
    const [reload, setReload] = useState(true)

    const [invitesData, setInvitesData] = useState([])
    const [enteredData, setEnteredData] = useState({
        email: "",
        access: "full"
    })

    useEffect(async () => {
        let url = 'http://localhost:8080/getallinvites'

        axios.defaults.headers.common['authorization'] = `${localStorage.getItem('finProtoken')}`;
        await axios.get(url)
            .then((res) => {
                console.log("The INVITES DATA RECEIVED ==== ", res)
                setInvitesData([...res.data])
            }).catch((err) => {
                console.log('ERROR WHILE GETING INVITES DATA ======= ', err)
            })
    }, [reload])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const enteringData = (data) => {
        console.log(data.target.value)
        const { name, value } = data.target;
        setEnteredData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
        console.log("Hellow IM Here")
    }

    const del = async (id) => {
        alert(id)
        let url = "http://localhost:8080/delinvite"
        axios.defaults.headers.common['authorization'] = `${localStorage.getItem('finProtoken')}`;
        await axios.post(url, { id: id })
            .then((res) => {
                console.log("INVITE DELETED ====== ", res)
                setReload((preValue) => {
                    return (
                        !preValue
                    )
                })
            }).catch((err) => {
                console.log("ERROR WHILE DELETING ==== ", err)
            })
    }

    const savingInvites = async () => {
        console.log(enteredData)

        setProg(false)

        let url = 'http://localhost:8080/invite';
        axios.defaults.headers.common['authorization'] = `${localStorage.getItem('finProtoken')}`;
        await axios
            .post(url, { email: enteredData.email, access: enteredData.access })
            .then((res) => {
                console.log("Email SENDING-------", res);
                setReload((preValue) => {
                    return (
                        !preValue
                    )
                })
                setProg(true)
            })
            .catch((err) => {
                console.log('SomeThing went wrong while sending Email', err);
            });

        setEnteredData({
            email: "",
            access: "full"
        })
    }



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
                                    <InputBase placeholder="Enter Email " value={enteredData.email} name="email" onChange={enteringData} />

                                    <Select
                                        value={enteredData.access}
                                        name="access"
                                        onChange={enteringData}
                                        disableUnderline
                                    >
                                        <MenuItem value={"full"}>Full Access</MenuItem>
                                        <ListSubheader>Can edit & share with others.</ListSubheader>
                                        <MenuItem value={"edit"}>Can Edit</MenuItem>
                                        <ListSubheader>Can edit but not share with others.</ListSubheader>
                                        <MenuItem value={"view"}>Can View</MenuItem>
                                        <ListSubheader>Cannot edit or share with others.</ListSubheader>
                                    </Select>
                                </div>
                                {
                                    invitesData.length >= 5 ?
                                        <>
                                            <Button className={classes.invite_btn} disabled> Invite </Button>
                                        </> :
                                        <>
                                            {
                                                prog ?
                                                    <>
                                                        <Button className={classes.invite_btn} onClick={savingInvites}> Invite </Button>
                                                    </> :
                                                    <>
                                                        <div className={classes.invite_btn} style={{ padding: ".5rem 4rem .5rem 2rem" }}>
                                                            <CircularProgress style={{ color: "#58d99b", display: "flex", justifyContent: "center", alignItems: "center" }} />
                                                        </div>
                                                    </>
                                            }
                                        </>
                                }
                            </div>

                            <div className={classes.datadiv}>
                                {
                                    invitesData.map((data, index) => {
                                        return (
                                            <>
                                                <ShareDiv key="index" data={data} del={del} />
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