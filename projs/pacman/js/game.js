'use strict';
const WALL = '#';
const FOOD = '🧀';
const POWER_FOOD = '🍗';
const CHERRY = '🍒';
const EMPTY = ' ';

var gBoard;
var gGame;
var gIntervalCherry;

function init() {
  if (gIntervalGhosts || gIntervalCherry) {
    clearInterval(gIntervalGhosts);
    gIntervalGhosts = null;
    clearInterval(gIntervalCherry);
    gIntervalCherry = null;
  }
  gGame = {
    score: 0,
    isOn: false,
    totalFood: 0,
    collectedFood: 0,
  };
  updateScore(0);
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  gElModal.style.display = 'none';

  for (var i = 0; i < gGhosts.length; i++) {
    var ghost = gGhosts[i];
    renderCell(ghost.location, getGhostHTML(ghost));
  }

}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      } else {
        gGame.totalFood++;
      }
    }
  }
  board[1][1] = POWER_FOOD;
  board[1][board[0].length - 2] = POWER_FOOD;
  board[board.length - 2][1] = POWER_FOOD;
  board[board.length - 2][board[0].length - 2] = POWER_FOOD;

  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function gameOver(isWin = false) {

  var elMsg = document.querySelector('.modal-msg');
  elMsg.innerText = isWin ? 'Congratulations! you\'re a winner baby!' : 'Game Over! Try again...';
  gElModal.style.display = 'block';
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  clearInterval(gIntervalCherry);
  gIntervalCherry = null;
}




