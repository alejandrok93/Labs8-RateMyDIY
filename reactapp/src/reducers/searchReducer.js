import {
  FETCH_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_SUCCESS,
  FETCH_SEARCH_RESULTS_ERROR,
  FETCH_CATEGORY_RESULTS,
  FETCH_CATEGORY_RESULTS_SUCCESS,
  FETCH_CATEGORY_RESULTS_ERROR
} from "../actions";

const initialState = {
  projects: [
    {
      id: 1,
      name: "Micro brew IPA",
      star_count: 4.2,
      author: "alejandrok",
      photo_url: "http:// someURL.com"
    },
    {
      id: 2,
      name: "Steak Recipe",
      star_count: 4.2,
      author: "john",
      photo_url: "someURL.com"
    },
    {
      id: 2,
      name: "Another cool project",
      star_count: 4.2,
      author: "alejandro",
      photo_url: "someURL.com"
    }
  ]
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    // example action
    case FETCH_SEARCH_RESULTS:
      return { ...state };
    case FETCH_SEARCH_RESULTS_SUCCESS:
      return { ...state, projects: action.payload };
    case FETCH_SEARCH_RESULTS_ERROR:
      return { ...state, error: "There was an error" };
      case FETCH_CATEGORY_RESULTS:
        return { ...state };
      case FETCH_CATEGORY_RESULTS_SUCCESS:
        return { ...state, projects: action.payload };
      case FETCH_CATEGORY_RESULTS_ERROR:
        return { ...state, error: "There was an error" };
    default:
      return state;
  }
};

export default searchReducer;
