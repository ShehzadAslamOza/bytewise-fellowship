const addTask = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const inputTask = document.getElementById("input-task");

// Event Listener for Add Button
addTask.addEventListener("click", () => {
  addTaskFormat();
});

inputTask.addEventListener("keypress", () => {
  if (event.key === "Enter") {
    addTaskFormat();
  }
});

function addTaskFormat() {
  let task = document.createElement("div");
  task.classList.add("task");

  let li = document.createElement("li");
  li.innerHTML = `${inputTask.value}`;
  task.appendChild(li);

  let checkButton = document.createElement("button");
  checkButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
  checkButton.classList.add("checkTask");
  task.appendChild(checkButton);

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  deleteButton.classList.add("deleteTask");
  task.appendChild(deleteButton);

  // Check for empty values
  if (inputTask.value === "") {
    alert("Please enter a task");
  } else {
    taskContainer.appendChild(task);
  }

  checkButton.addEventListener("click", () => {
    checkButton.parentElement.style.textDecoration = "line-through";
  });

  deleteButton.addEventListener("click", (e) => {
    let target = e.target;

    console.log(target.parentElement);
    target.parentElement.remove();
  });
}
