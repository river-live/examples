const River = require("river-client-js");

const river = new River({
  host:
    "http://river-river-1WGV06P09EOKU-2004340702.us-east-1.elb.amazonaws.com",
  jwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmsiLCJpYXQiOjE1MTYyMzkwMjJ9.e1G__eCxr7SOyjhWFyku5Duo53s8NgOhHLN2r7ROcaM",
});

river.subscribe("todos");

// ... more code

river.on("add-task", (payload) => {
  addTask(payload.data);
});

const addTask = (newTask) => {
  const li = document.createElement("li");
  const input = document.createElement("input");

  input.type = "checkbox";
  input.name = "check";
  input.value = newTask;

  li.append(input);
  li.append(document.createTextNode(newTask));

  document.querySelector("#added-tasks").appendChild(li);
};

const markCompleted = (completedTasks) => {
  const tasks = Array.from(document.querySelector("#added-tasks").children);

  completedTasks.forEach((completed) => {
    const matchingTask = tasks.find((task) => {
      return completed === task.textContent.trim();
    });

    matchingTask.remove();
    matchingTask.firstElementChild.checked = true;
    document.querySelector("#completed-tasks").appendChild(matchingTask);
  });
};

river.on("add-task", (payload) => {
  addTask(payload.data);
});

river.on("remove-task", (payload) => {
  markCompleted(payload.data);
});
