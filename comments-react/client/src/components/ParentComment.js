import React from "react";
import Comment from "./Comment";
import store from "../lib/store.js";

const ParentComment = ({ comment, onShowMoreReplies }) => {
  const handleShowMoreReplies = (event) => {
    event.preventDefault();

    fetch(`/api/comment_replies?comment_id=${comment.id}`)
      .then((response) => response.json())
      .then((restOfReplies) => {
        store.dispatch({
          type: "REPLIES_FETCHED",
          payload: { replies: restOfReplies },
        });
      });
  };

  const replies = store.getState().replies.filter((reply) => {
    return reply.comment_id === comment.id;
  });

  return (
    <div className="parent-comment">
      <Comment {...comment} />
      <div className="replies">
        {replies.map((reply) => {
          return <Comment key={reply.id} {...reply} />;
        })}

        {comment.replies_count === replies.length ? null : (
          <a href="#" className="show_more" onClick={handleShowMoreReplies}>
            Show More Replies ({comment.replies_count - 1})
          </a>
        )}
      </div>
    </div>
  );
};

export default ParentComment;
