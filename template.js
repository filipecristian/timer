const data = require('./data');
const { ipcMain } = require('electron');

module.exports = {
    templateInicial: null,

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

        this.templateInicial = template;
        return template;
    },
    adicionarCursoNoTray(curso, win) {
        this.templateInicial.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                win.send('curso-trocado', curso);
            }
        });

        return this.templateInicial;
    },
    geraTemplateMenuPrincipal(app) {
        let isMac = process.platform == 'darwin';
        let templateMenu = [{
                label: 'View',
                submenu: [
                    { role: 'reload' },
                    { role: 'forceReload' },
                    { role: 'toggleDevTools' },
                    { type: 'separator' },
                    { role: 'resetZoom' },
                    { role: 'zoomIn' },
                    { role: 'zoomOut' },
                    { type: 'separator' },
                    { role: 'togglefullscreen' }
                ]
            },
            {
                label: 'Window',
                submenu: [
                    { role: 'minimize' },
                    { role: 'zoom' },
                    ...(isMac ? [
                        { type: 'separator' },
                        { role: 'front' },
                        { type: 'separator' },
                        { role: 'window' }
                    ] : [
                        { role: 'close' }
                    ])
                ]
            }, {
                label: 'Sobre',
                submenu: [{
                    label: 'Sobre o Timer',
                    click: () => {
                        ipcMain.emit('open-about-window');
                    }
                }]
            }
        ];

        if (isMac) {
            templateMenu.unshift({
                label: app.getName(),
                submenu: [{
                    label: 'Estou rodando no Mac'
                }]
            });
        }

        return templateMenu;
    }
}