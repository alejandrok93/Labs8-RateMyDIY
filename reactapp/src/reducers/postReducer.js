import {
	GETTING_POST,
	GOT_POST,
	GET_POST_ERROR,
	ADDING_POST,
	ADDED_POST,
	ADD_POST_ERROR,
	UPDATING_POST,
	UPDATED_POST,
	UPDATE_POST_ERROR,
	DELETING_POST,
	DELETED_POST,
	DELETE_POST_ERROR
} from '../actions';

const initialState = {
	post: {},
	gettingPosts: false,
	gettingPost: false,
	addingPost: false,
	deletingPost: false,
	updatingPost: false,
	error: null,
	redirect: null
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		// getPost
		case GETTING_POST:
			return { ...state, gettingPost: true };

		case GOT_POST:
			return {
				...state,
				post: action.payload,
				gettingPost: false
			};

		case GET_POST_ERROR:
			return {
				...state,
				gettingPost: false,
				error: `${action.payload}`
			};

		// addPost
		case ADDING_POST:
			return { ...state, addingPost: true };

		case ADDED_POST:
			return {
				...state,
				addingPost: false
			};

		case ADD_POST_ERROR:
			return {
				...state,
				addingPost: false,
				error: `${action.payload}`
			};

		// updatePost
		case UPDATING_POST:
			return { ...state, updatingPost: true };

		case UPDATED_POST:
			return {
				...state,
				updatingPost: false
			};

		case UPDATE_POST_ERROR:
			return {
				...state,
				updatingPost: false,
				error: `${action.payload}`
			};

		// deletePost
		case DELETING_POST:
			return { ...state, deletingPost: true };

		case DELETED_POST:
			return {
				...state,
				deletingPost: false
			};

		case DELETE_POST_ERROR:
			return {
				...state,
				deletingPost: false,
				error: `${action.payload}`
			};

		default:
			return state;
	}
};

export default postReducer;
