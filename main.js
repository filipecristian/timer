const { app, BrowserWindow, ipcMain } = require('electron');

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

ipcMain.on('open-about-window', () => {
    let aboutWindow = new BrowserWindow({
        width: 300,
        height: 200
    });

    aboutWindow.loadURL(`file://${__dirname}/app/about.html`);
});