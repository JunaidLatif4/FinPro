import React from 'react'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';

import './CSS/Share.scss'


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
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
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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
        color: '#aaa',
        margin: '0 .5rem 0 0',

        '& svg': {
            fontSize: '2.5rem'
        }
    },
    formdiv:{
        display:'flex',
    },

    nestdiv:{
      border:"2px solid red",
      borderRadius:'10px',
      padding:'1rem 0',  
      '& input':{
        //   border:'none'
        fontSize:'1rem',
      }
    }
})




const Share = () => {
    const classes = MStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="share_container">
                <div>
                    <Button className={classes.btn} onClick={handleClickOpen}><ShareIcon /></Button>
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                            {/* <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                Modal title
                            </DialogTitle> */}
                            <DialogContent dividers>
                            <Typography >
                                <div className={classes.formdiv}>
                                    <div className={classes.nestdiv}>
                                    <input type="email" placeholder="Enter Emails"/>
                                    </div>
                                    <Button> Invite </Button>
                                </div>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                            </Typography>
                            <Typography gutterBottom>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                                lacus vel augue laoreet rutrum faucibus dolor auctor.
                            </Typography>
                            <Typography gutterBottom>
                                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                                scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                                auctor fringilla.
                            </Typography>
                        </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    Save changes
                                </Button>
                            </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default Share
