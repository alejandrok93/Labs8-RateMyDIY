import {
	WILL_ADD_POST,
	ADDING_POST,
	ADDED_POST,
	ADD_POST_ERROR,
	WILL_UPDATE_POST,
	UPDATING_POST,
	UPDATED_POST,
	UPDATE_POST_ERROR,
	WILL_DELETE_POST,
	DELETING_POST,
	DELETED_POST,
	DELETE_POST_ERROR
} from '../actions';

const initialState = {
	post: {},

	postToAdd: false,
	addingPost: false,
	addingPostError: false,

	postToUpdate: null,
	updatingPost: false,
	updatingPostError: false,

	postToDelete: null,
	deletingPost: false,
	deletingPostError: false
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		// willAddPost
		case WILL_ADD_POST:
			return {
				...state,
				postToAdd: action.payload
			};

		// addPost
		case ADDING_POST:
			return { ...state, addingPost: true };

		case ADDED_POST:
			return {
				...state,
				addingPost: false,
				postToAdd: false
			};

		case ADD_POST_ERROR:
			return {
				...state,
				addingPost: false,
				addingPostError: `${action.payload}`
			};

		// willUpdatePost
		case WILL_UPDATE_POST:
			return {
				...state,
				postToUpdate: action.payload
			};

		// updatePost
		case UPDATING_POST:
			return { ...state, updatingPost: true };

		case UPDATED_POST:
			return {
				...state,
				updatingPost: false,
				postToUpdate: false
			};

		case UPDATE_POST_ERROR:
			return {
				...state,
				updatingPost: false,
				updatingPostError: `${action.payload}`
			};

		// willDeletePost
		case WILL_DELETE_POST:
			return {
				...state,
				postToDelete: action.payload
			};

		// deletePost
		case DELETING_POST:
			return { ...state, deletingPost: true };

		case DELETED_POST:
			return {
				...state,
				deletingPost: false,
				postToDelete: null
			};

		case DELETE_POST_ERROR:
			return {
				...state,
				deletingPost: false,
				deletingPostError: `${action.payload}`
			};

		default:
			return state;
	}
};

export default postReducer;
