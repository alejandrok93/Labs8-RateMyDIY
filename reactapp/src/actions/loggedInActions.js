import axios from 'axios';

// Actions
import { project_ReviewId_Chain } from '../actions';

axios.defaults.withCredentials = true;

// get userInfo
export const GETTING_USER_INFO = 'GETTING_USER_INFO';
export const GOT_USER_INFO = 'GOT_USER_INFO';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';

export const loggedIn = () => {
	return dispatch => {
		dispatch({ type: GETTING_USER_INFO });

		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/loggedIn`
			)

			.then(({ data }) => {
				dispatch({ type: GOT_USER_INFO, payload: data });
			})

			.catch(error => dispatch({ type: GET_USER_INFO_ERROR, payload: error }));
	};
};

// temp name. I'm not even sure this will work.
export const loggedIn_Project_ReviewId_Chain = project_id => {
	return dispatch => {
		dispatch({ type: GETTING_USER_INFO });

		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/loggedIn`
			)

			.then(({ data }) => {
				dispatch({ type: GOT_USER_INFO, payload: data });
				return data;
			})

			.then(userInfo =>
				dispatch(project_ReviewId_Chain(project_id, userInfo.user_id))
			)

			.catch(error => dispatch({ type: GET_USER_INFO_ERROR, payload: error }));
	};
};
