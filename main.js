const { app, BrowserWindow, ipcMain, Tray, Menu } = require('electron');
const process = require('process');
const data = require('./data');
const template = require('./template');
let tray = null;
let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
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

    let menuPrincipal = Menu.buildFromTemplate(template.geraTemplateMenuPrincipal(app));
    Menu.setApplicationMenu(menuPrincipal);

    mainWindow.openDevTools();
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

ipcMain.on('curso-adicionado', (event, curso) => {
    let novoTemplate = template.adicionarCursoNoTray(curso, mainWindow);
    let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
    tray.setContextMenu(novoTrayMenu);
});