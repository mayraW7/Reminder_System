let i = setInterval(function () {
    clearInterval(i);

    (<HTMLElement>document.getElementById("loading")).style.display = "none";
    (<HTMLElement>document.getElementById("content")).style.display = "block";

}, 3000);

let userLogged = JSON.parse(localStorage.getItem('userLogged') || '{}');
let logged = (<HTMLElement>document.querySelector('#logged'));
let btnLogout = (<HTMLButtonElement>document.querySelector('#logout'));
let btnSave = (<HTMLButtonElement>document.querySelector('#btn-save'));
let tableData = document.getElementById('tblData') as HTMLTableElement;
let modal = new bootstrap.Modal ('#exampleModal');
let inputDescription = document.getElementById('recipient-name') as HTMLInputElement;
let inputDetails = document.getElementById('recipient-details') as HTMLInputElement;

declare var swal : any;

logged.innerHTML = userLogged.userName;

let logout = (<HTMLButtonElement>document.querySelector('#logout'));

if(localStorage.getItem('token') == null){  
    alert('You need to be logged in to access the app!');
    location.href = 'index.html';
};

function logoutSystem() {
    localStorage.removeItem('token');
    alert('Always come back!');
    location.href = 'index.html';
};

btnLogout.addEventListener('click', logoutSystem);
btnSave.addEventListener('click', saveData);
document.addEventListener('DOMContentLoaded', viewTasks);

interface Task {
    id: number,
    description: string,
    details: string
}

function saveData() {

    let listTasks: Task[] = getDataUser();
    let lastId = listTasks.length + 1;

    if (listTasks.length >= 2) {
        let lastTask: Task = listTasks.reduce((previousTask, currentTask) => {
            if (previousTask.id > currentTask.id) {
                return previousTask
            } else {
                return currentTask
            }
        });

        lastId = lastTask.id + 1;
    }

    let newTask: Task = {
            id: lastId,
            description: inputDescription.value,
            details: inputDetails.value
        } 

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

function render(newTask: Task) {
    let rowTable: HTMLTableRowElement = document.createElement('tr');
    let columnId: HTMLTableCellElement = document.createElement('td');
    let columnDescription: HTMLTableCellElement = document.createElement('td');
    let columnDetails: HTMLTableCellElement = document.createElement('td');
    let columnActions: HTMLTableCellElement = document.createElement('td');
    let buttonEdit: HTMLButtonElement = document.createElement('button');
    let buttonDelete: HTMLButtonElement = document.createElement('button');

    rowTable.setAttribute('id', `${newTask.id}`);
    buttonEdit.setAttribute('data-bs-toggle', 'modal');
    buttonEdit.setAttribute('data-bs-target', '#exampleModal');
    buttonEdit.setAttribute('class', 'btn btn-primary btnAction');
    buttonEdit.innerHTML = 'Edit';
    buttonEdit.addEventListener('click', () => {
        settings(newTask.id);
    });

    buttonDelete.setAttribute('class', 'btn btn-danger btnAction');
    buttonDelete.innerHTML = 'Delete';
    buttonDelete.addEventListener('click', () => {
        deleteTask(newTask.id);
    })
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

function saveStorage(listTasks: Task[]) {
    let listUsers = JSON.parse(localStorage.getItem('list')!);
    let indexUserLogged: number = listUsers.findIndex((user: any) => user.userName === userLogged.userName);

    listUsers[indexUserLogged].tasks = listTasks;
    localStorage.setItem('list', JSON.stringify(listUsers));
}

function getDataUser(): any {
    let listUsers: any[] = JSON.parse(localStorage.getItem('list')!);
    let dataUserLogged = listUsers.find((user: any) => user.userName === userLogged.userName);

    return dataUserLogged.tasks
}

function viewTasks() {

    let listTasks: Task[] = getDataUser();

    if (listTasks) {
        for (const task of listTasks) {
            render(task);
        }
    }
}

function settings(id: number) {
    let btnEdit = document.getElementById('btn-edit') as HTMLButtonElement;
    btnSave.setAttribute('style', 'display: none');
    btnEdit.setAttribute('style', 'display: inline-block');
    let tasksUserLogged: Task[] = getDataUser();
    let taskEdit = tasksUserLogged.find((task) => task.id === id);

    if (taskEdit) {
        inputDescription.value = taskEdit.description;
        inputDetails.value = taskEdit.details;
    }

    btnEdit.addEventListener('click', () => {
        editTask(id);
    });

}

function editTask(id: number) {

    let tasksUserLogged: Task[] = getDataUser();
    let indexTaskEdit = tasksUserLogged.findIndex((task) => task.id === id);

    let newTaskEdit: Task = {
        id: id,
        description: inputDescription.value,
        details: inputDetails.value
    }

    tasksUserLogged[indexTaskEdit] = newTaskEdit;
    saveStorage(tasksUserLogged);
    alert('Post changed!');   
    modal.hide();
    location.reload();
}

function deleteTask(id: number) {

    let tasksUserLogged: Task[] = getDataUser();
    let indexTaskDelete = tasksUserLogged.findIndex((task) => task.id === id);
    let confirmDelete: boolean = confirm(`Are you sure you want to delete the post ${id}?`);

    if (confirmDelete) {
        let rowsTable: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('tbody > tr');

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