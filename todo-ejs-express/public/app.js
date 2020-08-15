const river = new River({
  host:
    "http://river-river-1WGV06P09EOKU-2004340702.us-east-1.elb.amazonaws.com",
  jwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmsiLCJpYXQiOjE1MTYyMzkwMjJ9.e1G__eCxr7SOyjhWFyku5Duo53s8NgOhHLN2r7ROcaM",
});

river.subscribe("todos-ejs-1234");

const addTask = (newTask) => {
  const input = `<li><input type="checkbox" name="check" value="${newTask}" /> ${newTask}</li>`;
  document.querySelector("#addedTasks").insertAdjacentHTML("beforeend", input);
};

const markCompleted = (tasksToComplete) => {
  const tasks = Array.from(document.querySelector("#addedTasks").children);
  // iterate through tasks to Complete

  const nodesToAdd = [];

  tasksToComplete.forEach((taskToComplete) => {
    // find taskToComplete in tasks
    const matchingTask = tasks.find((task) => {
      return taskToComplete === task.textContent.trim();
    });

    matchingTask.remove();
    matchingTask.firstElementChild.checked = true;
    document.querySelector("#completedTasks").appendChild(matchingTask);
  });
};

river.on("addtask", (payload) => {
  addTask(payload.data);
});

river.on("removetask", (payload) => {
  markCompleted(payload.data);
});
