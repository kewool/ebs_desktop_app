const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');

app.on('ready', () => {
    console.log(`ready`);

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        width: 1280,
        height: 720,
        show: false
    })
    win.loadURL(`file://${__dirname}/login.html`)

    win.on('ready-to-show', () => {
        win.show();
    });
})

app.on('quit', (event, exitCode) => {
    console.log(`quit : ${exitCode}`);
})

ipcMain.on('login', (event, args) => {
    let { id, pwd } = args;
    console.log(id, pwd)
});