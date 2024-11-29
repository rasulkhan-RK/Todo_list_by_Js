let todoList;

loadTodoList();

function addTodo() {
  let inputElement = document.querySelector(".input_element");
  let todo = inputElement.value.trim();
  if (todo === "") {
    return alert("Please enter todo");
  }
  todoList.push(todo);
  saveTodoList();
  displayTodo();
  inputElement.value = "";
}

function displayTodo() {
  let todoListsContainer = document.querySelector(".todo_lists");

  let newTodo = "";
  for (let i = 0; i < todoList.length; i++) {
    todo = todoList[i];

    newTodo += `
    <div class="todo_list">
    <div class="list_input">
    <input type="checkbox" class="checkbox_Input" onclick="checkedTodo(${i})" />
    <input type="text" class="text_input" value="${todo}" disabled />
    </div>

    <div class="list_btn" >
    <button data-set="${i}" class="edit-btn" onclick="editTodo(${i})">
      <i class="fa-solid fa-pen"></i>
    </button>
    <button class="delete-btn" onclick="deleteTodo(${i})">
      <i class="fa-solid fa-trash"></i>
    </button>
    </div>

    </div>
    `;
  }

  todoListsContainer.innerHTML = newTodo;
}

function editTodo(index) {
  let inputField = document.querySelectorAll(".text_input")[index];
  let editBtn = document.querySelectorAll(".edit-btn")[index];
  if (inputField.disabled) {
    inputField.disabled = false;
    inputField.focus();
    editBtn.innerHTML = `<i class="fa-solid fa-save"></i>`;
  } else {
    inputField.disabled = true;
    todoList[index] = inputField.value || "Please update todo";
    editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
    saveTodoList();
    displayTodo();
  }
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodoList();
  displayTodo();
}

function checkedTodo(index) {
  let inputField = document.querySelectorAll(".text_input")[index];
  let editBtn = document.querySelectorAll(".edit-btn")[index];
  inputField.classList.toggle("complete");
  editBtn.classList.toggle("disabled");
}

function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function loadTodoList() {
  const saveTodoList = localStorage.getItem("todoList");
  todoList = saveTodoList ? JSON.parse(saveTodoList) : [];
  displayTodo();
}
