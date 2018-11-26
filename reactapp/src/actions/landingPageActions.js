import axios from "axios";
// export actions consts
export const GETTING_FEATURED_PROJECTS = 'GETTING_FEATURED_PROJECTS';
export const GOT_FEATURED_PROJECTS = 'GOT_FEATURED_PROJECTS';
export const GETTING_FEATURED_PROJECTS_ERROR = 'GETTING_FEATURED_PROJECTS_ERROR';
export const GETTING_POPULAR_MAKERS = 'GET_POPULAR_MAKERS';
export const GOT_POPULAR_MAKERS = 'GOT_POPULAR_MAKERS';
export const GETTING_POPULAR_MAKERS_ERROR = 'GET_POPULAR_MAKERS_ERROR';
export const GETTING_POPULAR_REVIEWERS = 'GET_POPULAR_REVIEWERS';
export const GOT_POPULAR_REVIEWERS = 'GOT_POPULAR_REVIEWERS';
export const GETTING_POPULAR_REVIEWERS_ERROR = 'GET_POPULAR_REVIEWERS_ERROR';

// Test loading messages
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export const getFeaturedProjects = () => {
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

export const getPopularMakers = () => {
	return dispatch => {
		dispatch({ type: GETTING_POPULAR_MAKERS });

		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
				`/api/lp/makers`
			)

			.then(async ({ data }) => {
				await sleep(500);
				dispatch({ type: GOT_POPULAR_MAKERS, payload: data });
			})

			.catch(error => dispatch({ type: GETTING_POPULAR_MAKERS_ERROR, payload: error }));
	};
};

export const getPopularReviewers = () => {
	return dispatch => {
		dispatch({ type: GETTING_POPULAR_REVIEWERS });

		axios
			.get(
				(process.env.REACT_APP_BACKEND || `http://localhost:5000`) +
				`/api/lp/reviewers`
			)

			.then(async ({ data }) => {
				await sleep(500);
				dispatch({ type: GOT_POPULAR_REVIEWERS, payload: data });
			})

			.catch(error => dispatch({ type: GETTING_POPULAR_REVIEWERS_ERROR, payload: error }));
	};
};
