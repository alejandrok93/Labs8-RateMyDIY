import axios from 'axios';
axios.defaults.withCredentials = true;

// get userInfo
export const GETTING_USER_INFO = 'GETTING_USER_INFO';
export const GOT_USER_INFO = 'GOT_USER_INFO';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';

export const loggedIn = () => {
	return dispatch => {
		dispatch({ type: GETTING_USER_INFO });

		axios
			.get((process.env.BACKEND_URL || `http://localhost:5000`) + `/loggedIn`)

			.then(({ data }) => {
				dispatch({ type: GOT_USER_INFO, payload: data });
			})

			.catch(error => dispatch({ type: GET_USER_INFO_ERROR, payload: error }));
	};
};
