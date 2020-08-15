const river = new River({
  host:
    "http://river-river-11N1Y2OTC4WXY-1683057197.us-east-1.elb.amazonaws.com",
  jwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Ru7Cn_dREy3hoaA8wDSonoAsL-EiRdAVyg05nj7nN1M",
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
