import axios from './../../axios-orders';

import * as actionTypes from './actionTypes';

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (password) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		password: password,
	};
};

export const authFail = (error) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error
	};
};

export const logout = () => {
	localStorage.removeItem('password');
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const auth = (password) => {
	return dispatch => {
		dispatch(authStart());
		const queryParams = '?orderBy="$key"&equalTo="' + password + '"';
		axios.get('/guests.json' + queryParams, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			}
		}).then(response => {
			if (Object.keys(response.data).length === 0 && response.data.constructor === Object) {
				dispatch(authFail("invalid password"));
			} else {
				localStorage.setItem('password', password);
				dispatch(authSuccess(response.data));
			}
		}).catch(err => {
			console.log(err);
			dispatch(authFail(err));
		});
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};

export const authCheckState = () => {
	return dispatch => {
		const password = localStorage.getItem('password');
		if (!password) {
			dispatch(logout());
		} else {
			dispatch(authSuccess(password));
		}
	};
};