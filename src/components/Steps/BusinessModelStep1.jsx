import React, { useState } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { AuthContext } from '../../context/context';
import { getCompany } from '../../context/fetch-service';
import { useHistory } from 'react-router-dom';
import './CSS/BusinessModelStep1.scss';

const useStyles = makeStyles({
	root: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	icon: {
		width: 16,
		height: 16,
		boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
		backgroundColor: '#f5f8fa',
		'input:hover ~ &': {
			backgroundColor: '#ebf1f5',
		},
		'input:disabled ~ &': {
			boxShadow: 'none',
			background: 'rgba(206,217,224,.5)',
		},
	},
	checkedIcon: {
		backgroundColor: '#5ac2de',
		'input:hover ~ &': {
			backgroundColor: '#106ba3',
		},
	},
});

const StyledRadio = (props) => {
	const classes = useStyles();

	return <Radio className={classes.root} disableRipple color='default' checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />} icon={<span className={classes.icon} />} {...props} />;
};

const BusinessModelStep1 = () => {
	const [myCompany, setMyCompany] = React.useState(null);
	const history = useHistory();
	const { state, dispatch } = React.useContext(AuthContext);

	const BusinessModelData = ['SAAS', 'Marketplace', 'E-commerce', 'Usage is metered', 'CPG', 'Hardware'];

	// #########      FOR BACKEND     ########### //
	const [checkedData, setCheckedData] = useState();

	const enteringCheck = (event) => {
		setCheckedData(event.target.value);
		dispatch({
			type: 'SET_BUSINESS_MODEL',
			payload: { type: 'bussinessModel', value: event.target.value },
		});
	};

	React.useEffect(() => {
		getCompany()
			.then((company) => {
				setMyCompany(company);
				if (company !== null) {
					history.push('/progress');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<>
			<div className='businessmodelstep1_container'>
				<h2> Choose Your Business Model </h2>
				<div className='options'>
					<FormControl component='fieldset'>
						<RadioGroup defaultValue={state.stepperData.businessModel} aria-label='gender' name='customized-radios' onChange={enteringCheck}>
							{BusinessModelData.map((data, index) => {
								return (
									<>
										<FormControlLabel value={data} control={<StyledRadio />} label={data} />
									</>
								);
							})}
						</RadioGroup>
					</FormControl>
				</div>
			</div>
		</>
	);
};


export default BusinessModelStep1;