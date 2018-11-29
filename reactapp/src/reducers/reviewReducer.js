import {
	GETTING_REVIEW,
	GOT_REVIEW,
	GET_REVIEW_ERROR,
	GETTING_REVIEW_ID,
	GOT_REVIEW_ID,
	GET_REVIEW_ID_ERROR,
	ADDING_REVIEW,
	ADDED_REVIEW,
	ADD_REVIEW_ERROR,
	WILL_UPDATE_REVIEW,
	UPDATING_REVIEW,
	UPDATED_REVIEW,
	UPDATE_REVIEW_ERROR,
	WILL_DELETE_REVIEW,
	DELETING_REVIEW,
	DELETED_REVIEW,
	DELETE_REVIEW_ERROR
} from '../actions';

const initialState = {
	review: {},
	reviewId: null,

	gettingReviews: false,
	gettingReviewsError: null,

	gettingReview: false,
	gettingReviewError: null,

	addingReview: false,
	addingReviewError: null,

	reviewToUpdate: false,
	updatingReview: false,
	updatingReviewError: null,

	reviewToDelete: false,
	deletingReview: false,
	DeletingReviewError: null
};

const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		// getReview
		case GETTING_REVIEW:
			return { ...state, gettingReview: true };

		case GOT_REVIEW:
			return {
				...state,
				review: action.payload,
				gettingReview: false
			};

		case GET_REVIEW_ERROR:
			return {
				...state,
				gettingReview: false,
				gettingReviewError: `${action.payload}`
			};

		// getReviewId
		case GETTING_REVIEW_ID:
			return { ...state, gettingReviewId: true };

		case GOT_REVIEW_ID:
			return {
				...state,
				reviewId: action.payload,
				gettingReviewId: false
			};

		case GET_REVIEW_ID_ERROR:
			return {
				...state,
				gettingReviewId: false,
				gettingReviewError: `${action.payload}`
			};

		// addReview
		case ADDING_REVIEW:
			return { ...state, addingReview: true };

		case ADDED_REVIEW:
			return {
				...state,
				addingReview: false,
				reviewId: action.payload
			};

		case ADD_REVIEW_ERROR:
			return {
				...state,
				addingReview: false,
				addingReviewError: `${action.payload}`
			};

		// willUpdateReview
		case WILL_UPDATE_REVIEW:
			return {
				...state,
				reviewToUpdate: action.payload
			};

		// updateReview
		case UPDATING_REVIEW:
			return { ...state, updatingReview: true };

		case UPDATED_REVIEW:
			return {
				...state,
				updatingReview: false,
				reviewToUpdate: false
			};

		case UPDATE_REVIEW_ERROR:
			return {
				...state,
				updatingReview: false,
				updatingReviewError: `${action.payload}`
			};

		// willDeleteReview
		case WILL_DELETE_REVIEW:
			return {
				...state,
				reviewToDelete: action.payload
			};

		// deleteReview
		case DELETING_REVIEW:
			return { ...state, deletingReview: true };

		case DELETED_REVIEW:
			return {
				...state,
				deletingReview: false
			};

		case DELETE_REVIEW_ERROR:
			return {
				...state,
				deletingReview: false,
				DeletingReviewError: `${action.payload}`
			};

		default:
			return state;
	}
};

export default reviewReducer;
