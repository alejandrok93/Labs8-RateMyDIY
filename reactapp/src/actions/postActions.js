import axios from 'axios';

import { getProjectLite } from '../actions';

// willAddPost
export const WILL_ADD_POST = 'WILL_ADD_POST';
// addPost
export const ADDING_POST = 'ADDING_POST';
export const ADDED_POST = 'ADDED_POST';
export const ADD_POST_ERROR = 'ADD_POST_ERROR';
// willUpdatePost
export const WILL_UPDATE_POST = 'WILL_UPDATE_POST';
// updatePost
export const UPDATING_POST = 'UPDATING_POST';
export const UPDATED_POST = 'UPDATED_POST';
export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR';
// willDeletePost
export const WILL_DELETE_POST = 'WILL_DELETE_POST';
// deletePost
export const DELETING_POST = 'DELETING_POST';
export const DELETED_POST = 'DELETED_POST';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';

// Loading message tester
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// willAddPost
export const willAddPost = value => {
	return dispatch => {
		dispatch({ type: WILL_ADD_POST, payload: value });
	};
};

// add post
export const addPost = post => {
	return dispatch => {
		dispatch({ type: ADDING_POST });

		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/posts/`,
				post
			)

			.then(() => dispatch(getProjectLite(post.project_id)))

			.then(async () => {
				await sleep(500);
				dispatch({ type: ADDED_POST });
			})

			.catch(error => dispatch({ type: ADD_POST_ERROR, payload: error }));
	};
};

// willUpdatePost
export const willUpdatePost = value => {
	return dispatch => {
		dispatch({ type: WILL_UPDATE_POST, payload: value });
	};
};

// update post
export const updatePost = (post_id, changes) => {
	return dispatch => {
		dispatch({ type: UPDATING_POST });

		axios
			.put(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/posts/${post_id}`,
				changes
			)

			.then(() => dispatch(getProjectLite(changes.project_id)))

			.then(async () => {
				await sleep(500);
				dispatch({ type: UPDATED_POST });
			})

			.catch(error => dispatch({ type: UPDATE_POST_ERROR, payload: error }));
	};
};

// willDeletePost
export const willDeletePost = value => {
	return dispatch => {
		dispatch({ type: WILL_DELETE_POST, payload: value });
	};
};

// delete post
export const deletePost = (post_id, project_id, user_id) => {
	return dispatch => {
		dispatch({ type: DELETING_POST });

		axios
			.delete(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/posts/${post_id}`,
				{ data: { project_id, user_id } } // Have to use { data: body } for DELETE
			)

			.then(() => dispatch(getProjectLite(project_id)))

			.then(async () => {
				await sleep(500);
				dispatch({ type: DELETED_POST, payload: {} });
			})

			.catch(error => dispatch({ type: DELETE_POST_ERROR, payload: error }));
	};
};
