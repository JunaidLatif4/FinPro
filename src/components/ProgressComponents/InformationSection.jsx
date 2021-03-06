import React from 'react'

import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import './CSS/InformationSection.scss'

const AntTabs = withStyles({
    root: {
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        color: 'black',
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            "Cerebri Sans",
        ].join(','),
        '&:hover': {
            color: '#58d99b',
            opacity: 1,
        },
        '&$selected': {
            color: 'black',
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor: '#edf2f9',
            borderBottom: '2 px solid red',

        },
        '&:focus': {
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#edf2f9",
    },
    padding: {
        padding: theme.spacing(3),
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
    },
    demo2: {
        backgroundColor: 'white',
    },
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const InformationSevtion = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="informationsection_container">
                <div className={classes.root}>
                    <div className={classes.demo2}>
                        <AntTabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <AntTab label="Revenue" {...a11yProps(0)} />
                            <AntTab label="Spending" {...a11yProps(1)} />
                            <AntTab label="Cash Balance" {...a11yProps(2)} />
                        </AntTabs>
                    </div>

                    <TabPanel value={value} index={0}>
                        1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum dolore doloremque consequatur voluptas, dicta eveniet fugiat? Nihil sapiente magni ut quo reprehenderit enim ad sint quod atque a dolor in, nobis porro, perspiciatis, earum aspernatur minima esse. Saepe totam expedita at architecto ut, cumque assumenda culpa! Reiciendis numquam nulla blanditiis asperiores quaerat! Reiciendis, maxime impedit.
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum dolore doloremque consequatur voluptas, dicta eveniet fugiat? Nihil sapiente magni ut quo reprehenderit enim ad sint quod atque a dolor in, nobis porro, perspiciatis, earum aspernatur minima esse. Saepe totam expedita at architecto ut, cumque assumenda culpa! Reiciendis numquam nulla blanditiis asperiores quaerat! Reiciendis, maxime impedit.
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum dolore doloremque consequatur voluptas, dicta eveniet fugiat? Nihil sapiente magni ut quo reprehenderit enim ad sint quod atque a dolor in, nobis porro, perspiciatis, earum aspernatur minima esse. Saepe totam expedita at architecto ut, cumque assumenda culpa! Reiciendis numquam nulla blanditiis asperiores quaerat! Reiciendis, maxime impedit.
                    </TabPanel>
                </div>
            </div>
        </>
    )
}



export default InformationSevtion