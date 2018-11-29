import {
  FETCH_MYPROJECT,
  FETCH_MYPROJECT_SUCCESS,
  FETCH_MYPROJECT_ERROR,
  FETCH_MYREVIEWS,
  FETCH_MYREVIEWS_SUCCESS,
  FETCH_MYREVIEWS_ERROR
} from "../actions";

const initialState = {
  myProjects: [],
  // myReviews: [],
  myReviews: [
    {
      review_id: 1,
      project_id: 1,
      user_id: 105,
      rating: 4,
      img_url: 'imageurl',
      text: 'Fun!',
      likes: 4,
      dislikes: 2,
      helpfulness: 6
    },
    {
      review_id: 2,
      project_id: 2,
      user_id: 105,
      rating: 3,
      img_url: 'imageurl',
      text: 'Nice!',
      likes: 5,
      dislikes: 1,
      helpfulness: 9
    },
    {
      review_id: 3,
      project_id: 2,
      user_id: 105,
      rating: 4,
      img_url: 'imageurl',
      text: 'Cool!',
      likes: 1,
      dislikes: 0,
      helpfulness: 8
    }
  ],
  error: null
};

const myProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    // example action
    case FETCH_MYPROJECT:
      return { ...state };
    case FETCH_MYPROJECT_SUCCESS:
      return { ...state, myProjects: action.payload };
    case FETCH_MYPROJECT_ERROR:
      return { ...state, error: "Error fetching data" };
    case FETCH_MYREVIEWS:
      return { ...state };
    case FETCH_MYREVIEWS_SUCCESS:
      return { ...state, myReviews: action.payload };
    case FETCH_MYREVIEWS_ERROR:
      return { ...state, error: "Error fetching data" };

    default:
      return state;
  }
};

export default myProjectReducer;
