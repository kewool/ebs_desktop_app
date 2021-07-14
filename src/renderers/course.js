const { ipcRenderer } = require('electron');
const COURSE = require('../events/course.js');
const $ = require('jquery');

const COURSE_STATUS = Object.freeze({
    ALL: "",
    BEFORE_LEARNING: "000",
    DURING_LEARNING: "001",
    COMPLETE_LEARNING: "002"
});

const COURSE_STATUS_TEXT = Object.freeze({
    "000": "학습하기",
    "001": "학습이어가기[수강중]",
    "002": "복습하기[학습완료]"
});

const COURSE_STATUS_CLASS = Object.freeze({
    "000": "btn_line_keycolor",
    "001": "btn_keycolor",
    "002": "btn_grey"
});

$(() => {
    if (window.location.search == "") return;
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams);
    ipcRenderer.send(COURSE.COURSE_REQUEST, params);
});

ipcRenderer.on(COURSE.COURSE_RESPONSE, (event, data) => {
    if (window.location.search == "") return;
    console.log(data);
    $("ul.student").empty();
    for (let item of data.data.list) {
        $("ul.student").append(`<li>
        <div class="info">
            <div class="tit eps2">${item.lessonName}</div>
        </div>
        <div class="bottom">
             <a href="./lesson.html${window.location.search}&lessonSeq=${item.lessonSeq}"
                class="btn ${COURSE_STATUS_CLASS[item.atltStsCd]}">${COURSE_STATUS_TEXT[item.atltStsCd]}</a>
        </div>
    </li>`);
    }
});

ipcRenderer.on(COURSE.COURSE_FAILURE, () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams);
    setInterval(ipcRenderer.send, 1000, COURSE.COURSE_REQUEST, params);
});

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const selector of ['className']) {
        //replaceText(selector, process.versions[dependency]);
    }
});