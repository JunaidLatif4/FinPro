import React from 'react';
import { LOGIN, LOGOUT, SET_INPUTS, SET_REVENUE, SET_TABLE_DATA, SET_USER, SET_BILLING, SET_INVOICES, SET_PURCHASING, VIEW_DATA, VIEW_REPORTS, SET_ACCESS_TOKEN } from './types';
import { getMonthName, setQuarterLabel, getQuarterEbit, getQuarterExpenses, getYearExpenses, getYearEbit } from '../utils/utils';
import moment from 'moment';
import { colors } from './colors';
export const initialState = {
	isAuthenticated: localStorage.getItem('finProtoken') ? true : false,
	user: localStorage.getItem('finProUser') ? JSON.parse(localStorage.getItem('finProUser')) : null,
	token: localStorage.getItem('finProtoken') ? localStorage.getItem('finProtoken') : null,
	access_token: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null,
	billingDetails: {},
	stepperData: {
		bussinessModel: 'SAAS',
		companyStage: {
			revenue: '',
			noOfEmployess: '',
		},
		access_token: null,
	},
	data: {},
	invoices: [],
	revenues: [],
	inputs: [],
	tableData: null,
	purchasing: localStorage.getItem('finProPurch') ? JSON.parse(localStorage.getItem('finProPurch')) : [],
	reports: {
		labels: ['2021', '2022', '2023', '2024', '2025'],
		datasets: [
			{
				label: 'Revenue',
				data: [300, 490, 800, 1500, 1800],
				backgroundColor: '#53CA35',
			},
			{
				label: 'Expenses',
				data: [500, 900, 1200, 1100, 1200],
				backgroundColor: '#F14038',
			},
			{
				label: 'Operating Profit',
				data: [-50, -150, -200, 200, 400],
				backgroundColor: '#4E5AC0',
			},
			{
				label: 'EBIT',
				data: [-150, -300, -500, 100, 300],
				backgroundColor: '#9891AF',
			},
		],
	},
};

export const AuthContext = React.createContext();

export const reducer = (state, action) => {
	switch (action.type) {
		case LOGIN:
			localStorage.setItem('finProtoken', action.payload.token);
			localStorage.setItem('finProUser', JSON.stringify(action.payload.user));
			localStorage.setItem('access_token', JSON.stringify(action.payload.access_token));
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.user,
				token: action.payload.token,
				access_token: action.payload.access_token,
			};
		case SET_ACCESS_TOKEN:
			localStorage.setItem('access_token', JSON.stringify(action.payload.access_token));
			return {
				...state,
				access_token: action.payload.access_token,
			};
		case LOGOUT:
			localStorage.removeItem('finProtoken');
			localStorage.removeItem('finProUser');
			localStorage.removeItem('finProPurch');
			localStorage.removeItem('access_token');
			return {
				...state,
				isAuthenticated: false,
				user: null,
				token: null,
			};
		case SET_USER:
			localStorage.setItem('finProUser', JSON.stringify(action.payload));
			return {
				...state,
				user: action.payload,
			};
		case SET_REVENUE:
			return {
				...state,
				revenues: action.payload,
			};
		case SET_INPUTS:
			return {
				...state,
				inputs: action.payload,
			};
		case SET_BILLING:
			return {
				...state,
				billingDetails: action.payload,
			};
		case VIEW_DATA:
			let newData = setData(action.payload, state);
			return {
				...state,
				data: newData,
			};
		case VIEW_REPORTS:
			let newReports = setReports(action.payload, state);
			return {
				...state,
				reports: newReports,
			};
		case SET_PURCHASING:
			localStorage.setItem('finProPurch', JSON.stringify(action.payload));
			return {
				...state,
				purchasing: action.payload,
			};
		case SET_INVOICES:
			return {
				...state,
				invoices: action.payload,
			};
		case SET_TABLE_DATA:
			let newTableData = setReportTableData(state);
			return {
				...state,
				tableData: newTableData,
			};
		case 'SET_BUSINESS_MODEL':
			console.log(action.payload);
			let type = action.payload.type;
			let value = action.payload.value;
			return {
				...state,
				stepperData: {
					...state.stepperData,
					[type]: value,
				},
			};
		default:
			return state;
	}
};

function setData(type, state) {
	let { user } = state;
	switch (type) {
		case 'year':
			let yearData;
			let ydata = [...state.revenues.revenuInputs]; //.filter((t) => t.type === 'Yearly');
			yearData = {
				labels: [],
				datasets: [],
			};
			let datalabels = ydata.map((l) => ({ plan: l.plan, color: l.color }));
			yearData.labels = [new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() + 2, new Date().getFullYear() + 3, new Date().getFullYear() + 4];
			let datasets = [];
			let data = {};
			for (let i = 0; i < yearData.labels.length; i++) {
				ydata.forEach((d, id) => {
					data[id] = [];
					if (d.type === 'Yearly') {
						data[id].push(parseFloat(d.price * d.purchasers));
					} else if (d.type === 'Quarter') {
						data[id].push(parseFloat(d.price * d.purchasers * 4));
					} else if (d.type === 'Monthly') {
						data[id].push(parseFloat(d.price * d.purchasers * 12));
					}
					for (let j = 0; j < yearData.labels.length; j++) {
						data[id].push(parseFloat(data[id][j]) + ((user && user.grate ? user.grate : user.email) / 100 || 50 / 100) * parseFloat(data[id][j]));
					}
				});
			}
			for (let i = 0; i < ydata.length; i++) {
				if (data[i].length > 0) {
					datasets.push(data[i]);
				}
			}

			datalabels.forEach((label, id) => {
				yearData.datasets[id] = {};
				if (label.plan === 'Silver Plan' || label.plan === 'Silver') {
					yearData.datasets[id].backgroundColor = /*label.color ? label.color :*/ '#53CA35';
				} else if (label.plan === 'Gold Plan' || label.plan === 'Gold') {
					yearData.datasets[id].backgroundColor = /*label.color ? label.color :*/ '#F14038';
				} else if (label.plan === 'Platinum Plan' || label.plan === 'Platinum') {
					yearData.datasets[id].backgroundColor = /*label.color ? label.color :*/ '#4E5AC0';
				} else if (label.plan === 'Enterprice Plan') {
					yearData.datasets[id].backgroundColor = /*label.color ? label.color :*/ '#9891AF';
				} else {
					yearData.datasets[id].backgroundColor = label.color ? label.color : colors[Math.floor(Math.random() * colors.length - 1)];
				}
				yearData.datasets[id].data = datasets[id];
				yearData.datasets[id].label = label.plan;
			});
			console.log(yearData);
			return yearData;
		case 'quarter':
			let quarterData;
			let qdata = [...state.revenues.revenuInputs];
			quarterData = { labels: [], datasets: [] };

			let qdatalabels = qdata.map((l) => ({ plan: l.plan, color: l.color }));
			quarterData.labels = ['Q1 2021', 'Q2 2021', 'Q3 2021', 'Q4 2021', 'Q1 2022', 'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'];
			let qdatasets = [];
			let dataq = {};
			for (let i = 0; i < quarterData.labels.length; i++) {
				qdata.forEach((d, id) => {
					dataq[id] = [];
					if (d.type === 'Yearly') {
						dataq[id].push(parseFloat((d.price * d.purchasers) / 4));
					} else if (d.type === 'Quarter') {
						dataq[id].push(parseFloat(d.price * d.purchasers));
					} else if (d.type === 'Monthly') {
						dataq[id].push(parseFloat(d.price * d.purchasers * 4));
					}
					for (let j = 0; j < quarterData.labels.length; j++) {
						dataq[id].push(parseFloat(dataq[id][j]) + ((user && user.grateQuarterly ? user.grateQuarterly : user.email) / 100 || 0 / 100) * parseFloat(dataq[id][j]));
					}
				});

				for (let i = 0; i < qdata.length; i++) {
					if (dataq[i].length > 0) {
						qdatasets.push(dataq[i]);
					}
				}
			}

			qdatalabels.forEach((label, id) => {
				quarterData.datasets[id] = {};
				if (label.plan === 'Silver Plan' || label.plan === 'Silver Plan') {
					quarterData.datasets[id].backgroundColor = '#53CA35';
				} else if (label.plan === 'Gold Plan' || label.plan === 'Gold') {
					quarterData.datasets[id].backgroundColor = '#F14038';
				} else if (label.plan === 'Platinum Plan' || label.plan === 'Platinum') {
					quarterData.datasets[id].backgroundColor = '#4E5AC0';
				} else if (label.plan === 'Enterprice Plan' || label.plan === 'Enterprice') {
					quarterData.datasets[id].backgroundColor = '#9891AF';
				} else {
					quarterData.datasets[id].backgroundColor = label.color ? label.color : colors[Math.floor(Math.random() * colors.length - 1)];
				}
				quarterData.datasets[id].data = qdatasets[id];
				quarterData.datasets[id].label = label.plan;
			});
			return quarterData;
		case 'month':
			let monthData;
			let mdata = [...state.revenues.revenuInputs];
			monthData = { labels: [], datasets: [] };

			let mdatalabels = mdata.map((l) => ({ plan: l.plan, color: l.color }));
			let mdatasets = [];
			let datam = {};
			monthData.labels = [
				getMonthName(new Date().getMonth() + 1) + ' ' + new Date().getFullYear(),
				getMonthName(new Date(moment(new Date()).add(1, 'M')).getMonth() + 1) + ' ' + new Date().getFullYear(),
				getMonthName(new Date(moment(new Date()).add(2, 'M')).getMonth() + 1) + ' ' + new Date().getFullYear(),
				getMonthName(new Date(moment(new Date()).add(3, 'M')).getMonth() + 1) + ' ' + new Date().getFullYear(),
				getMonthName(new Date(moment(new Date()).add(4, 'M')).getMonth() + 1) + ' ' + new Date().getFullYear(),
				getMonthName(new Date(moment(new Date()).add(5, 'M')).getMonth() + 1) + ' ' + new Date().getFullYear(),
				getMonthName(new Date(moment(new Date()).add(6, 'M')).getMonth() + 1) + ' ' + new Date().getFullYear(),
				getMonthName(new Date(moment(new Date()).add(7, 'M')).getMonth() + 1) + ' ' + new Date().getFullYear(),
				getMonthName(new Date(moment(new Date()).add(8, 'M')).getMonth() + 1) + ' ' + new Date().getFullYear(),
				getMonthName(new Date(moment(new Date()).add(9, 'M')).getMonth() + 1) + ' ' + new Date().getFullYear(),
				getMonthName(new Date(moment(new Date()).add(10, 'M')).getMonth() + 1) + ' ' + new Date().getFullYear(),

				getMonthName(new Date().getMonth()) + ' ' + [new Date().getFullYear() + 1],
				getMonthName(new Date(moment(new Date()).add(1, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 1],
				getMonthName(new Date(moment(new Date()).add(2, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 1],
				getMonthName(new Date(moment(new Date()).add(3, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 1],
				getMonthName(new Date(moment(new Date()).add(4, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 1],
				getMonthName(new Date(moment(new Date()).add(5, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 1],
				getMonthName(new Date(moment(new Date()).add(6, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 1],
				getMonthName(new Date(moment(new Date()).add(7, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 1],
				getMonthName(new Date(moment(new Date()).add(8, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 1],
				getMonthName(new Date(moment(new Date()).add(9, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 1],
				getMonthName(new Date(moment(new Date()).add(10, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 1],
				getMonthName(new Date(moment(new Date()).add(10, 'M')).getMonth() + 1) + ' ' + [new Date().getFullYear() + 1],

				getMonthName(new Date().getMonth()) + ' ' + [new Date().getFullYear() + 2],
				getMonthName(new Date(moment(new Date()).add(1, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 2],
				getMonthName(new Date(moment(new Date()).add(2, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 2],
				getMonthName(new Date(moment(new Date()).add(3, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 2],
				getMonthName(new Date(moment(new Date()).add(4, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 2],
				getMonthName(new Date(moment(new Date()).add(5, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 2],
				getMonthName(new Date(moment(new Date()).add(6, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 2],
				getMonthName(new Date(moment(new Date()).add(7, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 2],
				getMonthName(new Date(moment(new Date()).add(8, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 2],
				getMonthName(new Date(moment(new Date()).add(9, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 2],
				getMonthName(new Date(moment(new Date()).add(10, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 2],
				getMonthName(new Date(moment(new Date()).add(10, 'M')).getMonth() + 1) + ' ' + [new Date().getFullYear() + 2],

				getMonthName(new Date().getMonth()) + ' ' + [new Date().getFullYear() + 3],
				getMonthName(new Date(moment(new Date()).add(1, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 3],
				getMonthName(new Date(moment(new Date()).add(2, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 3],
				getMonthName(new Date(moment(new Date()).add(3, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 3],
				getMonthName(new Date(moment(new Date()).add(4, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 3],
				getMonthName(new Date(moment(new Date()).add(5, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 3],
				getMonthName(new Date(moment(new Date()).add(6, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 3],
				getMonthName(new Date(moment(new Date()).add(7, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 3],
				getMonthName(new Date(moment(new Date()).add(8, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 3],
				getMonthName(new Date(moment(new Date()).add(9, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 3],
				getMonthName(new Date(moment(new Date()).add(10, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 3],
				getMonthName(new Date(moment(new Date()).add(10, 'M')).getMonth() + 1) + ' ' + [new Date().getFullYear() + 3],

				getMonthName(new Date().getMonth()) + ' ' + [new Date().getFullYear() + 4],
				getMonthName(new Date(moment(new Date()).add(1, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 4],
				getMonthName(new Date(moment(new Date()).add(2, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 4],
				getMonthName(new Date(moment(new Date()).add(3, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 4],
				getMonthName(new Date(moment(new Date()).add(4, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 4],
				getMonthName(new Date(moment(new Date()).add(5, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 4],
				getMonthName(new Date(moment(new Date()).add(6, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 4],
				getMonthName(new Date(moment(new Date()).add(7, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 4],
				getMonthName(new Date(moment(new Date()).add(8, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 4],
				getMonthName(new Date(moment(new Date()).add(9, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 4],
				getMonthName(new Date(moment(new Date()).add(10, 'M')).getMonth()) + ' ' + [new Date().getFullYear() + 4],
				getMonthName(new Date(moment(new Date()).add(10, 'M')).getMonth() + 1) + ' ' + [new Date().getFullYear() + 4],
			];
			for (let i = 0; i < monthData.labels.length; i++) {
				mdata.forEach((d, id) => {
					datam[id] = [];
					if (d.type === 'Yearly') {
						datam[id].push(parseFloat((d.price * d.purchasers) / 12));
					} else if (d.type === 'Quarter') {
						datam[id].push(parseFloat((d.price * d.purchasers * 4) / 12));
					} else if (d.type === 'Monthly') {
						datam[id].push(parseFloat(d.price * d.purchasers));
					}
					for (let j = 0; j < monthData.labels.length; j++) {
						datam[id].push(parseFloat(datam[id][j]) + ((user && user.grateMonthly ? user.grateMonthly : user.email) / 100 || 0 / 100) * parseFloat(datam[id][j]));
					}
				});
				for (let i = 0; i < mdata.length; i++) {
					if (datam[i].length > 0) {
						mdatasets.push(datam[i]);
					}
				}
			}

			mdatalabels.forEach((label, id) => {
				monthData.datasets[id] = {};
				if (label.plan === 'Silver Plan' || label.plan === 'Silver') {
					monthData.datasets[id].backgroundColor = '#53CA35';
				} else if (label.plan === 'Gold Plan' || label.plan === 'Gold') {
					monthData.datasets[id].backgroundColor = '#F14038';
				} else if (label.plan === 'Platinum Plan' || label.plan === 'Platinum') {
					monthData.datasets[id].backgroundColor = '#4E5AC0';
				} else if (label === 'Enterprice Plan' || label.plan === 'Enterprice') {
					monthData.datasets[id].backgroundColor = '#9891AF';
				} else {
					monthData.datasets[id].backgroundColor = label.color ? label.color : colors[Math.floor(Math.random() * colors.length - 1)];
				}
				monthData.datasets[id].data = mdatasets[id];
				monthData.datasets[id].label = label.plan;
			});
			return monthData;
		default:
			return;
	}
}

function setReports(type, state) {
	let { user } = state;
	switch (type) {
		case 'P&L by Year':
			let yearData;
			let ydata = [...state.revenues.revenuInputs]; //.filter((t) => t.type === 'Yearly');
			yearData = {
				labels: [],
				datasets: [],
			};
			yearData.labels = [new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() + 2, new Date().getFullYear() + 3, new Date().getFullYear() + 4];
			let datalabels = ['Revenue', 'Expenses', 'Operating Profit', 'EBIT'];

			let datasets = [];
			let data = {};
			let total = [];

			for (let i = 0; i < yearData.labels.length; i++) {
				ydata.forEach((d, id) => {
					if (i === 0) {
						data[id] = [];
						if (d.type === 'Yearly') {
							// data[id].push(parseFloat(d.price * d.purchasers));
							total.push(parseFloat(d.price * d.purchasers));
						} else if (d.type === 'Quarter') {
							// data[id].push(parseFloat(d.price * d.purchasers * 4));
							total.push(parseFloat(d.price * d.purchasers * 4));
						} else if (d.type === 'Monthly') {
							// data[id].push(parseFloat(d.price * d.purchasers * 12));
							// console.log(d.price);
							total.push(parseFloat(d.price * d.purchasers * 12));
						}
					}
				});
			}
			console.log(total);
			console.log(data);
			let totalRev = total.reduce((a, b) => a + b, 0);
			for (let j = 0; j < yearData.labels.length; j++) {
				if (j === 0) {
					data[0].push(totalRev);
				} else {
					totalRev += ((user && user.grate ? user.grate : user.email) / 100 || 50 / 100) * totalRev;
					data[0].push(totalRev);
				}
			}
			console.log(yearData, ydata);

			data[1] = [];
			for (let j = 0; j < 5; j++) {
				// console.log(getYearExpenses(state.inputs, j));
				data[1].push(getYearExpenses(state.inputs, j));
			}
			data[2] = [];
			for (let j = 0; j < 5; j++) {
				if (data[0][j]) {
					data[2].push(data[0][j] - getYearExpenses(state.inputs, j));
				}
			}
			data[3] = [];
			for (let j = 0; j < 5; j++) {
				data[3].push(getYearEbit(state.inputs, j) / 3);
			}
			for (let i = 0; i < ydata.length; i++) {
				if (data[i].length > 0) {
					datasets.push(data[i]);
				}
			}

			datalabels.forEach((label, id) => {
				yearData.datasets[id] = {};
				if (label === 'Revenue') {
					yearData.datasets[id].backgroundColor = '#53CA35';
				} else if (label === 'Expenses') {
					yearData.datasets[id].backgroundColor = '#F14038';
				} else if (label === 'Operating Profit') {
					yearData.datasets[id].backgroundColor = '#4E5AC0';
				} else if (label === 'EBIT') {
					yearData.datasets[id].backgroundColor = '#9891AF';
				}

				yearData.datasets[id].data = datasets[id];
				yearData.datasets[id].label = label;
			});
			// console.log(yearData);
			return yearData;
		case 'P&L by Quarter':
			let quarterData;
			let qdata = [...state.revenues.revenuInputs]; //.filter((t) => t.type === 'Yearly');
			quarterData = {
				labels: [],
				datasets: [],
			};
			let qdatalabels = ['Revenue', 'Expenses', 'Operating Profit', 'EBIT'];
			quarterData.labels = [...setQuarterLabel()];

			// console.log(quarterData.labels);
			let qdatasets = [];
			let dataq = {};
			for (let i = 0; i < quarterData.labels.length; i++) {
				qdata.forEach((d, id) => {
					dataq[id] = [];
					if (id === 0) {
						if (d.type === 'Yearly') {
							dataq[id].push(parseFloat((d.price * d.purchasers) / 4));
						} else if (d.type === 'Quarter') {
							dataq[id].push(parseFloat(d.price * d.purchasers));
						} else if (d.type === 'Monthly') {
							dataq[id].push(parseFloat(d.price * d.purchasers * 4));
						}
						for (let j = 0; j < quarterData.labels.length; j++) {
							dataq[id].push(parseFloat(dataq[id][j]) + ((user && user.grateQuarterly ? user.grateQuarterly : user.email) / 100 || 0 / 100) * parseFloat(dataq[id][j]));
						}
					}
				});
			}

			dataq[1] = [];
			for (let j = 0; j < quarterData.labels.length; j++) {
				dataq[1].push(getQuarterExpenses(state.inputs, j));
			}

			dataq[2] = [];
			for (let j = 0; j < quarterData.labels.length; j++) {
				if (dataq[0][j]) {
					dataq[2].push(dataq[0][j] - getQuarterExpenses(state.inputs, j));
				}
			}

			dataq[3] = [];
			for (let j = 0; j < quarterData.labels.length; j++) {
				dataq[3].push(getQuarterEbit(state.inputs, j) / 3 / 4);
			}

			for (let i = 0; i < quarterData.labels.length; i++) {
				if (dataq[i] && dataq[i].length > 0) {
					qdatasets.push(dataq[i]);
				}
			}

			qdatalabels.forEach((label, id) => {
				quarterData.datasets[id] = {};
				if (label === 'Revenue') {
					quarterData.datasets[id].backgroundColor = '#53CA35';
				} else if (label === 'Expenses') {
					quarterData.datasets[id].backgroundColor = '#F14038';
				} else if (label === 'Operating Profit') {
					quarterData.datasets[id].backgroundColor = '#4E5AC0';
				} else if (label === 'EBIT') {
					quarterData.datasets[id].backgroundColor = '#9891AF';
				}

				quarterData.datasets[id].data = qdatasets[id];
				quarterData.datasets[id].label = label;
			});
			return quarterData;
		default:
			return;
	}
}

function setReportTableData(state) {
	let { user } = state;
	console.log(state.revenues);
	if (state.revenues && state.revenues.revenuInputs.length > 0) {
		let quarterData;
		let qdata = [...state.revenues.revenuInputs]; //.filter((t) => t.type === 'Yearly');
		quarterData = {
			labels: [],
		};
		quarterData.labels = [...setQuarterLabel()];

		let dataq = {};
		for (let i = 0; i < quarterData.labels.length; i++) {
			dataq.quarterRevenues = [];
			qdata.forEach((d, id) => {
				if (id === 0) {
					if (d.type === 'Yearly') {
						dataq.quarterRevenues.push(parseFloat((d.price * d.purchasers) / 4));
					} else if (d.type === 'Quarter') {
						dataq.quarterRevenues.push(parseFloat(d.price * d.purchasers));
					} else if (d.type === 'Monthly') {
						dataq.quarterRevenues.push(parseFloat(d.price * d.purchasers * 4));
					}
					for (let j = 0; j < quarterData.labels.length; j++) {
						dataq.quarterRevenues.push(parseFloat(dataq.quarterRevenues[j]) + ((user && user.grateQuarterly ? user.grateQuarterly : user.email) / 100 || 0 / 100) * parseFloat(dataq.quarterRevenues[j]));
					}
				}
			});
		}

		let startCash = 0;
		dataq.quarterExpense = [];
		for (let j = 0; j < quarterData.labels.length; j++) {
			dataq.quarterExpense.push(getQuarterExpenses(state.inputs, j));
		}

		dataq.quarterProfit = [];
		for (let j = 0; j < quarterData.labels.length; j++) {
			if (dataq.quarterRevenues[j]) {
				dataq.quarterProfit.push(dataq.quarterRevenues[j] - getQuarterExpenses(state.inputs, j));
			}
		}
		dataq.captalExpense = [];
		for (let j = 0; j < quarterData.labels.length; j++) {
			dataq.captalExpense.push(getQuarterEbit(state.inputs, j) / 3 / 4);
		}

		let inv = [];
		for (let i = 0; i < quarterData.labels.length; i++) {
			if (quarterData.labels[i]) {
				inv.push({
					year: quarterData.labels[i].split(' ')[1],
					invest: state.revenues.startingCapital
						.filter((sc) => new Date(sc.date).getFullYear().toString() === quarterData.labels[i].split(' ')[1])
						.reduce(function (a, b) {
							return parseFloat(a) + parseFloat(b.amount);
						}, 0),
				});
			}
		}
		console.log(inv);
		// reduce(function(a,b){return  parseFloat(a) + parseFloat(b.amount) }, 0)
		let investment = inv.reduce(function (acc, obj) {
			let key = obj.year;
			acc[key] = obj.invest;
			return acc;
		}, Object.create(null));

		// console.log(investment);
		dataq.investment = [];
		for (let i = 0; i < quarterData.labels.length; i++) {
			if (i === 0) {
				dataq.investment[i] = investment[new Date().getFullYear()];
			} else if (i === 4) {
				dataq.investment[i] = investment[new Date().getFullYear() + 1];
			} else if (i === 8) {
				dataq.investment[i] = investment[new Date().getFullYear() + 2];
			} else if (i === 12) {
				dataq.investment[i] = investment[new Date().getFullYear() + 3];
			} else {
				dataq.investment[i] = 0;
			}
		}

		dataq.changeInCash = dataq.quarterRevenues.map(function (qe, idx) {
			return qe + dataq.quarterExpense[idx] + dataq.captalExpense[idx] + dataq.investment[idx];
		});
		dataq.endingCash = dataq.quarterRevenues.map(function (qe, idx) {
			return qe + dataq.changeInCash[idx];
		});

		dataq.beginingCash = [];
		dataq.endingCash = [];

		for (let j = 0; j < quarterData.labels.length + 1; j++) {
			if (j === 0) {
				dataq.beginingCash.push(startCash);
				dataq.endingCash.push(startCash + dataq.changeInCash[j] - dataq.quarterExpense[j]);
			} else {
				dataq.beginingCash.push(dataq.endingCash[j - 1]);
				dataq.endingCash.push(dataq.beginingCash[j] + dataq.changeInCash[j] - dataq.quarterExpense[j]);
			}
		}

		console.log({ ...quarterData, ...dataq });
		return { ...quarterData, ...dataq };
	} else {
		return;
	}
}
