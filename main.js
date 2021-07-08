const {app, BrowserWindow} = require('electron');

app.on('ready', ()=>{
    console.log(`ready`);

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        width:1280,
        height:720,
        frame:true,
        show:false
    })
    win.removeMenu();
    win.loadURL(`file://${__dirname}/index.html`)

    win.on('ready-to-show',()=>{
        win.show();
    });

    win.on('show',()=>{
        console.log('show');
    })

    win.on('hide',()=>{
        console.log('hide');
    })
})

app.on('window-all-close', ()=>{
    console.log('window-all-closed')
    app.quit
})

app.on('before-quit', event => {
    // event.preventDefault();
    console.log('before-quit');
})

app.on('will-quit', event => {
    // event.preventDefault();
    console.log('will-quit');
})

app.on('quit', (event, exitCode) => {
    console.log(`quit : ${exitCode}`);
})