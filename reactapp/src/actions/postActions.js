import axios from 'axios';

// getPost
export const GETTING_POST = 'GETTING_POST';
export const GOT_POST = 'GOT_POST';
export const GET_POST_ERROR = 'GET_POST_ERROR';
// addPost
export const ADDING_POST = 'ADDING_POST';
export const ADDED_POST = 'ADDED_POST';
export const ADD_POST_ERROR = 'ADD_POST_ERROR';
// editPost
export const UPDATING_POST = 'UPDATING_POST';
export const UPDATED_POST = 'UPDATED_POST';
export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR';
// deletePost
export const DELETING_POST = 'DELETING_POST';
export const DELETED_POST = 'DELETED_POST';
export const DELETE_POST_ERROR = 'DELETE_POST_ERROR';
// getPostReviews
// export const GETTING_POSTS_REVIEWS = 'GETTING_POSTS_REVIEWS';
// export const GOT_POST_REVIEWS = 'GOT_POST_REVIEWS';
// export const GET_POST_REVIEWS_ERROR = 'GET_POST_REVIEWS_ERROR';

// Loading message tester
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// get post by id
export const getPost = id => {
	return dispatch => {
		dispatch({ type: GETTING_POST });

		axios
			.get(
				(process.env.BACKEND_URL || `http://localhost:5000`) +
					`/api/posts/${id}`
			)

			.then(async ({ data }) => {
				await sleep(500);
				dispatch({ type: GOT_POST, payload: data });
			})

			.catch(error => dispatch({ type: GET_POST_ERROR, payload: error }));
	};
};

// add post
export const addPost = post => {
	return dispatch => {
		dispatch({ type: ADDING_POST });

		axios
			.post(
				(process.env.BACKEND_URL || `http://localhost:5000`) + `/api/posts/`,
				post
			)

			.then(async () => {
				await sleep(500);
				dispatch({ type: ADDED_POST });
			})

			.catch(error => dispatch({ type: ADD_POST_ERROR, payload: error }));
	};
};

// update post
export const updatePost = (id, changes) => {
	return dispatch => {
		dispatch({ type: UPDATING_POST });

		axios
			.put(
				(process.env.BACKEND_URL || `http://localhost:5000`) +
					`/api/posts/${id}`,
				changes
			)

			.then(async ({ data }) => {
				await sleep(500);
				dispatch({ type: UPDATED_POST, payload: data });
			})

			.catch(error => dispatch({ type: UPDATE_POST_ERROR, payload: error }));
	};
};

// delete post
export const deletePost = id => {
	return dispatch => {
		dispatch({ type: DELETING_POST });

		axios
			.delete(
				(process.env.BACKEND_URL || `http://localhost:5000`) + `/posts/${id}`
			)

			.then(async () => {
				await sleep(500);
				dispatch({ type: DELETED_POST, payload: {} });
				// dispatch({ type: SET_REDIRECT, payload: '/' });
			})

			.catch(error => dispatch({ type: DELETE_POST_ERROR, payload: error }));
	};
};
