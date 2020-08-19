import { comments } from "./comments.js";
import { replies } from "./replies.js";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  comments,
  replies,
});
