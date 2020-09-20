import React from "react";
import Menu from "./Menu";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import store from "../lib/store.js";

const River = require("river-client-js");

const river = new River({
  host: "river-river-Y6EE4J4UI7DW-20454086.us-east-1.elb.amazonaws.com",
  jwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.4V4guYoUGVrUafImZ9gYVo-1Okcx-iXcnprz747zSno",
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
    <div className="columns">
      <div className="column is-one-fifth">
        <Menu />
      </div>
      <div className="column is-four-fifths">
        <CommentList />
        <CommentForm />
      </div>
    </div>
  );
};

export default CommentApp;
