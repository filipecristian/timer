const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');
const { formataTempoEmSegundosParaTempo } = require('./timer');

let aboutLink = document.querySelector('#link-sobre');
let playButton = document.querySelector('.botao-play');
let time = document.querySelector('.tempo');
let curso = document.querySelector('.curso');

window.onload = () => {
    data.getDataCourse(curso.textContent)
        .then((data) => {
            time.textContent = data.time;
        });
}

aboutLink.addEventListener('click', function() {
    ipcRenderer.send('open-about-window');
});

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];
let play = false;
playButton.addEventListener('click', function() {
    if (play) {
        timer.stop(curso.textContent);
    } else {
        timer.start(time);
    }
    play = !play;
    imgs = imgs.reverse();
    playButton.src = imgs[0];
});


ipcRenderer.on('curso-trocado', (event, course) => {
    curso.textContent = course;
    data.getDataCourse(course)
        .then((data) => {
            time.textContent = data.time;
        })
});