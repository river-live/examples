const River = require("river-http-node");

const river = new River({
  host: "https://bybefkmq8e.execute-api.us-east-1.amazonaws.com/publish",
  key: "publisherD8510803",
});

// ... more code

app.post("/add-task", (req, res) => {
  var task = req.body.task;
  tasks.push(task);
  river.publish("todos", "add-task", task);

  res.redirect("/");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// This mimics your database :)
const tasks = ["demo", "gym"];
const completed = [];

app.post("/add-task", (req, res) => {
  var task = req.body.task;
  tasks.push(task);
  river.publish("todos-ejs-1234", "add-task", task);

  res.redirect("/");
});

app.post("/remove-task", (req, res) => {
  let done = req.body.task;

  const markAsComplete = (task) => {
    completed.push(task);
    tasks.splice(tasks.indexOf(task), 1);
  };

  if (typeof done === "string") {
    markAsComplete(done);
    done = [done];
  } else if (typeof done === "object") {
    done.forEach((task) => markAsComplete(task));
  }

  river.publish("todos-ejs-1234", "remove-task", done);

  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("index", { tasks, completed });
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});
