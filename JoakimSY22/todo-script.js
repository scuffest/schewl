const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("new-tasks");

function addTask(userInput) {
  let listItem = document.createElement("li");
  
  let checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  listItem.appendChild(checkBox);

  let taskText = document.createElement("span");
  taskText.textContent = userInput;
  taskText.classList.add("task-text");
  listItem.appendChild(taskText);

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add("delete-btn");

  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);

  checkBox.addEventListener("change", function() {
    if (checkBox.checked) {
      taskText.style.textDecoration = "line-through";
    } else {
      taskText.style.textDecoration = "none";
    }
  });

  deleteButton.addEventListener("click", function() {
    todoList.removeChild(listItem);
  });
}

todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let newTask = todoInput.value;

  if (newTask === "") {
    alert("Please enter a non-empty task");
    return;
  }

  addTask(newTask);
  todoInput.value = "";
});
