const { app, BrowserWindow, ipcMain } = require('electron');
const process = require('process');

app.on('ready', () => {
    console.log('Application started');

    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            preload: `${__dirname}/preload.js`
        }
    });

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
                preload: `${__dirname}/preload.js`
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