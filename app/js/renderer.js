const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');
const { formataTempoEmSegundosParaTempo } = require('./timer');

let aboutLink = document.querySelector('#link-sobre');
let playButton = document.querySelector('.botao-play');
let time = document.querySelector('.tempo');
let curso = document.querySelector('.curso');
let botaoAdicionar = document.querySelector('.botao-adicionar');
let campoAdicionar = document.querySelector('.campo-adicionar');

window.onload = () => {
    data.getDataCourse(curso.textContent)
        .then((res) => {
            time.textContent = res.time;
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
        new Notification('Timer', {
            body: `O curso ${curso.textContent} foi parado`,
            icon: 'img/stop-button.png'
        });
    } else {
        timer.start(time);
        new Notification('Timer', {
            body: `O curso ${curso.textContent} foi iniciado`,
            icon: 'img/play-button.png'
        });
    }
    play = !play;
    imgs = imgs.reverse();
    playButton.src = imgs[0];
});

botaoAdicionar.addEventListener('click', function() {
    let novoCurso = campoAdicionar.value;

    if (!novoCurso) {
        return;
    }

    curso.textContent = novoCurso;
    time.textContent = '00:00:00';
    campoAdicionar.value = '';
    ipcRenderer.send('curso-adicionado', novoCurso);
});


ipcRenderer.on('curso-trocado', (event, course) => {
    curso.textContent = course;
    timer.stop(course);
    data.getDataCourse(course)
        .then((res) => {
            time.textContent = res.time;
        })
        .catch((err) => {
            console.log('err', err);
            time.textContent = '00:00:00';
        })
});


ipcRenderer.on('atalho-iniciar-parar', () => {
    let click = new MouseEvent('click');
    playButton.dispatchEvent(click);
});