const express = require("express");
const bodyParser = require("body-parser");

const data = require("./data/data");
const River = require("river-http-node");

const river = new River({
  host: "https://bybefkmq8e.execute-api.us-east-1.amazonaws.com/publish",
  key: "publisherD8510803",
});

const app = express();

app.set("port", process.env.API_PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/comments", (req, res) => {
  res.json(data.getCommentsWithOneReply());
});

app.get("/api/comment_replies", (req, res) => {
  const comment_id = req.query.comment_id;
  res.json(data.getRepliesForComment(comment_id));
});

app.post("/api/comments", (req, res) => {
  const comment = req.body;
  const newComment = data.saveComment(comment);
  if (newComment) {
    res.json(newComment);

    // Publish new comment to River on AWS
    river.publish("comments-1234", "new-comment", newComment);
  } else {
    res.status(401).json({ error: "Please check your inputs" });
  }
});

app.post("/api/comment_replies", (req, res) => {
  const comment_id = req.body.comment_id;
  const { reply } = req.body;

  const newReply = data.saveReplyToComment(comment_id, reply);
  if (newReply) {
    res.json(newReply);
  } else {
    res.status(401).json({ error: "Please check your inputs" });
  }
});
module.exports = app;
