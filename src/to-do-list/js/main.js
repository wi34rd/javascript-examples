function createTask(taskText) {
    const taskElement = document.createElement('li');
    taskElement.appendChild(document.createTextNode(taskText + ' '));

    const removeLink = document.createElement('a');
    removeLink.appendChild(document.createTextNode('[×]'));
    removeLink.setAttribute('href', '#');
    removeLink.classList.add('task-list__remove-link');
    taskElement.appendChild(removeLink);

    return taskElement;
}

function storeTaskInLocalStorage(taskText) {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks === null ? [] : JSON.parse(tasks);
    tasks.push(taskText);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

;(function () {
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

        taskList.appendChild(createTask(newTask.value));

        storeTaskInLocalStorage(newTask.value);

        newTask.value = '';

        event.preventDefault();
    });

    taskList.addEventListener('click', function (event) {
        if (event.target.classList.contains('task-list__remove-link')) {
            if (confirm('Are you sure?')) {
                const taskIndex = Array.prototype.indexOf.call(taskList.children, event.target.parentNode);

                event.target.parentNode.remove();

                const tasks = JSON.parse(localStorage.getItem('tasks'));
                tasks.splice(taskIndex, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }

        if (taskList.childNodes.length == 0) {
            taskListEmptyWarning.style.display = '';
        }

        event.preventDefault();
    });

    clearTasks.addEventListener('click', function () {
        // taskList.innerHTML = '';

        while (taskList.firstChild) {
            taskList.firstChild.remove();
        }

        localStorage.removeItem('tasks');

        taskListEmptyWarning.style.display = '';
    });

    taskFilter.addEventListener('keyup', function (event) {
        const filterText = event.target.value.toLowerCase();

        Array.prototype.forEach.call(taskList.children, function (task) {
            if (task.innerText.includes(filterText)) {
                task.style.display = '';
            } else {
                task.style.display = 'none';
            }
        });
    });

    const tasks = localStorage.getItem('tasks');

    if (tasks !== null) {
        JSON.parse(tasks).forEach((taskText) => {
            taskList.appendChild(createTask(taskText));
        });
    }
})();
