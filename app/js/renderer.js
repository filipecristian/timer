const { ipcRenderer } = require('electron');
const moment = require('moment');

let seconds = 0;

let formataTempoEmSegundosParaTempo = function(segundos) {
    return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
}

let start = function(el) {
    let tempo = moment.duration(el.textContent);
    seconds = tempo.asSeconds();
    setInterval(function() {
        seconds++;
        el.textContent = formataTempoEmSegundosParaTempo(seconds);
    }, 999);
};

let aboutLink = document.querySelector('#link-sobre');
let playButton = document.querySelector('.botao-play');
let time = document.querySelector('.tempo');

aboutLink.addEventListener('click', function() {
    ipcRenderer.send('open-about-window');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
playButton.addEventListener('click', function() {
    start(time);
    imgs = imgs.reverse();
    playButton.src = imgs[0];
});