const { contextBridge, ipcRenderer, shell } = require('electron');

contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
contextBridge.exposeInMainWorld('shell', shell);