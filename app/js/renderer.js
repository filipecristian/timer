let aboutLink = document.querySelector('#about-link');

aboutLink.addEventListener('click', function() {
    window.ipcRenderer.send('open-about-window');
});