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

class CommentApp extends React.Component {
  state = {
    comments: [],
  };

  componentDidMount() {
    fetch("/api/comments")
      .then((response) => response.json())
      .then((comments) => this.setState({ comments }));
  }

  handleShowMoreReplies = (id) => {
    fetch(`/api/comment_replies?comment_id=${id}`)
      .then((response) => response.json())
      .then((restOfReplies) => {
        this.setState((prevState) => {
          const newComments = prevState.comments.map((comment) => {
            if (id === comment.id) {
              return Object.assign({}, comment, {
                replies: [...comment.replies, ...restOfReplies],
              });
            } else {
              return comment;
            }
          });

          return { comments: newComments };
        });
      });
  };

  handleSubmit = (comment) => {
    fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((response) => response.json())
      .then((newComment) => {
        this.setState((prevState) => ({
          comments: [...prevState.comments, newComment],
        }));
      });
  };

  render() {
    return (
      <div>
        <CommentList
          comments={this.state.comments}
          onShowMoreReplies={this.handleShowMoreReplies}
        />
        <CommentForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default CommentApp;
