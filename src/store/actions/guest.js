import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const setData = (data) => {
	return {
		type: actionTypes.SET_DATA,
		data: data
	};
};

export const initData = () => {
	return dispatch => {
		const password = localStorage.getItem('password');
		const queryParams = '?orderBy="$key"&equalTo="' + password + '"';
		axios.get('/guests.json' + queryParams, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			}
		}).then(response => {
			dispatch(setData(response.data[password]));
		}).catch(err => {
			console.log(err);
		});
	};
};