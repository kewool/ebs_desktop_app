const { ipcRenderer } = require('electron');
const PLAYER = require('../events/player');
const $ = require('jquery');

$(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams);
    const { classUrlPath, lessonSeq, subLessonSeq } = params;
    ipcRenderer.send(PLAYER.PLAYER, params);
});

ipcRenderer.on(PLAYER.PLAYER, (event, args) => {
    console.log(args);
    Player = args.player;
    FileObject = Player.lectureDetailInfo.lectureContentsDto.lectureContentsMvpDto.mvpFileDto;
    $(document.body).append(`<video src="${FileObject.fileStoragePath}" controls></video>`);
    $(document.body).append(`<div class="download"><a href="${FileObject.fileStoragePath}">download</a></div>`);
});