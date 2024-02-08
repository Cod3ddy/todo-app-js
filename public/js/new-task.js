const newTask = document.getElementById("new-task");

// add new task
newTask.addEventListener("click", async () => {
  console.log("new task clicked");
  const task = document.getElementById("task").value;

  // for to-do list [task, timeStamp, status]
  const data = {
    task: task,
    timeStamp: "",
    status: "0",
  };

  // fetch data from server

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch("/api/tasks", options);
  const json = await response.json();
  console.log(json);
});
