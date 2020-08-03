'use strict';

var gElModal = document.querySelector('.modal');
String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var cell = mat[i][j];
      var className = 'cell cell' + i + '-' + j;
      strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
  // Select the elCell and set the value
  var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
  elCell.innerHTML = value;
}

function getAvailableLocation() {
  var i = getRandomInt(0, gBoard.length);
  var j = getRandomInt(0, gBoard[0].length);
  while (gBoard[i][j] !== EMPTY) {
      var i = getRandomInt(0, gBoard.length);
      var j = getRandomInt(0, gBoard[0].length);
  }
  return { i, j }
}



// cancel scrolling by space and arrow keys
window.addEventListener("keydown", function (e) {
	if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
}, false);

function closeModal() {
	gElModal.style.display = 'none';
}

// when the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target === gElModal) {
		gElModal.style.display = 'none';
	}
}