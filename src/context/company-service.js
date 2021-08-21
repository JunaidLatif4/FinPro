import axios from './axios';

export const addCompany = async (data) => {
	return new Promise((resolve, reject) => {
		axios
			.post('/company', data)
			.then((rev) => {
				resolve(rev);
			})
			.catch((err) => {
				console.log(err);
				reject(err);
			});
	});
};
