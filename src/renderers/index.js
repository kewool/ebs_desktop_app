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
<<<<<<< HEAD:renderers/index.js
        console.log(item)
        $(".panel").append(`<div class="obj">
            <a href="./${item.classUrlPath}" class="padding">
=======
        $("div.panel").append(`<div class="obj">
            <a href="./course.html?${item.classUrlPath}" class="padding">
>>>>>>> 8feda60d168067f23645e129b9f3c7f8836f97ab:src/renderers/index.js
                <p class="obj_text">${item.className}</p>
            </a>
        </div>`);
    }
});

ipcRenderer.on(CLASS.CLASS_LIST_FAILURE, () => {
    ipcRenderer.send(CLASS.CLASS_LIST_REQUEST);
});