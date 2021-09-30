const { ipcRenderer, shell } = require('electron');

let closeLink = document.querySelector('#link-close');
let linkTwitter = document.querySelector('#link-twitter');
let electronVersion = document.querySelector("#electron-version");

window.onload = function() {
    ipcRenderer.invoke('electron-version').then((res) => electronVersion.textContent = res);
};

closeLink.addEventListener('click', function() {
    ipcRenderer.send('close-window-about');
});

linkTwitter.addEventListener('click', function() {
    shell.openExternal('https://google.com.br');
});