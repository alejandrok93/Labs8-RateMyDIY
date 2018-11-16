import { combineReducers } from "redux";
import exampleReducer from "./exampleReducer";
import landingPageReducer from "./landingPageReducer";
import myProjectReducer from "./myProjectReducer";
import searchReducer from "./searchReducer";
import settingsReducer from "./settingsReducer"
import sendgridReducer from "./sendgridReducer"
export default combineReducers({
  exampleReducer,
  landingPageReducer,
  myProjectReducer,
  searchReducer,
  settingsReducer,
  sendgridReducer
});
