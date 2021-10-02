const data = require('./data');

module.exports = {
    geraTrayTemplate(win) {
        let template = [{
                label: 'Cursos'
            },
            {
                type: 'separator'
            }
        ];

        let courses = data.getNameCourses();

        courses.forEach((course) => {
            let menuItem = {
                label: course,
                type: 'radio',
                click: () => {
                    win.send('curso-trocado', course);
                }
            }
            template.push(menuItem);
        });

        return template;
    }
}