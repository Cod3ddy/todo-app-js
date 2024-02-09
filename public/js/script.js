// const newTask = document.getElementById("new-task");
const taskContainer = document.getElementById("task-container");

// object for months
const months = {
  0: "Jan",
  1: "feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "jun",
  6: "jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
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
  const response = await fetch("/api/tasks");
  const data = await response.json();

  if (data.length < 1) {
    console.log("No data found");
  }

  const todoItems = document.createElement("div");
  todoItems.className = "todo-items";

  // getTodo(todoItems);

  // console.log(todoItems);
  for (task of data) {
    //   timestamp
    const timeStamp = task.timeStamp;
    const date = new Date(timeStamp);

    // date
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    //  create to do items
    const firstDiv = document.createElement("div");
    firstDiv.className =
      "p-4 mb-4 border-2 border-gray-300 rounded-lg dark:border-gray-700 grid grid-cols-10 gap-4 hover:bg-gray-100 dark:hover:bg-gray-700 todo-item cursor-pointer sm:hover:none";

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
    taskDate.innerHTML = `<i class="bi bi-calendar" style="margin-right: 10px"></i>${day} ${months[month]}, ${year}`;

    // append elements

    firstDiv.appendChild(checkDiv);
    firstDiv.appendChild(taskDiv);
    checkDiv.appendChild(checkBox);
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDate);

    todoItems.appendChild(firstDiv);
    getTodo(firstDiv, task._id);
    // task container
  }

  taskContainer.appendChild(todoItems);

  //   console.log(data);
}

const todoItem = document.querySelectorAll(".todo-items");
let items = [];
//
function getTodo(task, taskId) {
  task.addEventListener("click", () => {
    // set check box to checked
    const checkBox = task.querySelector("input");
    checkBox.checked = !checkBox.checked;
    task.classList.toggle("bg-gray-100");
    // if items was selected remove it
    if (isTaskSelected(taskId)) {
      items.pop(taskId);
    } else {
      items.push(taskId);
    }
  });
  // items.addEventListener("click", () => {

  // });
}

function isTaskSelected(task) {
  return items.includes(task);
}

