// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
addTaskBtn.addEventListener('click', addTask);

// Add task function
function addTask() {
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        removeTaskFromLocalStorage(taskText);
    });

    // Toggle completion on click
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        toggleTaskCompletionInLocalStorage(taskText);
    });

    // Append delete button to list item
    li.appendChild(deleteBtn);

    // Append list item to task list
    taskList.appendChild(li);

    // Save task to local storage
    saveTaskToLocalStorage(taskText, false);

    // Clear input field
    taskInput.value = '';
}

// Save task to local storage
function saveTaskToLocalStorage(task, completed) {
    let tasks = getTasksFromLocalStorage();
    tasks.push({ text: task, completed: completed });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        // Create list item
        const li = document.createElement('li');
        li.textContent = task.text;

        // Mark as completed if necessary
        if (task.completed) {
            li.classList.add('completed');
        }

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
            removeTaskFromLocalStorage(task.text);
        });

        // Toggle completion on click
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            toggleTaskCompletionInLocalStorage(task.text);
        });

        // Append delete button to list item
        li.appendChild(deleteBtn);

        // Append list item to task list
        taskList.appendChild(li);
    });
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Remove task from local storage
function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t.text !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Toggle task completion in local storage
function toggleTaskCompletionInLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(t => {
        if (t.text === task) {
            t.completed = !t.completed;
        }
        return t;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
