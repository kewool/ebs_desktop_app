var { ipcRenderer } = require('electron');
const COMMON = require('../events/common.js');

const openInChrome = function (url) {
    ipcRenderer.send(COMMON.OPEN_AT_CHROME, url);
};

ipcRenderer.on(COMMON.OPEN_AT_CHROME, (event, args) => {
    if (args.code == "OK"){
        console.log("Open operation in chrome was successful.");
    }
    else if (args.code == "ERR"){
        console.log("An error occurred during the open operation in chrome.");
        console.log(args.err)
    }
});
