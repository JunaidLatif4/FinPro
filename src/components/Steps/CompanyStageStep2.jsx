import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { AuthContext } from '../../context/context';

import './CSS/CompanyStageStep2.scss';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const CompanyStageStep2 = () => {
	const { dispatch } = React.useContext(AuthContext);
	const classes = useStyles();

	// ##########   FOR BACKEND   ######### //
	const [selectionData, setSelectionData] = React.useState({
		revenue: '',
		employess: '',
	});

	const enteringSelection = (event) => {
		const { name, value } = event.target;

		setSelectionData((preValue) => {
			return {
				...preValue,
				[name]: value,
			};
		});
	};

	React.useEffect(() => {
		dispatch({
			type: 'SET_BUSINESS_MODEL',
			payload: {
				type: 'companyStage',
				value: {
					revenue: selectionData.revenue,
					noOfEmployess: selectionData.employess,
				},
			},
		});
	}, [selectionData.employess]);

	return (
		<>
			<div className='companystagestep2_container'>
				<h2> What's your company stage ?</h2>
				<div className='selection'>
					<FormControl variant='outlined' className={classes.formControl}>
						<InputLabel id='demo-simple-select-outlined-label'>Revenue</InputLabel>
						<Select labelId='demo-simple-select-outlined-label' id='demo-simple-select-outlined' value={selectionData.revenue} name='revenue' onChange={enteringSelection} label='Revenue'>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
							<MenuItem value={'10'}>Ten</MenuItem>
							<MenuItem value={'20'}>Twenty</MenuItem>
							<MenuItem value={'30'}>Thirty</MenuItem>
						</Select>
					</FormControl>
					<FormControl variant='outlined' className={classes.formControl}>
						<InputLabel id='demo-simple-select-outlined-label'>Number of Employess</InputLabel>
						<Select labelId='demo-simple-select-outlined-label' id='demo-simple-select-outlined' value={selectionData.employess} name='employess' onChange={enteringSelection} label='Number of Employess'>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>
							<MenuItem value={'10'}>Ten</MenuItem>
							<MenuItem value={'20'}>Twenty</MenuItem>
							<MenuItem value={'30'}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>
		</>
	);
};


export default CompanyStageStep2;