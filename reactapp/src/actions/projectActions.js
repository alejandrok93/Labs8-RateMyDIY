import axios from 'axios';

// getProject
export const GETTING_PROJECT = 'GETTING_PROJECT';
export const GOT_PROJECT = 'GOT_PROJECT';
export const GET_PROJECT_ERROR = 'GET_PROJECT_ERROR';
// addProject
export const ADDING_PROJECT = 'ADDING_PROJECT';
export const ADDED_PROJECT = 'ADDED_PROJECT';
export const ADD_PROJECT_ERROR = 'ADD_PROJECT_ERROR';
// editProject
export const UPDATING_PROJECT = 'UPDATING_PROJECT';
export const UPDATED_PROJECT = 'UPDATED_PROJECT';
export const UPDATE_PROJECT_ERROR = 'UPDATE_PROJECT_ERROR';
// deleteProject
export const DELETING_PROJECT = 'DELETING_PROJECT';
export const DELETED_PROJECT = 'DELETED_PROJECT';
export const DELETE_PROJECT_ERROR = 'DELETE_PROJECT_ERROR';
// getProjectReviews
// export const GETTING_PROJECTS_REVIEWS = 'GETTING_PROJECTS_REVIEWS';
// export const GOT_PROJECT_REVIEWS = 'GOT_PROJECT_REVIEWS';
// export const GET_PROJECT_REVIEWS_ERROR = 'GET_PROJECT_REVIEWS_ERROR';

// Loading message tester
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const port = 5000;

// get project by id
export const getProject = id => {
	return dispatch => {
		dispatch({ type: GETTING_PROJECT });

		axios
			.get(
				`${process.env.BACKEND_URL ||
					`http://localhost:${port}`}/api/projects/${id}`
			)

			.then(async ({ data }) => {
				await sleep(500);
				dispatch({ type: GOT_PROJECT, payload: data });
			})

			.catch(error => dispatch({ type: GET_PROJECT_ERROR, payload: error }));
	};
};

// add project
export const addProject = project => {
	return dispatch => {
		dispatch({ type: ADDING_PROJECT });

		axios
			.post(
				`${process.env.BACKEND_URL ||
					`http://localhost:${port}`}/api/projects/`,
				project
			)

			.then(async () => {
				await sleep(500);
				dispatch({ type: ADDED_PROJECT });
			})

			.catch(error => dispatch({ type: ADD_PROJECT_ERROR, payload: error }));
	};
};

// update project
export const updateProject = (id, changes) => {
	return dispatch => {
		dispatch({ type: UPDATING_PROJECT });

		axios
			.put(
				`${process.env.BACKEND_URL ||
					`http://localhost:${port}`}/api/projects/${id}`,
				changes
			)

			.then(async ({ data }) => {
				await sleep(500);
				dispatch({ type: UPDATED_PROJECT, payload: data });
			})

			.catch(error => dispatch({ type: UPDATE_PROJECT_ERROR, payload: error }));
	};
};

// delete project
export const deleteProject = id => {
	return dispatch => {
		dispatch({ type: DELETING_PROJECT });

		axios
			.delete(
				`${process.env.BACKEND_URL ||
					`http://localhost:${port}`}/api/projects/${id}`
			)

			.then(async () => {
				await sleep(500);
				dispatch({ type: DELETED_PROJECT, payload: {} });
				// dispatch({ type: SET_REDIRECT, payload: '/' });
			})

			.catch(error => dispatch({ type: DELETE_PROJECT_ERROR, payload: error }));
	};
};
