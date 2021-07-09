const { ipcRenderer } = require('electron');
const CLASS = require('./events/class.js');
const $ = require('jquery');

$(() => {
    ipcRenderer.send(CLASS.CLASS_LIST_REQUEST);
});

ipcRenderer.on(CLASS.CLASS_LIST_RESPONSE, (data) => {
    console.log(data);
});

ipcRenderer.on(CLASS.CLASS_LIST_FAILURE, () => {
    ipcRenderer.send(CLASS.CLASS_LIST_REQUEST);
});