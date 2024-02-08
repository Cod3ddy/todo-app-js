// const newTask = document.getElementById("new-task");
const taskContainer = document.getElementById("task-container");

// object for months
const months = {
  0: "january",
  1: "february",
  2: "march",
  3: "april",
  4: "may",
  5: "june",
  6: "july",
  7: "august",
  8: "september",
  9: "october",
  10: "november",
  11: "december",
};

// call functions
getTasks();

// add new task
// newTask.addEventListener("click", async () => {
//   console.log("new task clicked");
//   const task = document.getElementById("task").value;

//   // for to-do list [task, timeStamp, status]
//   const data = {
//     task: task,
//     timeStamp: "",
//     status: "0",
//   };

//   // fetch data from server

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };

//   const response = await fetch("/api", options);
//   const json = await response.json();
//   //   console.log(json);
// });

async function getTasks() {
  const response = await fetch("/api");
  const data = await response.json();

  if (data.length < 1) {
    console.log("No data found");
  }

  const todoItems = document.createElement("div");
  todoItems.className = "todo-items";

  for (task of data) {
    //   timestamp
    const timeStamp = task.timeStamp;
    const date = new Date(timeStamp);

      const month = date.getMonth();
      const day = date.getDate();
      console.log(day);

      //  create to do items
      const firstDiv = document.createElement("div");
      firstDiv.className =
        "p-4 mb-4 border-2 border-gray-300 rounded-lg dark:border-gray-700 grid grid-cols-10 gap-4 hover:bg-gray-100 dark:hover:bg-gray-700";

      const checkDiv = document.createElement("div");
      checkDiv.className = "flex items-center col-span-1";

      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.value = "";
      checkBox.className =
        "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";

      const taskDiv = document.createElement("div");
      taskDiv.className = "col-span-9";

      const taskTitle = document.createElement("h2");
      taskTitle.className = "flex justify-start font-bold";
      taskTitle.textContent = task.task;

      const taskDate = document.createElement("p");
      taskDate.className =
        "flex justify-start text-sm font-light text-gray-500 mt-2";
      taskDate.innerHTML = `<i class="bi bi-calendar" style="margin-right: 10px"></i>${day} ${months[month]}`;

    // append elements

    firstDiv.appendChild(checkDiv);
    firstDiv.appendChild(taskDiv);
    checkDiv.appendChild(checkBox);
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDate);

    todoItems.appendChild(firstDiv);

    // task container
  }

  taskContainer.appendChild(todoItems);

  //   console.log(data);
}
