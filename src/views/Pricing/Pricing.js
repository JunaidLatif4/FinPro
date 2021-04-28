import React from 'react';
import { getUserPaymentMethods, getUserPurchasing } from '../../context/fetch-service';
import { AuthContext } from '../../context/context';
import { useHistory } from 'react-router-dom';
import { subscription, cancelSubscription } from '../../context/subscription-service';
import { set } from 'numeral';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { addPayment } from '../../context/payment-service';
const planlist = ['SaaS business Model', 'Input Variables', 'Charts', 'Reports', '7-day free trial'];

function Pricing() {
	const { meta, wrapperProps, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs();
	const history = useHistory();
	const {
		state: { user, billingDetails, purchasing, isAuthenticated },
		dispatch,
	} = React.useContext(AuthContext);

	const userSub = purchasing && purchasing.length > 0 ? purchasing : [];

	const [alertErrOpen, setAlertErrOpen] = React.useState(false);
	const [loader, setLoader] = React.useState(false);
	const [loaderFor, setLoaderFor] = React.useState('');
	const [alertClass, setAlertClass] = React.useState('');
	const [msg, setMsg] = React.useState('');
	const [err, setErr] = React.useState('');
	const [open, setOpen] = React.useState(false);

	const [msg2, setMsg2] = React.useState('');
	const [err2, setErr2] = React.useState('');

	const [paymentForm, setPaymentForm] = React.useState({
		city: '',
		state: '',
		address: '',
		cardNumber: '',
		expiryDate: '',
		cvc: '',
	});

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = (e) => {
		e.preventDefault();
		setOpen(false);
		setPaymentForm({
			address: '',
			city: '',
			state: '',
			cardNumber: '',
			expiryDate: '',
			cvc: '',
		});
		setErr('');
		setMsg('');
		setErr2('');
		setMsg2('');
	};

	React.useEffect(() => {
		if (!isAuthenticated) {
			history.push('/login');
		}
		async function fetchRevenue() {
			let billings = await getUserPaymentMethods();
			dispatch({
				type: 'SET_BILLING',
				payload: billings,
			});
			let purchasing = await getUserPurchasing();
			dispatch({
				type: 'SET_PURCHASING',
				payload: purchasing,
			});
		}
		fetchRevenue();
	}, [isAuthenticated, history, dispatch]);

	const handleCloseAlert = () => {
		setAlertClass('hide');
		setAlertErrOpen('');
		setMsg('');
		setErr('');
	};

	const giveAlert = () => {
		setAlertClass('show');
		setAlertErrOpen('Please add payment details first');
	};

	const addSubscription = async (e, startTrial) => {
		e.preventDefault();
		setLoaderFor(startTrial ? 'trial' : 'sub');
		if (!startTrial && billingDetails.length === 0) {
			giveAlert();
			setLoaderFor('');
			return;
		}

		setLoader(true);
		try {
			let sub = await subscription(startTrial);
			if (sub.status === 200 || sub.status === 201) {
				let billings = await getUserPaymentMethods();
				dispatch({
					type: 'SET_BILLING',
					payload: billings,
				});
				let purchasing = await getUserPurchasing();
				dispatch({
					type: 'SET_PURCHASING',
					payload: purchasing,
				});

				setAlertClass('show');
				setMsg(sub.data.message);
				setErr('');
				setLoader(false);
				setLoaderFor('');
			}
		} catch (err) {
			setAlertClass('show');
			setMsg('');
			console.log(err);
			if (err.response && err.response.data) {
				if (err.response.data.error) {
					if (err.response.data.error && err.response.data.error.raw) {
						setErr(err.response.data.error.raw.message);
					} else {
						setErr(err.response.data.error.message);
					}
				} else if (err.response.data.errors) {
					let errors = err.response.data.errors.map((err) => <li>{err.msg}</li>);
					setErr(errors);
				} else {
					setErr(err.response.data.message);
				}
			} else {
				setErr(err.message);
			}
			setLoader(false);
			setLoaderFor('');
		}
	};
	const cancelUserSubscription = async (e) => {
		e.preventDefault();
		setLoader(true);
		setLoaderFor('cancel');
		try {
			let sub = await cancelSubscription();
			if (sub.status === 200 || sub.status === 201) {
				let billings = await getUserPaymentMethods();
				dispatch({
					type: 'SET_BILLING',
					payload: billings,
				});
				let purchasing = await getUserPurchasing();
				dispatch({
					type: 'SET_PURCHASING',
					payload: purchasing,
				});

				setAlertClass('show');
				setMsg(sub.data.message);
				setErr('');
				setLoader(false);
				setLoaderFor('');
			}
		} catch (err) {
			setAlertClass('show');
			setMsg('');
			console.log(err);
			if (err.response && err.response.data) {
				if (err.response.data.error) {
					setErr(err.response.data.error.message);
				} else if (err.response.data.errors) {
					let errors = err.response.data.errors.map((err) => <li>{err.msg}</li>);
					setErr(errors);
				} else {
					setErr(err.response.data.message);
				}
			} else {
				setErr(err.message);
			}
			setLoader(false);
			setLoaderFor('');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoader(true);
		console.log(meta);
		if (meta.error) {
			setErr2(meta.error);
			setLoader(false);
			return;
		}
		console.log(paymentForm);
		let data = {
			address: paymentForm.address,
			city: paymentForm.city,
			state: paymentForm.state,
			number: paymentForm.cardNumber.split(' ').join(''),
			exp_month: paymentForm.expiryDate ? paymentForm.expiryDate.split('/')[0].trim() : '',
			exp_year: paymentForm.expiryDate ? paymentForm.expiryDate.split('/')[1].trim() : '',
			cvc: paymentForm.cvc,
		};

		try {
			let sub = await subscription(false, data);
			if (sub.status === 200 || sub.status === 201) {
				let billings = await getUserPaymentMethods();
				dispatch({
					type: 'SET_BILLING',
					payload: billings,
				});
				let purchasing = await getUserPurchasing();
				dispatch({
					type: 'SET_PURCHASING',
					payload: purchasing,
				});

				setOpen(false);
				setAlertClass('show');
				setMsg(sub.data.message);
				setErr('');
				setLoader(false);
				setLoaderFor('');
				setErr2('');
				setPaymentForm({
					address: '',
					city: '',
					state: '',
					cardNumber: '',
					expiryDate: '',
					cvc: '',
				});
			}

			// let addPaymentMethod = await addPayment(data);
			// if (addPaymentMethod.status === 200) {
			// 	let billings = await getUserPaymentMethods();
			// 	dispatch({
			// 		type: 'SET_BILLING',
			// 		payload: billings,
			// 	});

			// 	setAlertClass('show');
			// 	setMsg2(addPaymentMethod.data.message);
			// 	setErr2('');
			// 	setPaymentForm({
			// 		address: '',
			// 		city: '',
			// 		state: '',
			// 		cardNumber: '',
			// 		expiryDate: '',
			// 		cvc: '',
			// 	});
			// 	// setOpen(false);
			// 	setLoader(false);
			// }
		} catch (err) {
			setAlertClass('show');
			setMsg2('');
			if (err.response && err.response.data) {
				if (err.response.data.error) {
					if (err.response.data.error && err.response.data.error.raw) {
						setErr2(err.response.data.error.raw.message);
					} else {
						setErr2(err.response.data.error.message);
					}
				} else if (err.response.data.errors) {
					console.log(err.response.data.errors);
					let errors = err.response.data.errors.map((err) => <li>{err.msg}</li>);
					setErr2(errors);
				} else {
					setErr2(err.response.data.message);
				}
			} else {
				setErr2(err.message);
			}
			setLoader(false);
		}
	};

	const handlePaymentFormChange = (e) => {
		const { name, value } = e.target;
		setPaymentForm((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	return (
		<div className='container'>
			{alertErrOpen && (
				<div className={`alert alert-danger alert-dismissible fade ${alertClass}`} role='alert'>
					<strong>{alertErrOpen}</strong>
					<button onClick={handleCloseAlert} type='button' className='close' data-dismiss='alert' aria-label='Close'>
						<span aria-hidden='true'>×</span>
					</button>
				</div>
			)}
			{msg && (
				<div className={`alert alert-success alert-dismissible fade ${alertClass}`} role='alert'>
					<strong>{msg}</strong>
					<button onClick={handleCloseAlert} type='button' className='close' data-dismiss='alert' aria-label='Close'>
						<span aria-hidden='true'>×</span>
					</button>
				</div>
			)}
			{err && (
				<div className={`alert alert-danger alert-dismissible fade ${alertClass}`} role='alert'>
					<strong>{err}</strong>
					<button onClick={handleCloseAlert} type='button' className='close' data-dismiss='alert' aria-label='Close'>
						<span aria-hidden='true'>×</span>
					</button>
				</div>
			)}
			<div className='row'>
				<div className='col-lg-12'>
					<h1 className='page-headings text-center'>Plan & Pricing</h1>
					<div className='mt-2 mb-2'></div>
					<div className='row justify-content-center'>
						<div className='col-lg-6'>
							<div className='card'>
								<div className='plan-card-heading'>
									<h4>INTRO PLAN</h4>
									<h1 className='plan-price'>
										<span>$</span>30.00
									</h1>
									<span>/month</span>
								</div>

								<div className='items-check-list'>
									<ul>
										{planlist.map((list, id) => (
											<li key={id}>
												<div className='row'>
													<div className='col'>
														<h4>{list}</h4>
													</div>
													<div className='col-auto'>
														<span className='list-checks'>
															<i className='fe fe-check-circle'></i>
														</span>
													</div>
												</div>
											</li>
										))}
									</ul>
								</div>

								<div className='mt-2'></div>
								<div className='mb-4 text-center'>
									{console.log('-------', userSub)}
									{userSub && userSub.length > 0 && userSub[0].status === 'active' && Date.parse(new Date()) < Date.parse(new Date(userSub[0].purchaseDate)) + 30 * 24 * 60 * 60 * 1000 ? (
										<>
											<button onClick={cancelUserSubscription} className='btn btn-custom btn-padd'>
												{loaderFor === 'cancel' && (
													<div className='spinner-border spinner-border-sm' role='status'>
														<span className='sr-only'>Loading...</span>
													</div>
												)}
												Cancel
											</button>
											{userSub[0].planType === 'trial' && (
												<button onClick={handleClickOpen} className='btn btn-custom btn-padd'>
													{loaderFor === 'purchase' && (
														<div className='spinner-border spinner-border-sm' role='status'>
															<span className='sr-only'>Loading...</span>
														</div>
													)}
													Purchase
												</button>
											)}
										</>
									) : (
										<>
											<button onClick={(e) => handleClickOpen(e)} className='btn btn-custom btn-padd'>
												{loaderFor === 'sub' && (
													<div className='spinner-border spinner-border-sm' role='status'>
														<span className='sr-only'>Loading...</span>
													</div>
												)}
												{(loaderFor === '' || loaderFor === 'trial') && 'Subscribe'}
											</button>
											{userSub && userSub.length > 0 && userSub[0].trialStartDate && Date.parse(new Date(userSub[0].trialStartDate)) + 7 * 24 * 60 * 60 * 1000 < Date.parse(new Date()) ? (
												// <button onClick={(e) => addSubscription(e, 'startTrial')} className='btn btn-custom btn-padd'>
												// 	{loaderFor === 'trial' && (
												// 		<div className='spinner-border spinner-border-sm' role='status'>
												// 			<span className='sr-only'>Loading...</span>
												// 		</div>
												// 	)}
												// 	{(loaderFor === '' || loaderFor === 'sub') && 'Start Trial'}
												// </button>
												<></>
											) : (userSub && userSub.length > 0 && userSub[0].status !== 'cancel') || userSub.length === 0 ? (
												<button onClick={(e) => addSubscription(e, 'startTrial')} className='btn btn-custom btn-padd'>
													{loaderFor === 'trial' && (
														<div className='spinner-border spinner-border-sm' role='status'>
															<span className='sr-only'>Loading...</span>
														</div>
													)}
													{(loaderFor === '' || loaderFor === 'sub') && 'Start Trial'}
												</button>
											) : null}
										</>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>{'Add Payment Method'}</DialogTitle>
				<form onSubmit={(e) => handleSubmit(e)}>
					<DialogContent>
						<div className='row g-3'>
							{msg2 && (
								<div className={`alert alert-success alert-dismissible fade ${alertClass}`} role='alert'>
									<strong>{msg2}</strong>
									<button onClick={handleCloseAlert} type='button' className='close' data-dismiss='alert' aria-label='Close'>
										<span aria-hidden='true'>×</span>
									</button>
								</div>
							)}
							{err2 && (
								<div className={`alert alert-danger alert-dismissible fade ${alertClass}`} role='alert'>
									<strong>{err2}</strong>
									<button onClick={handleCloseAlert} type='button' className='close' data-dismiss='alert' aria-label='Close'>
										<span aria-hidden='true'>×</span>
									</button>
								</div>
							)}
						</div>
						<div className='row g-3'>
							<div className='col-12 col-md-12 mb-3'>
								<label htmlFor='address' className='form-label'>
									Address
								</label>
								<input type='text' name='address' value={paymentForm.address} onChange={handlePaymentFormChange} className='form-control' id='address' placeholder='Address' required />
							</div>
						</div>
						<div className='row g-3'>
							<div className='col-12 col-md-12 mb-3'>
								<label htmlFor='value' className='form-label'>
									City
								</label>
								<input type='text' name='city' value={paymentForm.city} onChange={handlePaymentFormChange} className='form-control' id='city' placeholder='City' required />
							</div>
						</div>
						<div className='row g-3'>
							<div className='col-12 col-md-12 mb-3'>
								<label htmlFor='state' className='form-label'>
									State
								</label>
								<input type='text' name='state' value={paymentForm.state} onChange={handlePaymentFormChange} className='form-control' id='state' placeholder='State' required />
							</div>
						</div>
						<div className='row g-3'>
							<div className='col-12 col-md-12 mb-3'>
								<div>
									<label className='form-label'>Card Details</label>
								</div>
								<PaymentInputsWrapper {...wrapperProps}>
									<svg {...getCardImageProps({ images })} />
									<input name='number' {...getCardNumberProps({ onChange: handlePaymentFormChange })} value={paymentForm.cardNumber} />
									<input name='exp_date' {...getExpiryDateProps({ onChange: handlePaymentFormChange })} value={paymentForm.expiryDate} />
									<input name='cvc' {...getCVCProps({ onChange: handlePaymentFormChange })} value={paymentForm.cvc} />
								</PaymentInputsWrapper>
							</div>
						</div>
					</DialogContent>
					<DialogActions>
						<button className='btn btn-danger' onClick={handleClose}>
							Cancel
						</button>
						<button disabled={loader} type='submit' className='btn btn-primary' autoFocus>
							{loader && (
								<div className='spinner-border spinner-border-sm' role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							)}
							{!loader && 'Subscribe'}
						</button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
}

export default Pricing;
