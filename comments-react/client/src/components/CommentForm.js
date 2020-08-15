import React, { Component } from "react";
import store from "../lib/store.js";

class CommentForm extends Component {
  state = {
    author: "",
    body: "",
  };

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      author: this.state.author,
      body: this.state.body,
    };

    fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((newComment) => {
        store.dispatch({
          type: "COMMENT_ADDED",
          payload: { newComment },
        });
      });

    this.setState({ author: "", body: "" });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} action="">
        <h2>Post a Comment</h2>
        <div className="input-group">
          <label>Your Name</label>
          <input
            value={this.state.author}
            onChange={this.handleInput}
            type="text"
            name="author"
          />
        </div>

        <div className="input-group">
          <label>Your Comment</label>
          <textarea
            value={this.state.body}
            onChange={this.handleInput}
            name="body"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default CommentForm;
