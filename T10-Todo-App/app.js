// Dom Elements
const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector(".todo");
const totalTasks = document.querySelector("#total-tasks");
const remainingTasks = document.querySelector("#remaining-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const mainInput = document.querySelector("#todo-form input");
const submitBtn = document.querySelector(".submitBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
  tasks.map((task) => {
    createTask(task);
  });
}

submitBtn.addEventListener("click", () => {
  todoForm.submit();
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = mainInput.value;

  if (inputValue == "") {
    return;
  }

  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false,
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  createTask(task);
  todoForm.reset();
  mainInput.textContent = "";
});

function createTask(task) {
  const taskEl = document.createElement("li");
  taskEl.setAttribute("id", task.id);

  if (task.isCompleted) {
    taskEl.classList.add("complete");
  }

  const taskElMarkup = ` <div>
    <input type="checkbox" name="tasks" id="${task.id}" ${
    task.isCompleted ? "checked" : ""
  }>
    <span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
</div>

<button title="Remove the ${task.name} task" class="remove-task">
    <svg fill="#51839e" height="12px" width="12px" version="1.1" id="Capa_1"
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 460.775 460.775" xml:space="preserve" transform="rotate(0)">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"
            stroke="#CCCCCC" stroke-width="2.7646499999999996"></g>
        <g id="SVGRepo_iconCarrier">
            <path
                d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z">
            </path>
        </g>
    </svg>
</button>`;

  taskEl.innerHTML = taskElMarkup;
  todoList.appendChild(taskEl);

  countTasks();
}

function countTasks() {
  const completedTasksArray = tasks.filter((task) => {
    task.isCompleted === true;
  });

  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedTasksArray.length;
  remainingTasks.textContent = tasks.length - completedTasksArray.length;
}

todoList.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("remove-task") ||
    e.target.parentElement.classList.contains("remove-task") ||
    e.target.parentElement.parentElement.classList.contains("remove-task")
  ) {
    const taskId = e.target.closest("li").id;
    removeTask(taskId);
  }
});

function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id != parseInt(taskId));

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById(taskId).remove();

  countTasks();
}

todoList.addEventListener("input", (e) => {
  const taskId = e.target.closest("li").id;

  updateTask(taskId, e.target);
});

function updateTask(taskId, el) {
  const task = tasks.find((task) => task.id == parseInt(taskId));

  if (el.hasAttribute("contenteditable")) {
    task.name = el.textContent;
  } else {
    const span = el.nextElementSibling;
    const parent = el.closest("li");
    task.isCompleted = !task.isCompleted;

    if (task.isCompleted) {
      span.removeAttribute("contenteditable");
      parent.classList.add("complete");
    } else {
      span.setAttribute("contenteditable", true);
      parent.classList.remove("complete");
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  countTasks();
}

todoList.addEventListener("keydown", (e) => {
  if (e.keycode == 13) {
    e.preventDefault();
    e.target.blur();
  }
});
