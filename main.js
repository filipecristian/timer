const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const process = require('process');
const data = require('./data');
const template = require('./template');
let tray = null;

app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    tray = new Tray(`${__dirname}/app/img/icon-tray.png`);
    let trayMenu = Menu.buildFromTemplate(template.geraTrayTemplate(mainWindow));
    tray.setContextMenu(trayMenu);

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);
})

app.on('window-all-closed', () => {
    app.quit();
});

let aboutWindow = null;

ipcMain.on('open-about-window', () => {
    if (aboutWindow == null) {
        aboutWindow = new BrowserWindow({
            width: 350,
            height: 220,
            alwaysOnTop: true,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        aboutWindow.on('closed', () => {
            aboutWindow = null;
        });
    }
    aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
});

ipcMain.on('close-window-about', () => {
    aboutWindow.close();
});

ipcMain.handle('electron-version', () => {
    return process.versions.electron;
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    data.saveData(curso, tempoEstudado);
});