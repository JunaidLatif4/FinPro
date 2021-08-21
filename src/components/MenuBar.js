import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { AuthContext } from '../context/context';

import { Button } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import TrendingUpOutlinedIcon from '@material-ui/icons/TrendingUpOutlined';
import SettingsIcon from '@material-ui/icons/Settings';

import Share from './Menu Components/Share';

import LOGO from '../assets/logo-black.png';
import { Dropdown } from 'react-bootstrap';
import Profile from '../assets/profile.png';
import { getCompany } from '../context/fetch-service';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		marginLeft: drawerWidth,
		background: '#fff',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		overflow: 'hidden',
		background: '#000',
		color: '#000',
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		paddingTop: '80px',
		overflow: 'hidden',
	},
	TopNav: {
		width: '100%',
		marginLeft: '0rem',
		marginRight: '0rem',
	},
	Logo: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '1rem',
	},
	MENU: {
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'space-around',
		color: 'blue',
	},
	ProfileIcon: {
		cursor: 'pointer',
		'& img': {
			width: '2.5rem',
			height: '2.5rem',
			border: '2px solid #4b54b4',
			borderRadius: '50%',
		},
	},
	btn: {
		color: '#aaa',
		margin: '0 .7rem 0 0',

		'& svg': {
			fontSize: '2rem',
		},
	},
}));

function MenuBar(props) {
	const history = useHistory();
	const classes = useStyles();
	const {
		state: { user, isAuthenticated, access_token },
		dispatch,
	} = React.useContext(AuthContext);

	const [myCompany, setMyCompany] = React.useState(null);

	const handleLogout = () => {
		dispatch({
			type: 'LOGOUT',
		});
		history.push('/login');
	};

	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<span
			className={classes.ProfileIcon}
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}>
			{/* Render custom icon here */}
			{children}
		</span>
	));
	React.useEffect(() => {
		getCompany()
			.then((company) => {
				setMyCompany(company);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	React.useEffect(() => {
		getCompany()
			.then((company) => {
				setMyCompany(company);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div className={classes.root}>
			<AppBar style={isAuthenticated ? { width: `calc(100% - ${drawerWidth}px)` } : { width: '100%' }} className={classes.appBar}>
				<Toolbar>
					<div style={{ flexGrow: 1 }}></div>
					<Share />
					<Button className={classes.btn}>
						<SettingsIcon />
					</Button>
					<Dropdown>
						<Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
							<img src={user && user.profile ? `${user.profile}` : Profile} alt='user profile' />
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item>{user && user.firstName && user.lastName ? user.firstName + ' ' + user.lastName : user.email}</Dropdown.Item>
							<Dropdown.Divider></Dropdown.Divider>
							<Dropdown.Item as={Link} to='/settings'>
								Settings
							</Dropdown.Item>
							<Dropdown.Item as={Link} to='/billing'>
								Billing
							</Dropdown.Item>
							<Dropdown.Item as={Link} to='/pricing'>
								Pricing
							</Dropdown.Item>
							<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Toolbar>
			</AppBar>

			<Drawer
				className={classes.drawer}
				variant='permanent'
				classes={{
					paper: classes.drawerPaper,
				}}
				anchor='left'>
				<div className={[classes.toolbar, classes.Logo].join(' ')}>
					<Link to='/'>
						<img src={LOGO} alt='logo-black' />
					</Link>
				</div>

				<ul className={[classes.TopNav, 'navbar-nav'].join(' ')}>
					<li className='nav-item'>
						<NavLink className='nav-link' activeClassName='active' to='/progress'>
							<DonutLargeIcon /> Dashboard
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-link' activeClassName='active' to='/forecasts'>
							<TrendingUpOutlinedIcon /> Forecasts
						</NavLink>
					</li>
					<li className='nav-item'>
						<NavLink className='nav-link' activeClassName='active' to='/reports'>
							<i className='fe fe-folder'></i> Reports
						</NavLink>
					</li>
				</ul>
			</Drawer>
			<main className={classes.content}>{props.children}</main>
		</div>
	);
}

export default MenuBar;