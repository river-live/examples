import React from "react";
import Comment from "./Comment";
import store from "../lib/store.js";

class ParentComment extends React.Component {
  state = {
    showReplyForm: false,
    replies: [],
  };

  componentDidMount() {
    const replies = store.getState().replies.filter((reply) => {
      const { comment } = this.props;
      return reply.comment_id === comment.id;
    });

    this.setState((prevState) => {
      return {
        replies: prevState.replies.concat(replies),
      };
    });
  }

  handleShowMoreReplies = (event) => {
    const { comment } = this.props;

    event.preventDefault();

    fetch(`/api/comment_replies?comment_id=${comment.id}`)
      .then((response) => response.json())
      .then((restOfReplies) => {
        store.dispatch({
          type: "REPLIES_FETCHED",
          payload: { replies: restOfReplies },
        });

        this.setState((prevState) => {
          return {
            replies: prevState.replies.concat(restOfReplies),
          };
        });
      });
  };

  render() {
    const { comment } = this.props;
    return (
      <div className="box">
        <Comment {...comment} />
        <a href="#" className="is-size-7 mb-2">
          Reply
        </a>
        <hr></hr>
        {this.state.replies.length === 0 ? null : (
          <div className="box">
            {this.state.replies.map((reply) => {
              return <Comment key={reply.id} {...reply} />;
            })}

            {comment.replies_count === this.state.replies.length ? null : (
              <a
                href="#"
                className="is-size-7 mb-2"
                onClick={this.handleShowMoreReplies}
              >
                Show More Replies ({comment.replies_count - 1})
              </a>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default ParentComment;
