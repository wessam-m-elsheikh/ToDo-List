const newTaskInput = document.querySelector(".new-task");
const submit = document.querySelector(".btn");
const tasksBox = document.querySelector(".tasks");

// array to store tasks
let taskArray = [];

// check if data exists on local storage
if (localStorage.getItem("tasks")) {
  taskArray = JSON.parse(localStorage.getItem("tasks"));
}

// call the function to get data from storage
fromLocalStorage();

///////////////////////////
// submitting data
// submit new task from btn
submit.addEventListener("click", function () {
  if (newTaskInput.value !== "") {
    addNewTask(newTaskInput.value);
    newTaskInput.value = "";
    newTaskInput.focus();
  }
});

// submit new task from Enter key
newTaskInput.addEventListener("keydown", function (e) {
  // console.log(e.target);
  if (newTaskInput.value !== "" && e.key == "Enter") {
    e.preventDefault();
    addNewTask(newTaskInput.value);
    newTaskInput.value = "";
    newTaskInput.focus();
  }
});

///////////////////////
// deleting data & toggling complete tasks
tasksBox.addEventListener("click", function (e) {
  if (e.target.classList.contains("del")) {
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains("task")) {
    toggleStatus(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

////////////////////////////////////////////////////
// FUNCTIONS

// creating new taskData on array and local storage
function addNewTask(task) {
  const taskData = {
    id: Date.now(),
    content: task,
    completed: false,
  };

  taskArray.push(taskData);
  //   console.log(taskArray);
  taskList(taskArray);

  // add to local storage
  toLocalStorage(taskArray);
}

/////////////
// add task to UI
function taskList(taskArr) {
  // empty the tasksBox
  tasksBox.innerHTML = "";

  // loop over the array of tasks
  taskArr.forEach((task) => {
    // console.log(task);
    // main task div
    let div = document.createElement("div");
    div.className = "task";
    // check if task completed
    if (task.completed) {
      div.classList.add("done");
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.content));
    // console.log(div);

    // delete button
    let icon = document.createElement("img");
    icon.classList.add("del");
    icon.setAttribute("src", "x-reg.png");

    // append button to main div
    div.appendChild(icon);
    // console.log(div);
    tasksBox.appendChild(div);
  });
}

//////////////
// add to local storage
function toLocalStorage(taskArr) {
  window.localStorage.setItem("tasks", JSON.stringify(taskArr));
}

//////////////
// get data from local storage
function fromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    taskList(tasks);
  }
}

///////////
function deleteTask(taskID) {
  taskArray = taskArray.filter((task) => task.id != taskID);
  toLocalStorage(taskArray);
}

///////////////
function toggleStatus(taskID) {
  for (let i = 0; i < taskArray.length; i++) {
    // console.log(taskArray[i].completed);
    if (taskArray[i].id == taskID) {
      if (taskArray[i].completed == false) {
        taskArray[i].completed = true;
      }
    }
  }
  toLocalStorage(taskArray);
  // console.log(taskArray);
}
