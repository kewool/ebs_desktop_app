const { ipcRenderer } = require('electron');
const LESSON = require('../events/lesson.js');
const $ = require('jquery');

$(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams);
    ipcRenderer.send(LESSON.LESSON_REQUEST, params);
});

ipcRenderer.on(LESSON.LESSON_RESPONSE, (event, data) => {
    console.log(data.data);
    $("div.board").empty();
    for (let item of data.data.list) {
        $("div.board").append(`<a class="board_box board_box_last" href="./player.html?classUrlPath=${item.classUrlPath}&lessonSeq=${item.parentLessonSeq}&subLessonSeq=${item.lessonSeq}">
        <img class="img_size" src="electron://public/play-button.svg">
        <p class="board_box_text">${item.lessonName}</p>
    </a>`);
    }
});

ipcRenderer.on(LESSON.LESSON_FAILURE, () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams);
    setInterval(ipcRenderer.send, 1000, LESSON.LESSON_REQUEST, params);
    //ipcRenderer.send(LESSON.LESSON_REQUEST);
});