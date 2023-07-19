import { combineReducers, configureStore} from "@reduxjs/toolkit";

/** call reducers */
import questionReducer from "./question_reducer";
import resultReducer from "./result_reducer";
import posts from "./posts";
import uploads from "./uploads";


const rootReducer = combineReducers({
  questions: questionReducer,
  result: resultReducer,
  posts: posts,
  uploads: uploads,
});



/** create store with reducer */
export default configureStore({ reducer: rootReducer});
