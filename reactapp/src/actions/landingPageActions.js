// import axios from "axios"; // This is not used

// export actions consts
export const GET_PROJECTS = "GET_PROJECTS";
export const GET_MAKERS = "GET_MAKERS";
export const GET_REVIEWERS = "GET_REVIEWERS";

// Test loading messages
// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// } // UNCOMMENT IF USED

export const getProjects = () => {
  return dispatch => {
    const data = require("../components/dummyData.js");
    dispatch({ type: GET_PROJECTS, payload: data.featuredProjects });
  };
};

export const getMakers = () => {
  return dispatch => {
    const data = require("../components/dummyData.js");
    dispatch({ type: GET_MAKERS, payload: data.popularMakers });
  };
};

export const getReviewers = () => {
  return dispatch => {
    const data = require("../components/dummyData.js");
    dispatch({ type: GET_REVIEWERS, payload: data.popularReviewers });
  };
};
