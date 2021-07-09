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

const CLASS = require('./events/class');

ipcMain.on(CLASS.CLASS_LIST_REQUEST, async (event, args) => {
    try {
        let data = await Wrapper.fetchClassList(userdata.token, {
            schoolAffairsYear: new Date().getFullYear(),
            searchType: Wrapper.SEARCH_TYPE.NONE,
            searchWord: "",
            tabType: Wrapper.TAB_TYPE.SBSCE
        });
        console.log(data);
        event.reply(CLASS.CLASS_LIST_RESPONSE, data.data);
    } catch (err) {
        event.reply(CLASS.CLASS_LIST_FAILURE);
    }
});