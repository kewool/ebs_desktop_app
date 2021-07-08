const electron = require('electron')
const close = document.querySelector('#close')

close.addEventListener('click',()=>{
    const win = electron.BrowserWindow.getFocusedWindow();
    win.hide()
})