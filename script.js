// Seletores
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

// Functions
function addTodo(event) {
    if(todoInput.value !== ''){
         //previnir padrão do botão
    event.preventDefault();

    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Todoli
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    saveLocalTodos(todoInput.value);
    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerText = 'Mark';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerText = 'Trash';
    trashButton.classList.add('delet-btn');
    todoDiv.appendChild(trashButton);

    // Append to List
    todoList.appendChild(todoDiv);
    //Clear input
    todoInput.value = '';
    }
   
}
function deleteCheck(event) {
    const item = event.target;
    //delete Todo
    if(item.classList[0] === 'delet-btn'){
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
        
    }
    //check mark
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo => {
        
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Todoli
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerText = 'Mark';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    // Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerText = 'Trash';
    trashButton.classList.add('delet-btn');
    todoDiv.appendChild(trashButton);

    // Append to List
    todoList.appendChild(todoDiv);
    }));
}
function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}