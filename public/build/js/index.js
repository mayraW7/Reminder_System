"use strict";
const signUpButton = document.querySelector('#signUp');
const signInButton = document.querySelector('#signIn');
const content = document.querySelector('.content');
const btnLogin = document.querySelector('#btn-login');
const painelRight = document.querySelector("#formLogin");
signUpButton.addEventListener('click', () => {
    content.classList.add("right-panel-active");
    painelRight.style.opacity = "0";
});
signInButton.addEventListener('click', () => {
    content.classList.remove("right-panel-active");
    painelRight.style.opacity = "1";
});
//login - validations
function login() {
    let userNameLogin = document.querySelector('#inputUsernameLogin').value;
    let passwordRegister = document.querySelector('#inputPasswordLogin').value;
    if (userNameLogin === '' || passwordRegister === '') {
        swal("Fill in all fields!");
        document.querySelector('#inputUsernameLogin').focus();
        return;
    }
    let list = [];
    let validList = {
        userName: '',
        password: ''
    };
    list = JSON.parse(localStorage.list);
    if (userNameLogin == '' || passwordRegister == '') {
        swal("Fill in all fields!");
        document.querySelector('#inputUsernameLogin').focus();
        return false;
    }
    ;
    list.forEach((item) => {
        if (userNameLogin == item.userName && passwordRegister == item.password) {
            validList = {
                userName: item.userName,
                password: item.password
            };
        }
    });
    if (userNameLogin == '' || passwordRegister == '') {
        swal("Fill in all fields!");
        document.querySelector('#inputUsernameLogin').focus();
        return false;
    }
    ;
    if (userNameLogin == "" || userNameLogin.length <= 3) {
        swal("UserName must be at least 4 characters!");
        document.querySelector('#inputUsernameLogin').focus();
        return false;
    }
    ;
    if (userNameLogin.search(/[^a-z0-9]/i) != -1) {
        swal("Special characters are not allowed in this field!");
        document.querySelector('#inputUsernameLogin').focus();
        return false;
    }
    ;
    if (userNameLogin.search(/\s/g) != -1) {
        swal("This field cannot have a blank space!");
        document.querySelector('#inputUsernameLogin').focus();
        return false;
    }
    ;
    if (passwordRegister == "" || passwordRegister.length <= 3) {
        swal("Password must be at least 4 characters!");
        return false;
    }
    ;
    if (passwordRegister.search(/\s/g) != -1) {
        swal("This field cannot have a blank space!");
        document.querySelector('#inputPasswordRegister').focus();
        return false;
    }
    ;
    if (passwordRegister == "" || passwordRegister.length <= 3) {
        swal("To confirm you need at least 4 characters!");
        document.querySelector('#inputPasswordRegister').focus();
        return false;
    }
    ;
    if (userNameLogin == validList.userName && passwordRegister == validList.password) {
        location.href = 'reminder.html';
        let token = Math.random().toString(16).substring(2);
        localStorage.setItem('token', token);
        localStorage.setItem('userLogged', JSON.stringify(validList));
    }
    else {
        swal("Invalid username and/or password!");
        document.querySelector('#inputUsernameLogin').value = '';
        document.querySelector('#inputPasswordLogin').value = '';
        document.querySelector('#inputUsernameLogin').focus();
    }
    ;
}
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    login();
});
//password
let forgotPassword = document.querySelector('#link-forgot');
forgotPassword.addEventListener('click', () => {
    foundUser();
});
function foundUser() {
    let promptUser = prompt('Enter username!');
    let listUser = JSON.parse(localStorage.list);
    let found = listUser.find((user) => user.userName == promptUser);
    if (!found) {
        alert('Username not found or not exist!');
        return;
    }
    confirm(`Your password is: ${found.password}`);
}
;
