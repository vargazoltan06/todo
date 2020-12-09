'use strict';

const date = document.querySelector('.date');
const textInput = document.querySelector('.input__text');
const inputButton = document.querySelector('.input__button');
const todoListElements = [];

const displayDate = (() => {
    const dateNow = new Date().toDateString();
    date.textContent = dateNow;
})();

const addTasksToList = (text) => {
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };
    todoListElements.push(todo);
    console.log(todoListElements);
};

inputButton.addEventListener('submit', event => {
    event.preventDefault();
    const text = textInput.value;
    console.log(text);
});

addTasksToList();
