import {
	GETTING_PROJECT,
	GOT_PROJECT,
	GET_PROJECT_ERROR,
	ADDING_PROJECT,
	ADDED_PROJECT,
	ADD_PROJECT_ERROR,
	WILL_UPDATE_PROJECT,
	UPDATING_PROJECT,
	UPDATED_PROJECT,
	UPDATE_PROJECT_ERROR,
	DELETING_PROJECT,
	DELETED_PROJECT,
	DELETE_PROJECT_ERROR,
	SET_REDIRECT
} from '../actions';

const initialState = {
	project: {},

	gettingProjects: false,
	gettingProjectsError: null,

	gettingProject: false,
	gettingProjectError: null,

	addingProject: false,
	addingProjectError: null,

	projectToUpdate: false,
	updatingProject: false,
	updatingProjectError: null,

	deletingProject: false,
	DeletingProjectError: null,

	redirect: null
};

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		// getProject
		case GETTING_PROJECT:
			return { ...state, gettingProject: true };

		case GOT_PROJECT:
			return {
				...state,
				project: action.payload,
				gettingProject: false
			};

		case GET_PROJECT_ERROR:
			return {
				...state,
				gettingProject: false,
				gettingProjectError: `${action.payload}`
			};

		// addProject
		case ADDING_PROJECT:
			return { ...state, addingProject: true };

		case ADDED_PROJECT:
			return {
				...state,
				addingProject: false,
				redirect: `/project/${action.payload}`
			};

		case ADD_PROJECT_ERROR:
			return {
				...state,
				addingProject: false,
				addingProjectError: `${action.payload}`
			};

		// willUpdateProject
		case WILL_UPDATE_PROJECT:
			return {
				...state,
				projectToUpdate: action.payload
			};

		// updateProject
		case UPDATING_PROJECT:
			return { ...state, updatingProject: true };

		case UPDATED_PROJECT:
			return {
				...state,
				updatingProject: false,
				projectToUpdate: false
			};

		case UPDATE_PROJECT_ERROR:
			return {
				...state,
				updatingProject: false,
				updatingProjectError: `${action.payload}`
			};

		// deleteProject
		case DELETING_PROJECT:
			return { ...state, deletingProject: true };

		case DELETED_PROJECT:
			return {
				...state,
				deletingProject: false,
				redirect: '/'
			};

		case DELETE_PROJECT_ERROR:
			return {
				...state,
				deletingProject: false,
				DeletingProjectError: `${action.payload}`
			};

		// redirect
		case SET_REDIRECT:
			return {
				...state,
				redirect: action.payload
			};

		default:
			return state;
	}
};

export default projectReducer;
