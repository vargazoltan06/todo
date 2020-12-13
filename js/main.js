'use strict';

const date = document.querySelector('.date');
const textInput = document.querySelector('.input__text');
const inputButton = document.querySelector('.input__button');
const todoListUl = document.querySelector('.tasks__list');
const clearAll = document.querySelector('.clearButton');
const todoItemNumberSpan = document.querySelector('.todoItemNumber');
let todoListElements = [];
let todo;

const init = () => {
    loadExistingTodos();
    numberOfItemsUpdate();
    deleteTodoItem();
    deleteAllItem();
}

const displayDate = (() => {
    const dateNow = new Date().toDateString();
    date.textContent = dateNow;
})();

const addTasksToList = () => {
    const value = textInput.value;
    if (value === '') {
        return
    } todo = {
        text: value,
        checked: false,
        id: Date.now(),
    };
    todoListElements.push(todo);
    localStorage.setItem('todos', JSON.stringify(todoListElements))
    showTodo(todo);
    textInput.value = '';
};


const numberOfItemsUpdate = () => {
    if (todoListElements.length === 0) {
        document.querySelector('.tasks__remain').classList.remove('tasks__remain--show')
    } else {
        document.querySelector('.tasks__remain').classList.add('tasks__remain--show')
        todoItemNumberSpan.textContent = todoListElements.length;
    }
}

inputButton.addEventListener('click', (ev) => {
    ev.preventDefault();
    addTasksToList();
    deleteTodoItem();
    deleteAllItem();
    numberOfItemsUpdate();
});

const showTodo = (todo) => {
    const li = document.createElement('div');
    li.classList.add('li-items', 'slide-in');
    li.innerHTML = `
    <label class="label">
    <input class="checkbox" type="checkbox"/>
    <span class="text">${todo.text}</span>
    </label>
    <span class="deleteButton"></span>`;
    if (!("key" in li.dataset)) {
        li.setAttribute('data-key', todo.id);
    }
    todoListUl.appendChild(li);
}

const deleteTodoItem = () => {
    let deleteButton = document.querySelectorAll('.deleteButton');
    deleteButton.forEach(item => item.addEventListener('click', deleteClickHandler));
}

const deleteClickHandler = (event) => {
    event.currentTarget.parentElement.remove();
    deleteTodoItemFromArray(parseInt(event.currentTarget.parentElement.getAttribute('data-key')));
    numberOfItemsUpdate();
    localStorage.setItem('todos', JSON.stringify(todoListElements));
};

const deleteTodoItemFromArray = (id) => {
    todoListElements = todoListElements.filter(item => item.id !== id);
}


const deleteAllItem = () => {
    clearAll.addEventListener('click', () => {
        todoListElements.length = 0;
        todoListUl.textContent = '';
        numberOfItemsUpdate();
        localStorage.removeItem('todos');

    });
}

const loadExistingTodos = () => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todoListElements = JSON.parse(savedTodos);
        todoListElements.forEach(todo => showTodo(todo));
    }
}


init();