import {
    GETTING_USERNAME,
    GOT_USERNAME,
    GET_USERNAME_ERROR
  } from "../actions";
  
  const initialState = {
    gettingUsername: false,
    username: '',
    error: null,
    redirect: null
  };
  
  const usernameReducer = (state = initialState, action) => {
    switch (action.type) {
      // get userInfo
      case GETTING_USERNAME:
        return { ...state, gettingUsername: true };
  
      case GOT_USERNAME:
        return {
          ...state,
          gettingUsername: false,
          username: action.payload,
          redirect: '/'
        };
  
      case GET_USERNAME_ERROR:
        return {
          ...state,
          gettingUserInfo: false,
          error: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default usernameReducer;
  