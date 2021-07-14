const { ipcMain } = require('electron');
const { Wrapper } = require('ebsoc-lib-for-app');
const ebs = require('ebsoc-lib-for-app');
const puppeteer = require('puppeteer');

let userdata = {};
let browser;

(async () => {
    const process = require('process');
    const fs = require('fs');

    let chromePaths = [
        `${process.env['ProgramFiles']}\\Google\\Chrome\\Application\\chrome.exe`,
        `${process.env['ProgramFiles(x86)']}\\Google\\Chrome\\Application\\chrome.exe`,
        `${process.env['LOCALAPPDATA']}\\Google\\Chrome\\Application\\chrome.exe`,
    ];
    for (let path of chromePaths) {
        let exists = fs.existsSync(path);
        if (exists) {
            chromePath = path;
            return;
        }
    }
})();

const createBrowser = async function () {
    console.log(chromePath);
    browser = await puppeteer.launch({
        args: [],
        headless: false,
        defaultViewport: null,
        ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"],
        executablePath: chromePath
    });
    browser.on('disconnected', () => browser = null);
    browser.on('targetcreated', async function cb() {
        let pages = await browser.pages();
        if (pages.length > 1) {
            await pages[0].close();
            browser.off('targetcreated', cb);
        }
    });
    return browser;
};

const COMMON = require('./events/common');

ipcMain.on(COMMON.OPEN_AT_CHROME, async (event, url) => {
    try {
        if (!browser)
            browser = await createBrowser();
        if (!userdata.memberInfo) {
            userdata = await ebs.Common.member(userdata.token);
        }
        const page = await browser.newPage();
        console.log(userdata);
        await page.setCookie(...[
            {
                name: 'access',
                value: userdata.token,
                domain: ".ebsoc.co.kr",
                secure: false
            },
            {
                name: 'host',
                value: userdata.memberInfo.memberSchoolInfo.hostName,
                domain: ".ebsoc.co.kr",
                secure: false
            },
            {
                name: 'memberSchoolCode',
                value: userdata.memberInfo.memberSchoolCode,
                domain: ".ebsoc.co.kr",
                secure: false
            },
            {
                name: 'memberSeq',
                value: userdata.memberInfo.memberSeq.toString(),
                domain: ".ebsoc.co.kr",
                secure: false
            }
        ]);
        await page.goto(url);
        event.reply(COMMON.OPEN_AT_CHROME, { code: "OK" });
    }
    catch (err) {
        event.reply(COMMON.OPEN_AT_CHROME, { code: "ERR", err: err });
    }
});

const LOGIN = require('./events/login');

ipcMain.on(LOGIN.SIGNIN_REQUEST, async (event, { id, pwd }) => {
    try {
        let data = await ebs.Auth.login(id, pwd);
        userdata = data.data;
        event.reply(LOGIN.SIGNIN_COMPLETE);
    }
    catch (err) {
        event.reply(LOGIN.SIGNIN_FAILURE, err);
    }
});

ipcMain.on(LOGIN.SIGNIN_WITH_TOKEN, async (event, token) => {
    try {
        userdata = {};
        userdata.memberInfo = (await ebs.Common.member(token)).data;
        userdata.token = token;
        event.reply(LOGIN.SIGNIN_COMPLETE);
    }
    catch (err) {
        event.reply(LOGIN.SIGNIN_FAILURE, err);
    }
});

const CLASS = require('./events/class');

ipcMain.on(CLASS.CLASS_LIST_REQUEST, async (event, args) => {
    try {
        let data = await Wrapper.fetchClassList(userdata.token, {
            schoolAffairsYear: new Date().getFullYear(),
            searchType: Wrapper.SEARCH_TYPE.NONE,
            searchWord: "",
            tabType: Wrapper.TAB_TYPE.SBSCE
        });
        event.reply(CLASS.CLASS_LIST_RESPONSE, data.data);
    } catch (err) {
        event.reply(CLASS.CLASS_LIST_FAILURE);
    }
});

const LESSON = require('./events/lesson');

ipcMain.on(LESSON.LESSON_REQUEST, async (event, args) => {
    try {
        let { classUrlPath, lessonSeq } = args;
        /*
        let detail = await ebs.Cls.lctClass.detail(userdata.token, { classUrlPath: classUrlPath });
        let classSqno = detail.data.classSqno;
        */
        let lessons = await ebs.Lecture.$classUrlPath.lesson.lecture.attend.list.$lessonSeq(userdata.token,
            { classUrlPath: classUrlPath, lessonSeq: lessonSeq });
        event.reply(LESSON.LESSON_RESPONSE, lessons);
    } catch (err) {
        console.log(err);
        event.reply(LESSON.LESSON_FAILURE);
    }
});

const COURSE = require('./events/course');

ipcMain.on(COURSE.COURSE_REQUEST, async (event, args) => {
    let data = await Wrapper.fetchCourse(
        userdata.token,
        args.classUrlPath,
        {
            status: Wrapper.COURSE_STATUS.ALL,
            orderBy: Wrapper.COURSE_ORDER_BY.REGISTRATION_DATE
        }
    );
    if (data.err) {
        console.log(data);
        event.reply(COURSE.COURSE_FAILURE);
    }
    event.reply(COURSE.COURSE_RESPONSE, data);
});

const PLAYER = require('./events/player');

ipcMain.on(PLAYER.PLAYER, async (event, args) => {
    let Player = new Wrapper.SimplePlayer(
        userdata.token,
        args.classUrlPath,
        args.lessonSeq,
        args.subLessonSeq
    );
    let data = await Player.create();
    let detail = await Player.lectureDetailData();
    if (data.err) {
        console.log(data);
        event.reply(COURSE.PLAYER, { status: "err", err: data.err });
    }
    event.reply(PLAYER.PLAYER, { status: "ok", player: Player, create_data: data, detail_data: detail });
});

ipcMain.on(PLAYER.PLAYER_PROGRESS, async (event, { }) => {

});