import React from "react";
import moment from "moment";

const Comment = ({ author, body, postedAt }) => (
  <div className="container mb-3">
    <span className="subtitle">{author}</span>
    <span className="icon has-text-info">
      <i className="fa fa-comment"></i>
    </span>
    <div className="is-size-7 mb-2">
      posted: <span>{moment(postedAt).fromNow()}</span>
    </div>
    <p>{body}</p>
  </div>
);

export default Comment;
