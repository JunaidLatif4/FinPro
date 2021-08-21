import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlaidLink } from 'react-plaid-link';

import { Button, makeStyles } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CircularProgress from '@material-ui/core/CircularProgress';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import { AuthContext } from '../../context/context';

import './CSS/IntegrationsStep3.scss';

const Styles = makeStyles({
	btn: {
		backgroundColor: '#5ac2de',
		fontSize: '1rem',
	},
});

const getAccessToken = async (public_token, data, dispatch) => {

	let url = 'http://localhost:8080/get_access_token';

	axios.defaults.headers.common['authorization'] = `${localStorage.getItem('finProtoken')}`;
	await axios
		.post(url, { public_token: public_token, bank_data: data })
		.then((res) => {
			preTransectionget(res.data.access_token[0].access_token)
			dispatch({
				type: 'SET_ACCESS_TOKEN',
				payload: { access_token: res.data.access_token[0].access_token },
			});
			dispatch({
				type: 'SET_BUSINESS_MODEL',
				payload: { type: 'access_token', value: res.data.access_token },
			});
		})
		.catch((err) => {
			console.log('Something Went Wrong CREATE LINK TOKEN == ', err);
		});
};

const preTransectionget = async (t) => {
	let url = 'http://localhost:8080/get_transections';

	axios.defaults.headers.common['authorization'] = `${localStorage.getItem('finProtoken')}`;
	await axios
		.post(url, { access_token: t })
		.then((res) => {
		})
		.catch((err) => {
			console.log("Failed to Received PreTransection Data ===== ", err)
		})
}

const IntegrationsStep3 = () => {
	const { state, dispatch } = React.useContext(AuthContext);
	const classes = Styles();
	const [link_token, setLinkToken] = useState(null);
	const [publicToken, setPublicToken] = useState(null);

	useEffect(() => {
		let url = 'http://localhost:8080/create_link_token';
		axios.defaults.headers.common['authorization'] = `${localStorage.getItem('finProtoken')}`;
		axios
			.post(url)
			.then((res) => {
				console.log(res.data.link_token);
				setLinkToken(res.data.link_token);
			})
			.catch((err) => {
				console.log('SomeThing went wrong CREATING LINK TOKEN === ', err);
			});
	}, []);

	return (
		<>
			<div className='integrationsstep3_container'>
				<h2> Sync your company finances </h2>
				<div className='integration_btn'>
					{link_token == null ? (
						<>
							<CircularProgress color='inherit' />
						</>
					) : (
						<>
							{publicToken == null ? (
								<>
									<Button variant='outlined' className={classes.btn} endIcon={<ArrowRightIcon />}>
										<PlaidLink
											style={{ backgroundColor: 'inherit', border: 'none' }}
											token={link_token}
											onSuccess={(public_token, data) => {
												getAccessToken(public_token, data, dispatch);
												setPublicToken(public_token);
											}}>
											Connect Bank Account
										</PlaidLink>
									</Button>
								</>
							) : (
								<>
									<h3 style={{ fontSize: '2rem', margin: '0 2rem' }}> Connected </h3> <DoneAllIcon style={{ fontSize: '2rem', color: 'green' }} />
								</>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default IntegrationsStep3;