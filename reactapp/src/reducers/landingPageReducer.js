import {
  GETTING_FEATURED_PROJECTS,
  GOT_FEATURED_PROJECTS,
  GETTING_FEATURED_PROJECTS_ERROR,
  GETTING_POPULAR_MAKERS,
  GOT_POPULAR_MAKERS,
  GETTING_POPULAR_MAKERS_ERROR,
  GET_REVIEWERS
} from "../actions/landingPageActions";

const initialState = {
  featuredProjects: [{
    "project_id": '',
    "user_id": '',
    "project_name": '',
    "img_url": '',
    "text": '',
    "last_updated": '',
    "project_rating": '',
    "rating_sum": '',
    "rating_count": ''
  }],
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
      };
    case GOT_FEATURED_PROJECTS:
      return {
        ...state,
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
      };
    case GOT_POPULAR_MAKERS:
      return {
        ...state,
        featuredProjects: action.payload
      };
    case GETTING_POPULAR_MAKERS_ERROR:
      return {
        ...state,
        fetching: false,
        error: `${action.payload}`
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
