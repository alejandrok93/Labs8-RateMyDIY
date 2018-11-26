import {
  GETTING_FEATURED_PROJECTS,
  GOT_FEATURED_PROJECTS,
  GETTING_FEATURED_PROJECTS_ERROR,
  GET_MAKERS,
  GET_REVIEWERS
} from "../actions/landingPageActions";

const initialState = {
  featuredProjects: [],
  popularMakers: [],
  popularReviewers: [
    {
      id: 2,
      name: "Tristen",
      star_count: 4.2,
      author: "john",
      photo_url: "someURL.com"
    }
  ]
};

const landingPageReducer = (state = initialState, action) => {
  switch (action.type) {
    // example action
    case GETTING_FEATURED_PROJECTS:
      return {
        ...state,
        featuredProjects: action.payload
      };
    case GOT_FEATURED_PROJECTS:
      return {
        ...state,
        error: action.payload
      };
    case GETTING_FEATURED_PROJECTS_ERROR:
      return {
        ...state,
        fetching: false,
        error: `${action.payload}`
      };
    case GET_MAKERS:
      return {
        ...state,
        popularMakers: action.payload
      };
    case GET_REVIEWERS:
      return {
        ...state,
        popularReviewers: action.payload
      };
    default:
      return state;
  }
};

export default landingPageReducer;
