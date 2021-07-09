const { ipcRenderer } = require('electron');
const LOGIN = require('./events/login.js');

const enter = function () {
    if (event.keyCode == 13)
        login();
};

const login = function () {
    let id = document.getElementById('id');
    let pass = document.getElementById('pass');
    ipcRenderer.send(LOGIN.SIGNIN_REQUEST, { id: id.value, pwd: pass.value });
};

ipcRenderer.on(LOGIN.SIGNIN_COMPLETE, (event, args) => {
    console.log("login complete");
    location.href = "file://pages/index.html";
});

ipcRenderer.on(LOGIN.SIGNIN_FAILURE, (event, args) => {
    console.log(args); //error message
    alert("로그인에 실패했습니다.");
});
