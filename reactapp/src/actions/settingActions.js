import axios from 'axios';
import { loggedIn } from '../actions';
axios.defaults.withCredentials = true;

// get userInfo
export const GETTING_USERNAME = 'GETTING_USERNAME';
export const GOT_USERNAME = 'GOT_USERNAME';
export const GET_USERNAME_ERROR = 'GET_USERNAME_ERROR';
export const GETTING_PROFILE_PIC = 'GETTING_PROFILE_PIC';
export const GOT_PROFILE_PIC = 'GOT_PROFILE_PIC';
export const GET_PROFILE_PIC_ERROR = 'GET_PROFILE_PIC_ERROR';

export const getUsername = (username) => {
	return dispatch => {
		dispatch({ type: GETTING_USERNAME });

		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/api/users/editusername`, { username: username }
			)

			.then(({data}) => {
				console.log('success', data);
				if (data.success) {
					dispatch({ type: GOT_USERNAME, payload: data.success });
				} else {
					dispatch({ type: GET_USERNAME_ERROR, payload: data.error });
				}
			})

			.then(() => dispatch(loggedIn()))

            .catch(error => {
                console.log('error', error);
                dispatch({ type: GET_USERNAME_ERROR, payload: error.response.data.error })
            });
	};
};

export const getProfilePic = (img_url) => {
	return dispatch => {
		dispatch({ type: GETTING_PROFILE_PIC });

		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) + `/api/users/editprofilepic`, { img_url: img_url }
			)

			.then(({data}) => {
				console.log('success', data);
				dispatch({ type: GOT_PROFILE_PIC, payload: data.success });
			})

			.then(() => dispatch(loggedIn()))

            .catch(({error}) => {
                console.log('error', error);
                dispatch({ type: GET_PROFILE_PIC_ERROR, payload: error })
            });
	}
}
