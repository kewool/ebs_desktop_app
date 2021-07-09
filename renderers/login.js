const { ipcRenderer } = require('electron');

const enter = function () {
    if (event.keyCode == 13)
        login();
}

const login = function () {
    let id = document.getElementById('id');
    let pass = document.getElementById('pass');
    ipcRenderer.send('login', { id: id.value, pwd: pass.value });
}

ipcRenderer.on('login-complete', (event, args) => {
    console.log("login complete");
    //다음 페이지 전환
})

ipcRenderer.on('login-failure', (event, args) => {
    console.log(args); //error message
    //오류 메세지 띄움
});