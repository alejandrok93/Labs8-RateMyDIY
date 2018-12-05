import axios from 'axios';

// getReview
export const GETTING_REVIEW = 'GETTING_REVIEW';
export const GOT_REVIEW = 'GOT_REVIEW';
export const GET_REVIEW_ERROR = 'GET_REVIEW_ERROR';
// getReviewId
export const GETTING_REVIEW_ID = 'GETTING_REVIEW_ID';
export const GOT_REVIEW_ID = 'GOT_REVIEW_ID';
export const GET_REVIEW_ID_ERROR = 'GET_REVIEW_ID_ERROR';
// addReview
export const ADDING_REVIEW = 'ADDING_REVIEW';
export const ADDED_REVIEW = 'ADDED_REVIEW';
export const ADD_REVIEW_ERROR = 'ADD_REVIEW_ERROR';
// willUpdateReview
export const WILL_UPDATE_REVIEW = 'WILL_UPDATE_REVIEW';
// updateReview
export const UPDATING_REVIEW = 'UPDATING_REVIEW';
export const UPDATED_REVIEW = 'UPDATED_REVIEW';
export const UPDATE_REVIEW_ERROR = 'UPDATE_REVIEW_ERROR';
// willDeleteReview
export const WILL_DELETE_REVIEW = 'WILL_DELETE_REVIEW';
// deleteReview
export const DELETING_REVIEW = 'DELETING_REVIEW';
export const DELETED_REVIEW = 'DELETED_REVIEW';
export const DELETE_REVIEW_ERROR = 'DELETE_REVIEW_ERROR';

// Loading message tester
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// get review by review_id
export const getReview = review_id => {
	return dispatch => {
		dispatch({ type: GETTING_REVIEW });

		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/reviews/${review_id}`
			)

			.then(({ data }) => {
				dispatch({ type: GOT_REVIEW, payload: data });
			})

			.catch(error => dispatch({ type: GET_REVIEW_ERROR, payload: error }));
	};
};

// get review_id by project_id & user_id
export const getReviewId = (project_id, user_id) => {
	console.log(
		`reviewActions: getReviewId(project_id: ${project_id}, user_id: ${user_id})`
	);
	return dispatch => {
		dispatch({ type: GETTING_REVIEW_ID });

		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/reviews/getid/${user_id}/${project_id}`
			)

			.then(({ data }) => {
				dispatch({ type: GOT_REVIEW_ID, payload: data });
			})

			.catch(error => dispatch({ type: GET_REVIEW_ID_ERROR, payload: error }));
	};
};

// add review
export const addReview = review => {
	console.log('Adding review', review);
	return dispatch => {
		dispatch({ type: ADDING_REVIEW });

		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/reviews/`,
				review
			)

			.then(async ({ data }) => {
				await sleep(500);
				dispatch({ type: ADDED_REVIEW, payload: data });
				return data;
			})

			.then(review_id => {
				if (review_id) dispatch(getReview(review_id));
			})

			.catch(error => dispatch({ type: ADD_REVIEW_ERROR, payload: error }));
	};
};

// willUpdateReview
export const willUpdateReview = value => {
	return dispatch => {
		dispatch({ type: WILL_UPDATE_REVIEW, payload: value });
	};
};

// update review
export const updateReview = (review_id, changes) => {
	return dispatch => {
		dispatch({ type: UPDATING_REVIEW });

		axios
			.put(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/reviews/${review_id}`,
				changes
			)

			.then(async () => {
				await sleep(500);
				dispatch({ type: UPDATED_REVIEW });
			})

			// I hate this. Preferred behavior: update the state in the parent component to {review: null} and fetch the reviews again
			.then(window.location.reload())

			.catch(error => dispatch({ type: UPDATE_REVIEW_ERROR, payload: error }));
	};
};

// willDeleteReview
export const willDeleteReview = value => {
	return dispatch => {
		dispatch({ type: WILL_DELETE_REVIEW, payload: value });
	};
};

// delete review
export const deleteReview = (user_id, review_id) => {
	return dispatch => {
		dispatch({ type: DELETING_REVIEW });

		axios
			.delete(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/reviews/${review_id}`,
				{ data: { user_id } } // Have to use { data: body } for DELETE
			)

			.then(async () => {
				await sleep(500);
				dispatch({ type: DELETED_REVIEW });
			})

			// I hate this. Preferred behavior: update the state in the parent component to {review: null} and fetch the reviews again
			.then(window.location.reload())

			.catch(error => dispatch({ type: DELETE_REVIEW_ERROR, payload: error }));
	};
};
