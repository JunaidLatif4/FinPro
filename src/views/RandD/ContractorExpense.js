import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { AuthContext } from '../../context/context';
import { getInputs } from '../../context/fetch-service';
import { addInputExpense, deleteInputExpense, updateInputExpense } from '../../context/input-service';

function ExpenseInputs({ randdId, expenseInputs, setMsg, setErr, setAlertClass }) {
	const { state, dispatch } = React.useContext(AuthContext);
	let { user } = state;

	const [open, setOpen] = React.useState(false);
	const [dialogSetting, setDialogSetting] = React.useState({
		title: '',
		buttonTitle: '',
		heading: '',
		type: '',
	});
	const [loader, setLoader] = React.useState(false);
	const [edit, setEdit] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (e) => {
		e.preventDefault();
		setOpen(false);
	};

	const [expenseForm, setExpenseForm] = React.useState({
		value: '',
		cost: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setExpenseForm((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const handleSubmit = async (e, heading) => {
		e.preventDefault();

		setLoader(true);
		try {
			if (edit) {
				let update = await updateInputExpense({ inputMainId: randdId, inputId: expenseForm.inputId, data: expenseForm });
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
				let add = await addInputExpense({ ...expenseForm, inputMainId: randdId, heading });
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
		setExpenseForm({
			value: '',
			cost: '',
		});
		setOpen(false);
	};

	const handleDeletePlan = async (inputId) => {
		try {
			let deletePlanRes = await deleteInputExpense({ inputMainId: randdId, inputId });

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

	const handleEditPlan = (expInp) => {
		setEdit(true);
		setOpen(true);
		setExpenseForm({
			value: expInp.value,
			cost: expInp.cost,
			inputId: expInp._id,
		});
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>{edit ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
				<form onSubmit={(e) => handleSubmit(e, dialogSetting.heading)}>
					<DialogContent>
						<div className='row g-3'>
							<div className='col-12 col-md-12 mb-3'>
								<label htmlFor='value' className='form-label'>
									{dialogSetting.title}
								</label>
								<input type='text' name='value' value={expenseForm.value} onChange={handleInputChange} className='form-control' id='value' placeholder='i.e., McKinsey & Company' required />
							</div>
						</div>
						<div className='row g-3'>
							<div className='col-12 col-md-12 mb-3'>
								<label htmlFor='cost' className='form-label'>
									Cost
								</label>
								<input type='number' name='cost' value={expenseForm.cost} onChange={handleInputChange} className='form-control' id='cost' placeholder='i.e., 30000' required />
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
							{!loader && (edit ? 'Update Expense' : 'Add Expense')}
						</button>
					</DialogActions>
				</form>
			</Dialog>
			<div className='card'>
				<div>
					<div className='table-responsive'>
						<table className='table table-sm table-hover table-nowrap mb-0'>
							<thead>
								<tr>
									<th scope='col'>Contractor</th>
									<th scope='col'>Cost (per month) </th>
									<th scope='col'>
										<i
											title='Add Major Expense'
											style={{ fontSize: '22px' }}
											onClick={() => {
												setDialogSetting({
													title: 'Contractor',
													heading: 'contractor',
												});
												handleClickOpen();
											}}
											className='fe fe-plus add-icon'></i>
									</th>
								</tr>
							</thead>
							<tbody>
								{expenseInputs &&
									expenseInputs
										.filter((exp) => exp.heading === 'contractor')
										.map((expInp, id) => (
											<tr key={id}>
												<td>{expInp.value}</td>
												<td>{user.currency || "$"}{parseInt(expInp.cost).toLocaleString()}.00</td>
												<td>
													<span>
														<i
															className='fe fe-edit edit-icon'
															onClick={() => {
																setDialogSetting({
																	title: 'Contractor',
																	heading: 'contractor',
																});
																handleEditPlan(expInp);
															}}></i>
														<i className='fe fe-trash-2 delete-icon' onClick={() => handleDeletePlan(expInp._id)}></i>
													</span>
												</td>
											</tr>
										))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExpenseInputs;
