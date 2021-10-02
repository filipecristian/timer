const { ipcRenderer } = require('electron');
const moment = require('moment');
let seconds;
let timer;
let tempo;

module.exports = {
    start(el) {
        tempo = moment.duration(el.textContent);
        seconds = tempo.asSeconds();

        clearInterval(timer);

        timer = setInterval(() => {
            seconds++;
            el.textContent = this.formataTempoEmSegundosParaTempo(seconds);
        }, 999);
    },
    stop(curso) {
        clearInterval(timer);
        ipcRenderer.send('curso-parado', curso, this.formataTempoEmSegundosParaTempo(seconds));
    },
    formataTempoEmSegundosParaTempo(segundos) {
        return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
    }
}