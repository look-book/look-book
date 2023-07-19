import { combineReducers, configureStore} from "@reduxjs/toolkit";

/** call reducers */
import questionReducer from "./question_reducer";
import resultReducer from "./result_reducer";
import posts from "./posts";
import uploads from "./uploads";
import { authReducer } from './authReducer';

const rootReducer = combineReducers({
  questions: questionReducer,
  result: resultReducer,
  posts: posts,
  uploads: uploads,
  authReducer: authReducer

});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };


/** create store with reducer */
export default configureStore({ reducer: rootReducer, initialState });
