import axios from 'axios';

export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';
export const SEND_EMAIL_ERROR = 'SEND_EMAIL_ERROR';
// Test loading messages
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const sendEmail = to => {
  return dispatch => {
    dispatch({ type: SEND_EMAIL });

    axios
      .post('https://ratemydiy.herokuapp.com/sendgrid/test', { to })

      .then(async (data) => {
        await sleep(1000);
        dispatch({ type: SEND_EMAIL_SUCCESS, payload: data });
      })

      .catch(error => dispatch({ type: SEND_EMAIL_ERROR, payload: error }));
  };
};