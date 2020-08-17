import React from "react";
import ParentComment from "./ParentComment";
import store from "../lib/store.js";

class CommentList extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());

    fetch("/api/comments")
      .then((response) => response.json())
      .then((comments) => {
        store.dispatch({
          type: "COMMENTS_FETCHED",
          payload: { comments },
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="section">
        <h2 className="title">Comments</h2>
        {store.getState().comments.map((comment) => (
          <ParentComment
            key={comment.id}
            comment={comment}
            onShowMoreReplies={this.props.onShowMoreReplies}
          />
        ))}
      </div>
    );
  }
}

export default CommentList;
