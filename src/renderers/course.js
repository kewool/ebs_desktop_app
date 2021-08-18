var { ipcRenderer } = require('electron');
const COURSE = require('../events/course.js');
const $ = require('jquery');

const COURSE_STATUS = Object.freeze({
    ALL: "",
    BEFORE_LEARNING: "000",
    DURING_LEARNING: "001",
    COMPLETE_LEARNING: "002"
});

const COURSE_STATUS_TEXT = Object.freeze({
    "000": "학습시작",
    "001": "학습계속",
    "002": "학습완료"
});

const COURSE_STATUS_CLASS = Object.freeze({
    "001": "course_btn_continue",
    "002": "course_btn_done"
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
    $("div.panel").empty();
    for (let item of data.data.list) {
        /*$("ul.student").append(`<li>
        <div class="info">
            <div class="tit eps2">${item.lessonName}</div>
        </div>
        <div class="bottom">
             <a href="./lesson.html${window.location.search}&lessonSeq=${item.lessonSeq}"
                class="btn ${COURSE_STATUS_CLASS[item.atltStsCd]}">${COURSE_STATUS_TEXT[item.atltStsCd]}</a>
        </div>
    </li>`);*/
        $("div.panel").append(`
            <a href="./lesson.html${window.location.search}&lessonSeq=${item.lessonSeq}"class="obj ${COURSE_STATUS_CLASS[item.atltStsCd]}">
                <p class="obj_text">${item.lessonName}</p>
                <p class="course_btn">${COURSE_STATUS_TEXT[item.atltStsCd]}</p>
            </a>
        `);
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