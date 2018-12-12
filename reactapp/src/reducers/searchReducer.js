import {
	FETCH_SEARCH_RESULTS,
	FETCH_SEARCH_RESULTS_SUCCESS,
	FETCH_SEARCH_RESULTS_ERROR,
	FETCH_CATEGORY_RESULTS,
	FETCH_CATEGORY_RESULTS_SUCCESS,
	FETCH_CATEGORY_RESULTS_ERROR,
	FETCH_PROJECTS_BY_REVIEWER,
	FETCH_PROJECTS_BY_REVIEWER_SUCCESS,
	FETCH_PROJECTS_BY_REVIEWER_ERROR
} from '../actions';

const initialState = {
	projects: []
};

const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		// example action
		case FETCH_SEARCH_RESULTS:
			return { ...state, gettingSearchResults: true };
		case FETCH_SEARCH_RESULTS_SUCCESS:
			return {
				...state,
				projects: action.payload,
				gettingSearchResults: false
			};
		case FETCH_SEARCH_RESULTS_ERROR:
			return { ...state, error: 'There was an error' };
		case FETCH_CATEGORY_RESULTS:
			return { ...state };
		case FETCH_CATEGORY_RESULTS_SUCCESS:
			return { ...state, projects: action.payload };
		case FETCH_CATEGORY_RESULTS_ERROR:
			return { ...state, error: 'There was an error' };
		case FETCH_PROJECTS_BY_REVIEWER:
			return { ...state };
		case FETCH_PROJECTS_BY_REVIEWER_SUCCESS:
			return { ...state, projects: action.payload };
		case FETCH_PROJECTS_BY_REVIEWER_ERROR:
			return { ...state, error: 'There was an error' };
		default:
			return state;
	}
};

export default searchReducer;
