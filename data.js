const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    saveData(curso, tempoEstudado) {
        let courseFile = `${__dirname}/data/${curso}.json`;
        if (fs.existsSync(courseFile)) {
            this.aditionaTempoAoCurso(courseFile, tempoEstudado);
        } else {
            this.createCourseFile(courseFile, {})
                .then(() => {
                    this.aditionaTempoAoCurso(courseFile, tempoEstudado);
                });
        }
    },
    aditionaTempoAoCurso(courseFile, tempo) {
        let data = {
            lastTime: new Date().toString(),
            time: tempo
        };
        jsonfile.writeFile(courseFile, data)
            .then(() => console.log('time saved sucess'))
            .catch((err) => console.log('err', err));
    },
    createCourseFile(fileName, fileContent) {
        return jsonfile.writeFile(fileName, fileContent)
            .then(() => console.log('file created'))
            .catch((err) => console.log('error', err));
    },
    getDataCourse(courseName) {
        let courseFile = `${__dirname}/data/${courseName}.json`;
        return jsonfile.readFile(courseFile);
    },
    getNameCourses() {
        let files = fs.readdirSync(`${__dirname}/data`);
        let courses = files.map((file) => {
            return file.substr(0, file.lastIndexOf('.'));
        });
        return courses;
    }
}