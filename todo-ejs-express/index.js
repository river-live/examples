//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
const River = require("river-http-node");

const river = new River({
  host: "https://bybefkmq8e.execute-api.us-east-1.amazonaws.com/publish",
  key: "publisherD8510803",
});

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

//placeholders for added task
var task = ["buy socks", "practise with nodejs"];
//placeholders for removed task
var complete = ["finish jquery"];

//post route for adding new task
app.post("/addtask", function (req, res) {
  var newTask = req.body.newtask;
  //add the new task from the post route
  task.push(newTask);
  river.publish("todos-ejs-1234", "addtask", newTask);
  res.redirect("/");
});

app.post("/removetask", function (req, res) {
  var completeTask = req.body.check;

  let tasksToSendToRiver = completeTask;
  if (!Array.isArray(completeTask)) {
    tasksToSendToRiver = [completeTask];
  }

  //check for the "typeof" the different completed task, then add into the complete task
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    //check if the completed task already exits in the task when checked, then remove it
    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  river.publish("todos-ejs-1234", "removetask", tasksToSendToRiver);
  res.redirect("/");
});

//render the ejs and display added task, completed task
app.get("/", function (req, res) {
  res.render("index", { task: task, complete: complete });
});

//set app to listen on port 3000
app.listen(3000, function () {
  console.log("server is running on port 3000");
});
