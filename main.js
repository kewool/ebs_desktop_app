const {app, BrowserWindow} = require('electron');

app.on('ready', ()=>{
    console.log(`ready`);

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
        },
        width:1280,
        height:720,
        show:false
    })
    win.removeMenu();
    win.loadURL(`file://${__dirname}/login.html`)

    win.on('ready-to-show',()=>{
        win.show();
    });
})

app.on('quit', (event, exitCode) => {
    console.log(`quit : ${exitCode}`);
})