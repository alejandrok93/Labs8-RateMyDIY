import axios from 'axios';

// Actions
import { getReviewId } from '../actions';

// getProject
export const GETTING_PROJECT = 'GETTING_PROJECT';
export const GOT_PROJECT = 'GOT_PROJECT';
export const GET_PROJECT_ERROR = 'GET_PROJECT_ERROR';
// addProject
export const ADDING_PROJECT = 'ADDING_PROJECT';
export const ADDED_PROJECT = 'ADDED_PROJECT';
export const ADD_PROJECT_ERROR = 'ADD_PROJECT_ERROR';
// willUpdateProject
export const WILL_UPDATE_PROJECT = 'WILL_UPDATE_PROJECT';
// updateProject
export const UPDATING_PROJECT = 'UPDATING_PROJECT';
export const UPDATED_PROJECT = 'UPDATED_PROJECT';
export const UPDATE_PROJECT_ERROR = 'UPDATE_PROJECT_ERROR';
// deleteProject
export const DELETING_PROJECT = 'DELETING_PROJECT';
export const DELETED_PROJECT = 'DELETED_PROJECT';
export const DELETE_PROJECT_ERROR = 'DELETE_PROJECT_ERROR';
// redirect
export const SET_REDIRECT = 'SET_REDIRECT';
// getProjectReviews
// export const GETTING_PROJECTS_REVIEWS = 'GETTING_PROJECTS_REVIEWS';
// export const GOT_PROJECT_REVIEWS = 'GOT_PROJECT_REVIEWS';
// export const GET_PROJECT_REVIEWS_ERROR = 'GET_PROJECT_REVIEWS_ERROR';

// Loading message tester
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// // get project by project_id
export const getProject = project_id => {
	return dispatch => {
		dispatch({ type: GETTING_PROJECT });

		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/projects/${project_id}`
			)

			.then(({ data }) => {
				dispatch({ type: GOT_PROJECT, payload: data });
			})

			.catch(error => dispatch({ type: GET_PROJECT_ERROR, payload: error }));
	};
};

// get project without dispatching GETTING_PROJECT
export const getProjectLite = project_id => {
	return dispatch => {
		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/projects/${project_id}`
			)

			.then(async ({ data }) => {
				await sleep(500);
				dispatch({ type: GOT_PROJECT, payload: data });
			})

			.catch(error => dispatch({ type: GET_PROJECT_ERROR, payload: error }));
	};
};

// I don't know how to chain actions properly. This is a mess.
// got userInfo, get project, then reviewId
export const project_ReviewId_Chain = (project_id, user_id) => {
	return dispatch => {
		dispatch({ type: GETTING_PROJECT });

		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/projects/${project_id}`
			)

			.then(({ data }) => {
				dispatch({ type: GOT_PROJECT, payload: data });
				return data;
			})

			.then(project => {
				if (user_id) dispatch(getReviewId(project.project_id, user_id));
			})

			.catch(error => dispatch({ type: GET_PROJECT_ERROR, payload: error }));
	};
};

// add project
export const addProject = project => {
	console.log('Adding project', project);
	return dispatch => {
		dispatch({ type: ADDING_PROJECT });

		axios
			.post(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/projects/`,
				project
			)

			.then(async ({ data }) => {
				await sleep(500);
				dispatch({ type: ADDED_PROJECT, payload: data });
			})

			.catch(error => dispatch({ type: ADD_PROJECT_ERROR, payload: error }));
	};
};

// willUpdateProject
export const willUpdateProject = value => {
	return dispatch => {
		dispatch({ type: WILL_UPDATE_PROJECT, payload: value });
	};
};

// update project
export const updateProject = (project_id, changes) => {
	return dispatch => {
		dispatch({ type: UPDATING_PROJECT });

		axios
			.put(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/projects/${project_id}`,
				changes
			)

			.then(() => dispatch(getProjectLite(project_id)))

			.then(async () => {
				await sleep(500);
				dispatch({ type: UPDATED_PROJECT });
			})

			.catch(error => dispatch({ type: UPDATE_PROJECT_ERROR, payload: error }));
	};
};

// delete project
export const deleteProject = (project_id, user_id) => {
	return dispatch => {
		dispatch({ type: DELETING_PROJECT });

		axios
			.delete(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
					`/api/projects/${project_id}`,
				{ data: { user_id } } // Have to use { data: body } for DELETE
			)

			.then(async () => {
				await sleep(500);
				dispatch({ type: DELETED_PROJECT });
			})

			.catch(error => dispatch({ type: DELETE_PROJECT_ERROR, payload: error }));
	};
};

// setRedirect
export const setRedirect = value => {
	return dispatch => {
		dispatch({ type: SET_REDIRECT, payload: value });
	};
};
