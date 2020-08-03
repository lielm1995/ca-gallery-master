'use strict';

var gProjects = _crateProjects();


function getProjects() {
    return gProjects;
}

function getProjectById(projId) {
    return gProjects.find(proj => proj.id === projId);
}

function _crateProjects() {
    var projects = [];
    projects.push(_createProject('pacman', 'Pacman', 'A single-player game', 'The objective of the game is to eat all of the dots placed in the maze while avoiding three colored ghosts (cats).', new Date('2020/07/25').valueOf(), []));

    projects.push(_createProject('minesweeper', 'MineSweeper', 'A single-player game', 'The objective of the game is to clear a rectangular board containing hidden "mines" or bombs without detonating any of them, with help from clues about the number of neighboring mines in each field. This version of the game has additional hint features.', new Date('2020/07/15').valueOf(), []));


    return projects;
}


function _createProject(id, name, title, desc, publishedAt, labels) {
    return {
        id,
        name,
        title,
        desc,
        imgUrl: `img/portfolio/${id}.jpg`,
        fullImgUrl: `img/portfolio/${id}-full.jpg`,
        projUrl: `projs/${id}/index.html`,
        publishedAt,
        labels
    };
}

function getDateFormatted(timestamp) {
    var date = new Date(timestamp);
    var day = pad(date.getDate());
    var month = pad(date.getMonth() + 1);
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}