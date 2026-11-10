// Get the HTML elements we need
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");
const pendingTasks = document.getElementById("pending-tasks");

const emptyMessage = document.getElementById("empty-message");


// Store tasks in an array
let tasks = [];


// Listen for form submission
taskForm.addEventListener("submit", function(event) {

    // Prevent the page from refreshing
    event.preventDefault();

    const taskName = taskInput.value.trim();

    // Check that the input is not empty
    if (taskName === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a new task
    const newTask = {
        id: Date.now(),
        name: taskName,
        completed: false
    };

    // Add task to the array
    tasks.push(newTask);

    // Display updated tasks
    displayTasks();

    // Clear the input
    taskInput.value = "";

});


// Display tasks on the page
function displayTasks() {

    // Clear existing task elements
    taskList.innerHTML = "";

    // Loop through the tasks array
    tasks.forEach(function(task) {

        const listItem = document.createElement("li");

        listItem.className = "task-item";

        if (task.completed) {
            listItem.classList.add("completed");
        }

        // Create task name
        const taskName = document.createElement("span");

        taskName.className = "task-name";
        taskName.textContent = task.name;

        // Create action buttons container
        const actions = document.createElement("div");

        actions.className = "task-actions";

        // Create complete button
        const completeButton = document.createElement("button");

        completeButton.textContent =
            task.completed ? "Undo" : "Complete";

        completeButton.className = "complete-btn";

        completeButton.addEventListener("click", function() {
            toggleTask(task.id);
        });

        // Create delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        // Add buttons to container
        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        // Add everything to the list item
        listItem.appendChild(taskName);
        listItem.appendChild(actions);

        // Add task to the page
        taskList.appendChild(listItem);

    });

    // Update task statistics
    updateStatistics();

}


// Mark a task as completed or pending
function toggleTask(taskId) {

    tasks = tasks.map(function(task) {

        if (task.id === taskId) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;

    });

    displayTasks();

}


// Delete a task
function deleteTask(taskId) {

    tasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });

    displayTasks();

}


// Update task statistics
function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;

    // Show empty message when there are no tasks
    emptyMessage.style.display =
        total === 0 ? "block" : "none";

}