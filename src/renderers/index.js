const { ipcRenderer } = require('electron');
const CLASS = require('../events/class.js');
const $ = require('jquery');

$(() => {
    ipcRenderer.send(CLASS.CLASS_LIST_REQUEST);
});

ipcRenderer.on(CLASS.CLASS_LIST_RESPONSE, (event, data) => {
    console.log(data.data);
    $("div.panel").empty();
    for (let item of data.data.list) {
        $("div.panel").append(`<div class="obj">
            <a href="./course.html?classUrlPath=${encodeURI(item.classUrlPath)}" class="padding">
                <p class="obj_text">${item.className}</p>
            </a>
        </div>`);
    }
});

ipcRenderer.on(CLASS.CLASS_LIST_FAILURE, () => {
    ipcRenderer.send(CLASS.CLASS_LIST_REQUEST);
});