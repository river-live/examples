import React from "react";
import ParentComment from "./ParentComment";
import store from "../lib/store.js";
import ReplyForm from "./ReplyForm";

class CommentList extends React.Component {
  // add a state of showing/hiding ReplyForm
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

  // add handleShowMoreReplies here from ParentComment
  // this will trigger showing ReplyForm

  render() {
    return (
      <div className="section">
        <h2 className="title">Comments</h2>
        {store.getState().comments.map((comment) => (
          <>
            <ParentComment
              key={comment.id}
              comment={comment}
              onShowMoreReplies={this.props.onShowMoreReplies}
            />
            {/* Make showing ReplyForm conditional on handleShowReplies */}
            <ReplyForm />
          </>
        ))}
      </div>
    );
  }
}

export default CommentList;
