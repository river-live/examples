import { comments } from "./comments.js";
import { replies } from "./replies.js";
import { combineReducers } from "redux";

// export const rootReducer = (state = {}, action) => {
//   return {
//     comments: comments(state.comments, action),
//     replies: replies(state.replies, action),
//   };
// };

export const rootReducer = combineReducers({
  comments,
  replies,
});
