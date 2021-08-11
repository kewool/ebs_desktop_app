var { ipcRenderer } = require('electron');
const COMMON = require('../events/common.js');

console.log("Common.js Loaded");

const openInChrome = function (url) {
    if (url)
        ipcRenderer.send(COMMON.OPEN_AT_CHROME, url);
    else {

    }
};

const runOnMainThread = function (command) {
    ipcRenderer.send("EVALUATE", command);
};

ipcRenderer.on("EVALUATE", (event, result) => {
    console.log(result);
});

ipcRenderer.on(COMMON.OPEN_AT_CHROME, (event, args) => {
    if (args.code == "OK") {
        console.log("Open operation in chrome was successful.");
    }
    else if (args.code == "ERR") {
        console.log("An error occurred during the open operation in chrome.");
        console.log(args.err)
    }
});
