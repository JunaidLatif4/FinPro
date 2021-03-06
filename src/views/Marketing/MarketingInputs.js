import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { addInputs, deleteInputs, updateInputs } from '../../context/input-service';
import { AuthContext } from '../../context/context';
import { getInputs } from '../../context/fetch-service';
import { getMonthName, Months } from '../../utils/utils';
import moment from 'moment';

import ContractExpense from './ContractorExpense';

function MarketingInputs({ marketing, setMsg, setErr, setAlertClass }) {
	const { state, dispatch } = React.useContext(AuthContext);
	let { user } = state;

	const [open, setOpen] = React.useState(false);
	const [loader, setLoader] = React.useState(false);
	const [edit, setEdit] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const [marketingInputForm, setMarketingInputForm] = React.useState({
		hire: '',
		startDate: '',
		salary: '',
		taxes: '',
		commissions: '',
		title: 'marketing',
	});

	const handleClose = (e) => {
		e.preventDefault();
		setOpen(false);
		setEdit(false);
		setMarketingInputForm({
			hire: '',
			startDate: '',
			salary: '',
			taxes: '',
			commissions: '',
			title: 'marketing',
		});
	};
	const handleMarketingChange = (e) => {
		const { name, value } = e.target;
		setMarketingInputForm((prevState) => {
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
			if (edit) {
				let update = await updateInputs({ inputMainId: marketing._id, inputId: marketingInputForm.inputId, data: marketingInputForm });
				if (update.status === 200 || update.status === 201) {
					let inputs = await getInputs();
					dispatch({
						type: 'SET_INPUTS',
						payload: inputs,
					});

					setAlertClass('show');
					setMsg(update.data.message);
					setErr('');
					setEdit(false);
					setLoader(false);
				}
			} else {
				let add = await addInputs(marketingInputForm);
				if (add.status === 200 || add.status === 201) {
					let inputs = await getInputs();
					dispatch({
						type: 'SET_INPUTS',
						payload: inputs,
					});

					setAlertClass('show');
					setMsg(add.data.message);
					setErr('');
					setLoader(false);
				}
			}
		} catch (err) {
			setAlertClass('show');
			setMsg('');
			console.log(e);
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
		}
		setMarketingInputForm({
			hire: '',
			startDate: '',
			salary: '',
			taxes: '',
			commissions: '',
			title: 'marketing',
		});
		setOpen(false);
	};

	const handleDeleteInput = async (data) => {
		try {
			let deletePlanRes = await deleteInputs(data);

			if (deletePlanRes.status === 200) {
				let inputs = await getInputs();
				dispatch({
					type: 'SET_INPUTS',
					payload: inputs,
				});

				setAlertClass('show');
				setMsg(deletePlanRes.data.message);
				setErr('');
			}
		} catch (e) {
			setAlertClass('show');
			setMsg('');
			if (e.response && e.response.data) {
				if (e.response.data.error) {
					setErr(e.response.data.error.message);
				} else if (e.response.data.errors) {
					console.log(e.response.data.errors);
					let errors = e.response.data.errors.map((err) => <li>{err.msg}</li>);
					setErr(errors);
				} else {
					setErr(e.response.data.message);
				}
			} else {
				setErr(e.message);
			}
		}
		setOpen(false);
	};

	const handleEditInput = (input) => {
		setEdit(true);
		setOpen(true);
		setMarketingInputForm({
			hire: input.hire,
			startDate: moment(input.date).format('YYYY-MM-DD'),
			salary: input.salary,
			taxes: input.taxes,
			commissions: input.commissions,
			title: 'marketing',
			inputId: input._id,
		});
	};

	return (
		<>
			<div className='card'>
				<div>
					<div className='table-responsive'>
						<table className='table table-sm table-hover table-nowrap mb-0'>
							<thead>
								<tr>
									<th scope='col'>Hire</th>
									<th scope='col'>Start Date</th>
									<th scope='col'>Salary</th>
									<th scope='col'>Taxes</th>
									<th scope='col'>Bonuses</th>
									<th scope='col'>
										<i title='Add Marketing Inputs' onClick={handleClickOpen} style={{ fontSize: '22px', cursor: 'pointer' }} className='fe fe-plus add-icon'></i>
										<Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
											<DialogTitle id='alert-dialog-title'>{edit ? 'Edit Marketing' : 'Add Marketing'}</DialogTitle>

											<form onSubmit={handleSubmit}>
												<DialogContent>
													<div className='row g-3'>
														<div className='col-12 col-md-6 mb-3'>
															<label htmlFor='hire' className='form-label'>
																Hire
															</label>
															<input type='text' name='hire' value={marketingInputForm.hire} onChange={handleMarketingChange} className='form-control' id='hire' placeholder='i.e., Jaxson Deleon' required />
														</div>
														<div className='col-6 col-md-6 mb-3'>
															<label htmlFor='startDate' className='form-label'>
																Start Date
															</label>
															<input type='date' name='startDate' value={marketingInputForm.startDate} onChange={handleMarketingChange} className='form-control' id='date' placeholder='Start Date' required />
														</div>
													</div>

													<div className='row g-3'>
														<div className='col-12 col-md-12 mb-3'>
															<label htmlFor='salary' className='form-label'>
																Salary
															</label>
															<input type='number' name='salary' value={marketingInputForm.salary} onChange={handleMarketingChange} className='form-control' id='salary' placeholder='i.e., 120000' required />
														</div>
													</div>
													<div className='row g-3'>
														<div className='col-12 col-md-12 mb-3'>
															<label htmlFor='taxes' className='form-label'>
																Taxes
															</label>
															<input type='number' name='taxes' value={marketingInputForm.taxes} onChange={handleMarketingChange} className='form-control' id='taxes' placeholder='i.e., 15' required />
														</div>
														<div className='col-12 col-md-12 mb-3'>
															<label htmlFor='commissions' className='form-label'>
																Bonuses
															</label>
															<input type='number' name='commissions' value={marketingInputForm.commissions} onChange={handleMarketingChange} className='form-control' id='commissions' placeholder='i.e., 20000' required />
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
														{!loader && (edit ? 'Update Marketing' : 'Add Marketing')}
													</button>
												</DialogActions>
											</form>
										</Dialog>
									</th>
								</tr>
							</thead>
							<tbody>
								{marketing &&
									marketing.inputs &&
									marketing.inputs.length > 0 &&
									marketing.inputs
										.sort((a, b) => {
											if (new Date(a.startDate).getFullYear() !== new Date(b.startDate).getFullYear()) return new Date(a.startDate).getFullYear() - new Date(b.startDate).getFullYear();
											return Months.indexOf(getMonthName(new Date(a.startDate).getMonth())) - Months.indexOf(getMonthName(new Date(b.startDate).getMonth()));
										})
										.map((input, id) => (
											<tr key={id}>
												<td>{input.hire}</td>
												<td>{getMonthName(new Date(input.startDate).getMonth() + 1) + ' ' + new Date(input.startDate).getFullYear()}</td>
												<td>{user.currency || "$"}{parseInt(input.salary).toLocaleString()}.00</td>
												<td>{input.taxes}%</td>
												<td>{user.currency || "$"}{parseInt(input.commissions).toLocaleString()}.00</td>
												<td>
													<span>
														<i title='Edit Plan' style={{ cursor: 'pointer' }} className='fe fe-edit edit-icon' onClick={() => handleEditInput(input)}></i>
														<i title='Delete Plan' style={{ cursor: 'pointer' }} onClick={() => handleDeleteInput({ inputMainId: marketing._id, inputId: input._id })} className='fe fe-trash-2 delete-icon'></i>
													</span>
												</td>
											</tr>
										))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div className='row'>
				<div className='col-6 col-xl-6'>{marketing && marketing._id && <ContractExpense marketingId={marketing._id} expenseInputs={marketing.majorExpenseInput} setMsg={setMsg} setErr={setErr} setAlertClass={setAlertClass} />}</div>
			</div>
		</>
	);
}

export default MarketingInputs;
