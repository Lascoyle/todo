// Global variables

let task = document.querySelector('.task-to-add');
let tasksList = document.querySelector('.tasks-list');
let submitBtn = document.querySelector('.submit-btn');
let filterTasks = document.querySelector('.filter-tasks')

// Creation of a task and all his related options
function submitTask(event) {
    event.preventDefault();
    let taskElmt = document.createElement("li");
    taskElmt.classList.add("task-container", "added-task")
    tasksList.appendChild(taskElmt);
    let taskText = document.createTextNode(task.value);
    taskElmt.appendChild(taskText);
    let taskBtnContainer = document.createElement("div");
    taskElmt.appendChild(taskBtnContainer);

    function addStatusBtn() {
        let statusBtn = document.createElement("button");
        statusBtn.classList.add("status-btn")
        let textStatusBtn = document.createTextNode("En cours");
        statusBtn.appendChild(textStatusBtn);
        taskBtnContainer.appendChild(statusBtn);
        taskElmt.classList.add("uncomplete")

        function taskIsDone() {
            taskElmt.style.textDecoration = "line-through";
            statusBtn.innerText = "🗸 Accomplie"
            taskElmt.style.backgroundColor = "var(--tertiary-color)"
            taskElmt.style.textIndent = "30px"
            taskElmt.style.fontSize = "1.6rem"
            taskElmt.classList.remove("uncomplete")
            taskElmt.classList.add("complete")
        }

        statusBtn.addEventListener('click', taskIsDone)
    }

    function addDeletionBtn() {
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn")
        let textBtn = document.createTextNode("✘");
        deleteBtn.appendChild(textBtn);
        taskBtnContainer.appendChild(deleteBtn);

        function deleteTask() {
            let task = taskBtnContainer.parentNode;
            task.classList.add('dropped-task');
            task.addEventListener('animationend', function () {
                task.remove();
                removeLocalTasks(task);
            })
        }
        deleteBtn.addEventListener('click', deleteTask)
    }

    addStatusBtn();
    addDeletionBtn();

    saveLocalTasks(task.value); //Method call for storing the task
}

// Display option with filter for tasks
function applyFilter(event) {
    let tasksToDo = tasksList.childNodes
    tasksToDo.forEach(function(taskToDo) {
        switch(event.target.value) {
            case "all":
                taskToDo.style.display = "flex"
                break;
            case "complete":
                if (taskToDo.classList.contains("complete")) {
                    taskToDo.style.display = "flex"
                } else {
                    taskToDo.style.display = "none"
                }
                break
                case "uncomplete":
                if (taskToDo.classList.contains("uncomplete")) {
                    taskToDo.style.display = "flex"
                } else {
                    taskToDo.style.display = "none"
                }
        }
    });
}

submitBtn.addEventListener('click', submitTask);
filterTasks.addEventListener('input', applyFilter)


// Store tasks in the local storage in the browser and keeps them in memory when browser is closed
function saveLocalTasks(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {
        let taskElmt = document.createElement("li");
        taskElmt.classList.add("task-container")
        tasksList.appendChild(taskElmt);
        let taskText = document.createTextNode(task);
        taskElmt.appendChild(taskText);
        let taskBtnContainer = document.createElement("div");
        taskElmt.appendChild(taskBtnContainer);

        function addStatusBtn() {
            let statusBtn = document.createElement("button");
            statusBtn.classList.add("status-btn")
            let textStatusBtn = document.createTextNode("En cours");
            statusBtn.appendChild(textStatusBtn);
            taskBtnContainer.appendChild(statusBtn);
            taskElmt.classList.add("uncomplete")

            function taskIsDone() {
                taskElmt.style.textDecoration = "line-through";
                statusBtn.innerText = "🗸 Accomplie"
                taskElmt.style.backgroundColor = "var(--tertiary-color)"
                taskElmt.style.textIndent = "30px"
                taskElmt.style.fontSize = "1.6rem"
                taskElmt.classList.remove("uncomplete")
                taskElmt.classList.add("complete")
            }

            statusBtn.addEventListener('click', taskIsDone)
        }

        function addDeletionBtn() {
            let deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn")
            let textBtn = document.createTextNode("✘");
            deleteBtn.appendChild(textBtn);
            taskBtnContainer.appendChild(deleteBtn);

            function deleteTask() {
                let task = taskBtnContainer.parentNode;
                task.classList.add('dropped-task');
                task.addEventListener('animationend', function () {
                    task.remove();
                    removeLocalTasks(task);
                })
            }
            deleteBtn.addEventListener('click', deleteTask)
        }

        addStatusBtn();
        addDeletionBtn();

        function removeLocalTasks(task) {
            let tasks;
            if (localStorage.getItem("tasks") === null) {
                tasks = [];
            } else {
                tasks = JSON.parse(localStorage.getItem("tasks"));
            }

            console.log('caca');
            console.log(task);

            let taskIndex = task.children[0].innerText;
            console.log(taskIndex);

            tasks.splice(tasks.indexOf(taskIndex), 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    })
}

document.addEventListener("DOMContentLoaded", getTasks);
