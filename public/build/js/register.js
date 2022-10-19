"use strict";
const btnRegister = document.querySelector('#btn-register');
let formRegister = document.querySelector('#formRegister');
let list = JSON.parse(localStorage.getItem('list') || '[]');
const clearFields = () => {
    document.querySelector('#inputUsernameRegister').value = '';
    document.querySelector('#inputPasswordRegister').value = '';
    document.querySelector('#inputConfPassRegister').value = '';
};
function register() {
    let userName = document.querySelector('#inputUsernameRegister').value;
    let passwordRegister = document.querySelector('#inputPasswordRegister').value;
    let confPassword = document.querySelector('#inputConfPassRegister').value;
    if (userName == "" || userName.length <= 3) {
        swal("UserName must be at least 4 characters!");
        document.querySelector('#inputUsernameRegister').focus();
        return false;
    }
    if (userName.search(/[^a-z0-9]/i) != -1) {
        swal("Special characters are not allowed in this field!");
        document.querySelector('#inputUsernameRegister').focus();
        return false;
    }
    if (userName.search(/\s/g) != -1) {
        swal("This field cannot have a blank space!");
        document.querySelector('#inputUsernameRegister').focus();
        return false;
    }
    if (passwordRegister == "" || passwordRegister.length <= 3) {
        swal("Password must be at least 4 characters!");
        return false;
    }
    if (passwordRegister.search(/\s/g) != -1) {
        swal("Hey guy!", "This field cannot have a blank space!");
        document.querySelector('#inputPasswordRegister').focus();
        return false;
    }
    if (passwordRegister == "" || passwordRegister.length <= 3) {
        swal("To confirm you need at least 4 characters!");
        document.querySelector('#inputConfPassRegister').focus();
        return false;
    }
    if (passwordRegister != confPassword) {
        swal("Passwords with different values!");
        document.querySelector('#inputConfPassRegister').focus();
        return false;
    }
    for (let index in list) {
        if (userName == list[index].userName) {
            swal(`there is already a user named ${list[index].userName} !`);
            clearFields();
            document.querySelector('#inputUsernameRegister').focus();
            return false;
        }
    }
    list.push({
        userName: userName,
        password: passwordRegister,
        tasks: []
    });
    localStorage.setItem('list', JSON.stringify(list));
    swal("Account created successfully!", {
        buttons: false,
        timer: 3000,
        icon: "success",
    });
    clearFields();
    document.querySelector('#inputUsernameRegister').focus();
}
btnRegister.addEventListener('click', (e) => {
    e.preventDefault();
    let userName = formRegister.inputUsernameRegister.value;
    let passwordRegister = formRegister.inputPasswordRegister.value;
    let confPassword = formRegister.inputConfPassRegister.value;
    if ((userName === null || userName === "")
        || (passwordRegister === null || passwordRegister === "")
        || (confPassword === null || confPassword === "")) {
        swal("All fields need to be filled in!");
    }
    else {
        register();
    }
});
