"use strict";
let i = setInterval(function () {
    clearInterval(i);
    document.getElementById("loading").style.display = "none";
    document.getElementById("content").style.display = "block";
}, 6000);
let userLogged = JSON.parse(localStorage.getItem('userLogged') || '{}');
let logged = document.querySelector('#logged');
let btnLogout = document.querySelector('#logout');
let btnSave = document.querySelector('#btn-save');
let tableData = document.getElementById('tblData');
let modal = new bootstrap.Modal('#exampleModal');
let inputDescription = document.getElementById('recipient-name');
let inputDetails = document.getElementById('recipient-details');
logged.innerHTML = userLogged.userName;
let logout = document.querySelector('#logout');
if (localStorage.getItem('token') == null) {
    alert('You need to be logged in to access the app!');
    location.href = 'index.html';
}
;
function logoutSystem() {
    localStorage.removeItem('token');
    alert('Always come back!');
    location.href = 'index.html';
}
;
btnLogout.addEventListener('click', logoutSystem);
btnSave.addEventListener('click', saveData);
document.addEventListener('DOMContentLoaded', viewTasks);
function saveData() {
    let listTasks = getDataUser();
    let lastId = listTasks.length + 1;
    if (listTasks.length >= 2) {
        let lastTask = listTasks.reduce((previousTask, currentTask) => {
            if (previousTask.id > currentTask.id) {
                return previousTask;
            }
            else {
                return currentTask;
            }
        });
        lastId = lastTask.id + 1;
    }
    let newTask = {
        id: lastId,
        description: inputDescription.value,
        details: inputDetails.value
    };
    listTasks.push(newTask);
    render(newTask);
    saveStorage(listTasks);
    inputDescription.value = '';
    inputDetails.value = '';
    swal("Post created successfully!", {
        buttons: false,
        timer: 3000,
        icon: "success",
    });
    modal.hide();
}
function render(newTask) {
    let rowTable = document.createElement('tr');
    let columnId = document.createElement('td');
    let columnDescription = document.createElement('td');
    let columnDetails = document.createElement('td');
    let columnActions = document.createElement('td');
    let buttonEdit = document.createElement('button');
    let buttonDelete = document.createElement('button');
    rowTable.setAttribute('id', `${newTask.id}`);
    buttonEdit.setAttribute('data-bs-toggle', 'modal');
    buttonEdit.setAttribute('data-bs-target', '#exampleModal');
    buttonEdit.setAttribute('class', 'btn btn-primary rounded-pill btnAction');
    buttonEdit.innerHTML = 'Edit';
    buttonEdit.addEventListener('click', () => {
        settings(newTask.id);
    });
    buttonDelete.setAttribute('class', 'btn btn-danger rounded-pill btnAction');
    buttonDelete.innerHTML = 'Delete';
    buttonDelete.addEventListener('click', () => {
        deleteTask(newTask.id);
    });
    columnId.innerHTML = `${newTask.id}`;
    columnDescription.innerHTML = newTask.description;
    columnDetails.innerHTML = newTask.details;
    columnActions.appendChild(buttonEdit);
    columnActions.appendChild(buttonDelete);
    rowTable.appendChild(columnId);
    rowTable.appendChild(columnDescription);
    rowTable.appendChild(columnDetails);
    rowTable.appendChild(columnActions);
    tableData.appendChild(rowTable);
}
function saveStorage(listTasks) {
    let listUsers = JSON.parse(localStorage.getItem('list'));
    let indexUserLogged = listUsers.findIndex((user) => user.userName === userLogged.userName);
    listUsers[indexUserLogged].tasks = listTasks;
    localStorage.setItem('list', JSON.stringify(listUsers));
}
function getDataUser() {
    let listUsers = JSON.parse(localStorage.getItem('list'));
    let dataUserLogged = listUsers.find((user) => user.userName === userLogged.userName);
    return dataUserLogged.tasks;
}
function viewTasks() {
    let listTasks = getDataUser();
    if (listTasks) {
        for (const task of listTasks) {
            render(task);
        }
    }
}
function settings(id) {
    let btnEdit = document.getElementById('btn-edit');
    btnSave.setAttribute('style', 'display: none');
    btnEdit.setAttribute('style', 'display: inline-block');
    let tasksUserLogged = getDataUser();
    let taskEdit = tasksUserLogged.find((task) => task.id === id);
    if (taskEdit) {
        inputDescription.value = taskEdit.description;
        inputDetails.value = taskEdit.details;
    }
    btnEdit.addEventListener('click', () => {
        editTask(id);
    });
}
function editTask(id) {
    let tasksUserLogged = getDataUser();
    let indexTaskEdit = tasksUserLogged.findIndex((task) => task.id === id);
    let newTaskEdit = {
        id: id,
        description: inputDescription.value,
        details: inputDetails.value
    };
    tasksUserLogged[indexTaskEdit] = newTaskEdit;
    saveStorage(tasksUserLogged);
    alert('Post changed!');
    modal.hide();
    location.reload();
}
function deleteTask(id) {
    let tasksUserLogged = getDataUser();
    let indexTaskDelete = tasksUserLogged.findIndex((task) => task.id === id);
    let confirmDelete = confirm(`Are you sure you want to delete the post ${id}?`);
    if (confirmDelete) {
        let rowsTable = document.querySelectorAll('tbody > tr');
        for (let row of rowsTable) {
            if (Number(row.id) == id) {
                tableData.removeChild(row);
                tasksUserLogged.splice(indexTaskDelete, 1);
                swal("Post removed!", {
                    buttons: false,
                    timer: 3000,
                    icon: "success",
                });
            }
        }
        saveStorage(tasksUserLogged);
    }
}
