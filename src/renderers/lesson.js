var { ipcRenderer } = require('electron');
const LESSON = require('../events/lesson.js');
const $ = require('jquery');

$(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams);
    ipcRenderer.send(LESSON.LESSON_REQUEST, params);
});

ipcRenderer.on(LESSON.LESSON_RESPONSE, (event, data) => {
    console.log(data.data);
    $("div.panel").empty();
    for (let item of data.data.list) {
        $("div.panel").append(`<div class="obj">
            <a class="padding" href="./player.html?classUrlPath=${item.classUrlPath}&lessonSeq=${item.parentLessonSeq}&subLessonSeq=${item.lessonSeq}">
                <p class="obj_text">${item.lessonName}</p>
            </a>
        </div>`);
    }
});

ipcRenderer.on(LESSON.LESSON_FAILURE, () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams);
    setInterval(ipcRenderer.send, 1000, LESSON.LESSON_REQUEST, params);
    //ipcRenderer.send(LESSON.LESSON_REQUEST);
});