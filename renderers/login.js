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

})