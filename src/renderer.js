const { ipcRenderer } = require('electron');

ipcRenderer.send('login', {id:"aaa", pwd:"bbb"});