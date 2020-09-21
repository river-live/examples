import React from "react";
import Comment from "./Comment";
import store from "../lib/store.js";
import ReplyForm from "./ReplyForm";

const ParentComment = ({ comment, onShowMoreReplies }) => {
  // move this function to CommentList component so that reply form can be shown when "show more replies" is clicked
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
    <div className="box">
      <Comment {...comment} />
      <hr></hr>
      {replies.length === 0 ? null : (
        <div className="box">
          {replies.map((reply) => {
            return <Comment key={reply.id} {...reply} />;
          })}

          {comment.replies_count === replies.length ? null : (
            <a
              href="#"
              className="is-size-7 mb-2"
              onClick={handleShowMoreReplies}
            >
              Show More Replies ({comment.replies_count - 1})
            </a>
          )}

          <ReplyForm comment_id={comment.id} />
        </div>
      )}
    </div>
  );
};

export default ParentComment;
