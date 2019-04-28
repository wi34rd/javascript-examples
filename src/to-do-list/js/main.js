(function () {

const taskFilter = document.getElementById('task-filter');
const taskListEmptyWarning = document.getElementById('task-list-empty-warning');
const taskList = document.getElementById('task-list');
const clearTasks = document.getElementById('clear-tasks');
const newTaskForm = document.forms['new-task-form'];
const newTask = newTaskForm['new-task'];

newTaskForm.addEventListener('submit', function (event) {
    if (newTask.value === '') {
        alert('Enter a task.');
    }

    if (taskList.childNodes.length == 0) {
        taskListEmptyWarning.style.display = 'none';
    }

    const task = document.createElement('li');
    task.appendChild(document.createTextNode(newTask.value + ' '));

    const removeLink = document.createElement('a');
    removeLink.appendChild(document.createTextNode('[×]'));
    removeLink.setAttribute('href', '#');
    removeLink.classList.add('task-list__remove-link');
    task.appendChild(removeLink);

    taskList.appendChild(task);

    newTask.value = '';

    event.preventDefault();
});

taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('task-list__remove-link')) {
        this.removeChild(event.target.parentNode);
    }

    if (taskList.childNodes.length == 0) {
        taskListEmptyWarning.style.display = '';
    }

    event.preventDefault();
});

})();
