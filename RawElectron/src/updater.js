const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require("electron-updater");

let updateWin;

function sendStatusToWindow(text) {
    if (updateWin.webContents)
        updateWin.webContents.send("message", text);
}

function createDefaultUpdateWindow() {
    updateWin = new BrowserWindow({
        backgroundColor: "#eeeeee",
        webPreferences: { nodeIntegration: true, contextIsolation: false },
        show: false
    });

    updateWin.on("closed", () => {
        updateWin = null;
    });
    updateWin.loadURL(`file://${__dirname}/pages/version.html#v${app.getVersion()}`);
    return updateWin;
}

autoUpdater.on("checking-for-update", () => {
    sendStatusToWindow("Checking for update...");
});
autoUpdater.on("update-available", (info) => {
    sendStatusToWindow("Update available.");
    updateWin.show();
});
autoUpdater.on("update-not-available", (info) => {
    sendStatusToWindow("Update not available.");
});
autoUpdater.on("error", (err) => {
    sendStatusToWindow("Error in auto-updater. " + err);
    updateWin.show();
});
autoUpdater.on("download-progress", (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + " - Downloaded " + progressObj.percent + "%";
    log_message = log_message + " (" + progressObj.transferred + "/" + progressObj.total + ")";
    sendStatusToWindow(log_message);
});
autoUpdater.on("update-downloaded", (info) => {
    sendStatusToWindow("Update downloaded");

    const option = {
        type: "question",
        buttons: ["업데이트", "취소"],
        defaultId: 0,
        title: "electron-updater",
        message: "업데이트가 있습니다. 프로그램을 업데이트 하시겠습니까?",
    };
    let btnIndex = dialog.showMessageBoxSync(updateWin, option);

    if (btnIndex === 0) {
        autoUpdater.quitAndInstall();
    }
});

app.on("ready", async () => {
    createDefaultUpdateWindow();
    autoUpdater.checkForUpdates();
});