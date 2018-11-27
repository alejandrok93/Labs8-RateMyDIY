import {
	GETTING_FEATURED_PROJECTS,
	GOT_FEATURED_PROJECTS,
	GETTING_FEATURED_PROJECTS_ERROR,
	GETTING_POPULAR_MAKERS,
	GOT_POPULAR_MAKERS,
	GETTING_POPULAR_MAKERS_ERROR,
	GETTING_POPULAR_REVIEWERS,
	GOT_POPULAR_REVIEWERS,
	GETTING_POPULAR_REVIEWERS_ERROR
} from '../actions/landingPageActions';

const initialState = {
	featuredProjects: [],
	popularMakers: [],
	popularReviewers: []
};

const landingPageReducer = (state = initialState, action) => {
	switch (action.type) {
		// example action
		case GETTING_FEATURED_PROJECTS:
			return {
				...state,
				fetching: true
			};
		case GOT_FEATURED_PROJECTS:
			return {
				...state,
				fetching: false,
				featuredProjects: action.payload
			};
		case GETTING_FEATURED_PROJECTS_ERROR:
			return {
				...state,
				fetching: false,
				error: `${action.payload}`
			};
		case GETTING_POPULAR_MAKERS:
			return {
				...state,
				fetching: true
			};
		case GOT_POPULAR_MAKERS:
			return {
				...state,
				fetching: false,
				popularMakers: action.payload
			};
		case GETTING_POPULAR_MAKERS_ERROR:
			return {
				...state,
				fetching: false,
				error: `${action.payload}`
			};
		case GETTING_POPULAR_REVIEWERS:
			return {
				...state,
				fetching: true
			};
		case GOT_POPULAR_REVIEWERS:
			return {
				...state,
				fetching: false,
				popularReviewers: action.payload
			};
		case GETTING_POPULAR_REVIEWERS_ERROR:
			return {
				...state,
				fetching: false,
				error: `${action.payload}`
			};
		default:
			return state;
	}
};

export default landingPageReducer;
