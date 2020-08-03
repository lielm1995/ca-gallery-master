'use strict';
const PACMAN = '🐭'; //'&#9786;';

var gPacman;
var gIsPowerFood;


function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
  //we add the packman instead one of the food
  gGame.totalFood--;
}

function movePacman(eventKeyboard) {


  if (!gGame.isOn) return;
  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;
  //  run the interval to move the ghosts
  if (!gIntervalGhosts) gIntervalGhosts = setInterval(moveGhosts, 1000);
  if (!gIntervalCherry) gIntervalCherry = setInterval(addCherry, 10000);

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  if (gIsPowerFood) {
    gBoard[gPacman.location.i][gPacman.location.j] = POWER_FOOD;
    renderCell(gPacman.location, POWER_FOOD);
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    renderCell(gPacman.location, PACMAN);
    gIsPowerFood = false;
  }

  if (nextCell === CHERRY) {
    updateScore(10);
  }

  // Hitting FOOD? update score
  if (nextCell === FOOD || (nextCell === POWER_FOOD && !gPacman.isSuper)) {

    gGame.collectedFood++;
    updateScore(1);
    if (gGame.collectedFood === gGame.totalFood) gameOver(true);
    if (nextCell === POWER_FOOD) pauseTheGhosts();

  } else if (nextCell === POWER_FOOD && gPacman.isSuper) { // if isSuper and hitting power-food - dont eat
    gIsPowerFood = true;



  } else if (nextCell === GHOST) { //Hitting Ghost
    if (!gPacman.isSuper) {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
    else {
      var currGhostId = getGhostIdByPosition({ i: nextLocation.i, j: nextLocation.j })
      if (gGhosts[currGhostId].currCellContent === FOOD) { gGame.collectedFood++; updateScore(1); }
      if (gGhosts[currGhostId].currCellContent === POWER_FOOD) gIsPowerFood = true;

      gGhosts.splice(currGhostId, 1)
    }
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);
}


function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };
  switch (keyboardEvent.code) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }
  return nextLocation;
}

function addCherry() {
  if (isFull(gBoard)) return;
  var coord = getAvailableLocation();
  gBoard[coord.i][coord.j] = CHERRY;
  renderCell(coord, CHERRY);

}

function isFull(board){
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if(board[i][j] === EMPTY)
      return false;
    }
  }
  return true;
}

