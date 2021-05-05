//Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//Load all event listeners
loadEventListeners();

function loadEventListeners() {
form.addEventListener('submit', addTask);
clearBtn.addEventListener('click', clearTasks);
filter.addEventListener('keyup', filterTasks);
document.addEventListener('DOMContentLoaded', getTasks);
taskList.addEventListener('click', removeTask);
}

//Get tasks from local storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    createAndAppendTaskElement(task);
  })

}

//Creates li, adds task as textnode, adds the li element to the ul.
function createAndAppendTaskElement(task){
    //Create new li element
    const li = document.createElement('li');
    //Add materialize class name
    li.className = 'collection-item blue-grey';
    //Create text node from input value then append to li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    //Add delete-item and a materialize class name
    link.className = 'delete-item secondary-content';
    //Add icon HTML
    link.innerHTML = '<i class="fas fa-minus-circle red-text text-darken-2"></i>'
    //Append the link to li
    li.appendChild(link);
    //Append the li to the ul (taskList)
    taskList.appendChild(li);
}

//Add a task to the unordered list
function addTask(e) {
  //if input is empty then do not display alert or add empty task
  if (taskInput.value === '') {
    alert('Add a task');
  } else {
    createAndAppendTaskElement(taskInput.value);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
  }
  //prevent default event on form submit of reloading page.
  e.preventDefault();
}

//Store task in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  //push appends values to an array
  tasks.push(task);

  //JSON.stringify converts an array to a JSON string which can then be stored in local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear the unordered list
function clearTasks() {
  if(confirm('Are you sure you want to clear your tasks?')) {
    while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
  }
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure you want to delete this task?')) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  })
}