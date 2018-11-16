import { combineReducers } from 'redux';
import landingPageReducer from './landingPageReducer';
import projectReducer from './projectReducer';
import postReducer from './postReducer';
import searchReducer from './searchReducer';
import settingsReducer from './settingsReducer';
import sendgridReducer from "./sendgridReducer";

export default combineReducers({
	landingPageReducer,
	projectReducer,
	postReducer,
	searchReducer,
	settingsReducer,
  sendgridReducer
});
