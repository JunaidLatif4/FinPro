import React from 'react';
import Profile from '../../assets/profile.png';
import { AuthContext } from '../../context/context';
import axios, { BASE_URL } from '../../context/axios';
function GrowthRates({setMsg, setErr, setAlertClass}) {
	const {
		// state: { user },
		state,
		dispatch,
	} = React.useContext(AuthContext);
	let { user } = state;
	const [growthRate, setGrowthRate] = React.useState({
		grate: user ? user.grate : '',
	});

	//const [alertClass, setAlertClass] = React.useState('');
	//const [msg, setMsg] = React.useState('');
	//const [err, setErr] = React.useState('');
	const [loader, setLoader] = React.useState(false);

	const handleSetting = (e) => {
		const { name, value } = e.target;
		setGrowthRate((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};



	const handleSubmit = async (e) => {
		setLoader(true);
		e.preventDefault();
		try {
			let update = await axios.patch('/setting', growthRate);
			if (update.status === 200) {
				let user = await axios.get('/user');
				if (user.status === 200) {
					setErr('');
					setAlertClass('show');
					setGrowthRate({
						grate: user ? user.grate : '',
					});
					dispatch({
						type: 'SET_USER',
						payload: user.data.user,
					});
					setMsg(update.data.message);
					setLoader(false);
				}
				window.location.reload();
			}
		} catch (e) {
			setAlertClass('show');
			setMsg('');
			if (e.response && e.response.data) {
				if (e.response.data.error) {
					setErr(e.response.data.error.message);
				} else {
					setErr(e.response.data.message);
				}
			} else {
				setErr(e.message);
			}
			setLoader(false);
		}
	};
	const handleCloseAlert = () => {
		setAlertClass('hide');
		setErr('');
		setMsg('');
	};

	return (
		<div className='container'>
					<form onSubmit={handleSubmit}>
						<div className='mt-5 mb-5'></div>
								<div className='form-group'>
									<label className='form-label'>Yearly revenue growth variable (%)</label>
									<input type='number' className='form-control mb-3' name='grate' value={growthRate.grate} onChange={handleSetting} required placeholder='50' />
									<button disabled={loader} className='btn btn-custom btn-padd'>
										{loader && (
											<div className='spinner-border spinner-border-sm' role='status'>
												<span className='sr-only'>Loading...</span>
											</div>
										)}
										{!loader && 'Save changes'}
									</button>
								</div>
					</form>
		</div>
	);
}

export default GrowthRates;
