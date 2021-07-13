const { app, BrowserWindow } = require('electron');
const { protocol } = require('electron');
const path = require('path');

const createWindow = () => {
    protocol.registerFileProtocol('ebsoc', (request, callback) => {
        const url = request.url.substr(`ebsoc://`.length);
        callback({ path: path.normalize(`${__dirname}/${url}`) });
    });

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        },
        width: 1280,
        height: 720,
        minWidth: 960,
        minHeight: 540
    });

    win.loadURL(`file://${__dirname}/pages/login.html`);
};

app.on('ready', () => {
    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

require('./updater');
require('./ipcHandler');