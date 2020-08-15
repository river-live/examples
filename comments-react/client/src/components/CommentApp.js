import React from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import store from "../lib/store.js";

const River = require("river-client-js");

const river = new River({
  host:
    "http://river-river-1WGV06P09EOKU-2004340702.us-east-1.elb.amazonaws.com",
  jwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmsiLCJpYXQiOjE1MTYyMzkwMjJ9.e1G__eCxr7SOyjhWFyku5Duo53s8NgOhHLN2r7ROcaM",
});

river.subscribe("comments-1234");

river.on("new-comment", (riverPayload) => {
  const newComment = riverPayload.data;
  store.dispatch({
    type: "COMMENT_ADDED",
    payload: { newComment },
  });
});

const CommentApp = () => {
  return (
    <div>
      <CommentList />
      <CommentForm />
    </div>
  );
};

export default CommentApp;
