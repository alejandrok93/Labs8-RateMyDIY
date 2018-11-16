import { combineReducers } from "redux";
import loggedInReducer from "./loggedInReducer";
import landingPageReducer from "./landingPageReducer";
import myProjectReducer from "./myProjectReducer";
import searchReducer from "./searchReducer";
import settingsReducer from "./settingsReducer";

export default combineReducers({
  loggedInReducer,
  landingPageReducer,
  myProjectReducer,
  searchReducer,
  settingsReducer
});
