import axios from "axios";
// export actions consts
export const GETTING_FEATURED_PROJECTS = 'GETTING_FEATURED_PROJECTS';
export const GOT_FEATURED_PROJECTS = 'GOT_FEATURED_PROJECTS';
export const GETTING_FEATURED_PROJECTS_ERROR = 'GETTING_FEATURED_PROJECTS_ERROR';
export const GET_MAKERS = 'GET_MAKERS';
export const GET_REVIEWERS = 'GET_REVIEWERS';

// Test loading messages
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const getLandingPageProjects = id => {
	return dispatch => {
		dispatch({ type: GETTING_FEATURED_PROJECTS });

		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
				`/api/lp/projects`
			)

			.then(async ({ data }) => {
				await sleep(500);
				dispatch({ type: GOT_FEATURED_PROJECTS, payload: data });
			})

			.catch(error => dispatch({ type: GETTING_FEATURED_PROJECTS_ERROR, payload: error }));
	};
};

export const getMakers = () => {
	return dispatch => {
		const data = require('../components/dummyData.js');
		dispatch({ type: GET_MAKERS, payload: data.popularMakers });
	};
};

export const getReviewers = () => {
	return dispatch => {
		const data = require('../components/dummyData.js');
		dispatch({ type: GET_REVIEWERS, payload: data.popularReviewers });
	};
};
