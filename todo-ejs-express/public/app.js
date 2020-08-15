const river = new River({
  host:
    "http://river-river-1WGV06P09EOKU-2004340702.us-east-1.elb.amazonaws.com",
  jwt:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcmsiLCJpYXQiOjE1MTYyMzkwMjJ9.e1G__eCxr7SOyjhWFyku5Duo53s8NgOhHLN2r7ROcaM",
});

river.subscribe("todos");

const addTask = (newTask) => {
  const input = `<li><input type="checkbox" name="check" value="${newTask}" /> ${newTask}</li>`;
  document.querySelector("#addedTasks").insertAdjacentHTML("beforeend", input);
};

const markCompleted = (tasks) => {};
