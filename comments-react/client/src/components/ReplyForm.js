import React, { Component } from "react";
import store from "../lib/store.js";

class ReplyForm extends Component {
  state = {
    author: "",
    body: "",
  };

  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newReply = {
      author: this.state.author,
      body: this.state.body,
    };

    const body = {
      comment_id: "4b2d74e6-7d1a-4ba3-9e95-0f52ee8ebc6e",
      reply: newReply,
    };

    fetch("/api/comment_replies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((newReply) => {
        store.dispatch({
          type: "REPLY_ADDED",
          payload: { newReply },
        });
      });

    this.setState({ author: "", body: "" });
  };

  render() {
    return (
      <div className="section">
        <form onSubmit={this.handleSubmit} action="">
          <h2 className="subtitle">Reply to Comment</h2>
          <div className="field">
            <label className="label">Your Name</label>
            <input
              className="input"
              value={this.state.author}
              onChange={this.handleInput}
              type="text"
              name="author"
            />
          </div>

          <div className="field">
            <label className="label">Your Comment</label>
            <textarea
              className="textarea"
              value={this.state.body}
              onChange={this.handleInput}
              name="body"
              cols="20"
              rows="2"
            ></textarea>
          </div>
          <button className="button is-primary" type="submit">
            Reply
          </button>
        </form>
      </div>
    );
  }
}

export default ReplyForm;
