const { ipcRenderer } = require('electron');
const LESSON = require('./events/lesson.js');
const $ = require('jquery');

$(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams);
    ipcRenderer.send(LESSON.LESSON_REQUEST);
});

ipcRenderer.on(LESSON.LESSON_RESPONSE, (event, data) => {
    console.log(data.data);
    $("div.board").empty();
    for (let i in data.data.list) {
        $("div.board").append(`<a class="board_box board_box_last" href="./">
        <img class="img_size" src="file://public/play-button.svg" onclick="video(${i});">
        <p class="board_box_text">${i+1}강</p>
    </a>`);
    }
});

ipcRenderer.on(LESSON.LESSON_FAILURE, () => {
    ipcRenderer.send(LESSON.LESSON_REQUEST);
});