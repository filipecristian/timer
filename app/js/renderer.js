let aboutLink = document.querySelector('#about-link');
console.log(window.ipcRenderer);

aboutLink.addEventListener('click', function() {
    window.ipcRenderer.send('open-about-window');
});