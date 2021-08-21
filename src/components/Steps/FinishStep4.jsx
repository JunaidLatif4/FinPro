import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../context/axios';

import { Button, makeStyles } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { AuthContext } from '../../context/context';

import './CSS/FinishStep4.scss';

const Styles = makeStyles({
	btn: {
		backgroundColor: '#5ac2de',
		fontSize: '1rem',
	},
});

const FinishStep4 = () => {
	const { state } = React.useContext(AuthContext);

	const classes = Styles();
	const history = useHistory();
	const [err, setErr] = React.useState('');

	const addCompany = async () => {
		try {
			let addCompany = await axios.post('/company', state.stepperData);
			if (addCompany.status === 200 || addCompany.status === 201) {
				history.push('/progress');
			}
		} catch (e) {
			if (e.response && e.response.data) {
				if (e.response.data.error) {
					setErr(e.response.data.error.message);
				} else {
					if (e.response.data.message) {
						setErr(e.response.data.message.message);
					}
				}
			} else {
				setErr(e.message);
			}
		}
	};

	return (
		<>
			<div className='finishstep4_container'>
				<h2> Success! 🎉 </h2>
				<div className='finish_btn'>
					<Button className={classes.btn} endIcon={<ArrowRightIcon />} onClick={() => addCompany()}>
						Go to Dashboard
					</Button>
				</div>
			</div>
		</>
	);
};
export default FinishStep4;