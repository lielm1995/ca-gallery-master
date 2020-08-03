'use strict';

const GHOST = '<img [] src="img/cat.png" />' //'🐱' //'&#9781;';

var gIntervalGhosts;
var gGhosts;

function createGhost(board) {
    var color = getRandomColor();
    // color = color.replaceAt(5,'0');
    // color = color.replaceAt(6,'a');
    var location = getAvailableLocationForGhost();
    var ghost = {
        location,
        currCellContent: board[location.i][location.j],
        originalColor: color,
        currentColor: color
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}


function createGhosts(board) {
    gGhosts = [];

    // empty the gGhosts array, create some ghosts
    createGhost(board);
    createGhost(board);
    createGhost(board);
    // createGhost(board);
    // createGhost(board);
    // gGhosts.push({ location: { i: 1, j: 1 }, currCellContent: board[1][1], originalColor: 'red', currentColor: 'red' });
    // board[1][1] = GHOST;
}

function moveGhosts() {
    // console.log(gGhosts);
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation =
        {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        };
        var nextCel = gBoard[nextLocation.i][nextLocation.j]

        // if WALL - give up
        if (nextCel === WALL) continue;
        // if GHOST - give up
        if (nextCel === GHOST) continue;

        // if PACMAN - gameOver
        if (nextCel === PACMAN) {
            if (!gPacman.isSuper) gameOver();
            else {
                gGhosts.splice(i, 1);
                // set back what we stepped on: update Model, DOM
                gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
                renderCell(ghost.location, ghost.currCellContent);
                continue;
            }
        }

        // set back what we stepped on: update Model, DOM
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent;
        renderCell(ghost.location, ghost.currCellContent);

        // move the ghost
        ghost.location = nextLocation;

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j];

        // move the ghost and update model and dom
        gBoard[ghost.location.i][ghost.location.j] = GHOST;
        renderCell(ghost.location, getGhostHTML(ghost));
    }
    // console.log(gGame.collectedFood, gGame.totalFood);
}

function getMoveDiff() {
    var randNum = getRandomInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span>${GHOST.replace('[]', `style="background-color: ${ghost.currentColor}"`)}</span>`; //`<span style="background-color: ${ghost.currentColor}">${GHOST}</span>` //
} 

function getAvailableLocationForGhost() {
    var i = getRandomInt(0, gBoard.length);
    var j = getRandomInt(0, gBoard[0].length);
    while (gBoard[i][j] === WALL || gBoard[i][j] === GHOST || gBoard[i][j] === PACMAN) {
        var i = getRandomInt(0, gBoard.length);
        var j = getRandomInt(0, gBoard[0].length);
    }
    return { i, j }
}

function pauseTheGhosts() {
    gPacman.isSuper = true;
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        ghost.currentColor = 'blue';
        renderCell(ghost.location, getGhostHTML(ghost));
    }
    setTimeout(function () {
        gPacman.isSuper = false;
        for (var i = 0; i < gGhosts.length; i++) {
            var ghost = gGhosts[i];
            ghost.currentColor = ghost.originalColor;
            renderCell(ghost.location, getGhostHTML(ghost));
        }
    }, 5000)
}


function getGhostIdByPosition(coord) {
    for (var k = 0; k < gGhosts.length; k++) {
        var ghost = gGhosts[k];
        if (ghost.location.i === coord.i && ghost.location.j === coord.j) {
            return k;
        }
    }
}



