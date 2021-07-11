const { ipcMain } = require('electron');
const { Wrapper } = require('ebsoc');
const ebs = require('ebsoc');

let userdata = {};

const LOGIN = require('./events/login');

ipcMain.on(LOGIN.SIGNIN_REQUEST, async (event, args) => {
    let { id, pwd } = args;
    try {
        let data = await ebs.Auth.login(id, pwd);
        userdata = data.data;
        event.reply(LOGIN.SIGNIN_COMPLETE);
    }
    catch (err) {
        event.reply(LOGIN.SIGNIN_FAILURE, err);
    }
});

ipcMain.on(LOGIN.SIGNIN_WITH_TOKEN, async (event, args) => {
    userdata = args;
    event.reply(LOGIN.SIGNIN_COMPLETE);
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
        console.log("on!");
        console.log(args);
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
        return;
        event.reply(COURSE.COURSE_FAILURE);
    }
    event.reply(COURSE.COURSE_RESPONSE, data);
});