const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("new-tasks");

function addTask(userInput){
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  listItem.appendChild(checkBox);

  let taskText = document.createElement("span");
  taskText.textContent = userInput;
  listItem.appendChild(taskText);
  
  todoList.appendChild(listItem);
}


todoForm.addEventListener("submit", 
  function (event) {
    event.preventDefault();

    let newTask =  todoInput.value;

    if(newTask === ""){
      alert("Please enter a non-empty task");
      return;
    }

    addTask(newTask);
    todoInput.value = "";
  }
  
);