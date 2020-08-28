const { readFileSync, writeFileSync } = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const stringify = require("json-beautify");
const DATA_FILE_PATH = path.join(__dirname, "comments.json");

const data = {
  getCommentsWithOneReply: () => {
    const comments = JSON.parse(readFileSync(DATA_FILE_PATH));
    return comments.map((c) =>
      Object.assign({}, c, { replies: c.replies.slice(0, 1) })
    );
  },

  getRepliesForComment: (id) => {
    const comments = JSON.parse(readFileSync(DATA_FILE_PATH));
    return comments.find((c) => c.id === id).replies.slice(1);
  },

  saveComment: (commentFields) => {
    const newComment = Object.assign({}, commentFields, {
      id: uuidv4(),
      postedAt: +Date.now(),
      replies_count: 0,
      replies: [],
    });

    let comments = JSON.parse(readFileSync(DATA_FILE_PATH));
    comments = comments.concat(newComment);
    writeFileSync(DATA_FILE_PATH, stringify(comments, null, 2, 100));
    return newComment;
  },

  saveReplyToComment: (comment_id, replyFields) => {
    const newReply = Object.assign({}, replyFields, {
      id: uuidv4(),
      postedAt: +Date.now(),
      comment_id: comment_id,
    });
    let comments = JSON.parse(readFileSync(DATA_FILE_PATH));
    // find comment findIndex
    const idx = comments.findIndex((comment) => {
      return comment.id === comment_id;
    });
    // concat new reply
    comments[idx].replies.push(newReply);

    // update reply count
    comments[idx].replies_count += 1;
    writeFileSync(DATA_FILE_PATH, stringify(comments, null, 2, 100));

    return newReply;
  },
};

module.exports = data;
