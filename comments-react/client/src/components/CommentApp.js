import React from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

/*

Comment App - React must return one element
  Comment list
    - Parent Comment
        - Comment
          - Reply...
  Add comment
    - Form

- Generally better to work top down with React
*/

const CommentApp = () => {
  return (
    <div>
      <CommentList />
      <CommentForm />
    </div>
  );
};

export default CommentApp;
