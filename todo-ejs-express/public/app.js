// These will be your own values -- here as an example:
const river = new River({
  host: "river-river-Y6EE4J4UI7DW-20454086.us-east-1.elb.amazonaws.com",
  jwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.4V4guYoUGVrUafImZ9gYVo-1Okcx-iXcnprz747zSno",
});

river.subscribe("todos-ejs-1234");

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
