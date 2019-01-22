var soundGreen = new Audio('sounds/green.mp3');
var soundRed = new Audio('sounds/red.mp3');
var soundYellow = new Audio('sounds/yellow.mp3');
var soundBlue = new Audio('sounds/blue.mp3');
var soundGameOver = new Audio('sounds/gameover.mp3');
var pattern = [];
var userInput = [];
var level = 0;
var interval;

const greenCode = '#4caf50';
const greenClickedCode = '#4caf5080';
const redCode = '#f44336';
const redClickedCode = '#f4433680';
const yellowCode = '#ffeb3b';
const yellowClickedCode = '#ffeb3b7a';
const blueCode = '#2196f3';
const blueClickedCode = '#2696f280';

// Change color when mouse down
function clickColor(divId) {
  switch (divId) {
    case green:
      divId.style.background = greenClickedCode;
      soundGreen.play();
      userInput.push(0);
      setTimeout(restoreGreen, 200);
      checkInput();
      break;
    case red:
      divId.style.background = redClickedCode;
      soundRed.play();
      userInput.push(1);
      setTimeout(restoreRed, 200);
      checkInput();
      break;
    case yellow:
      divId.style.background = yellowClickedCode;
      soundYellow.play();
      userInput.push(2);
      setTimeout(restoreYellow, 200);
      checkInput();
      break;
    case blue:
      divId.style.background = blueClickedCode;
      soundBlue.play();
      userInput.push(3);
      setTimeout(restoreBlue, 200);
      checkInput();
      break;
  }
}

// Must be separated functions because of setTimeOut in execPattern()
function restoreGreen() {
  green.style.background = greenCode;
}

function restoreRed() {
  red.style.background = redCode;
}

function restoreYellow() {
  yellow.style.background = yellowCode;
}

function restoreBlue() {
  blue.style.background = blueCode;
}

// Blink the color to create the pattern
function blinkColor(color) {
  switch (color) {
    case 'green':
      green.style.background = greenClickedCode;
      soundGreen.play();
      break;
    case 'red':
      red.style.background = redClickedCode;
      soundRed.play();
      break;
    case 'yellow':
      yellow.style.background = yellowClickedCode;
      soundYellow.play();
      break;
    case 'blue':
      blue.style.background = blueClickedCode;
      soundBlue.play();
      break;
  }
}

// Generate random number from 0 to 3
function randomNum() {
  return Math.floor(Math.random() * 4);
}

function newLevel() {
  pattern.push(randomNum());
  userInput = [];
  level++;
  document.getElementById('level').innerHTML = 'Level: ' + level;
}

// Execute the clicking pattern
function execPattern() {
  var index = 0;
  interval = setInterval(function() {
    switch (pattern[index]) {
      case 0:
        blinkColor('green');
        setTimeout(restoreGreen, 200);
        index++;
        break;
      case 1:
        blinkColor('red');
        setTimeout(restoreRed, 200);
        index++;
        break;
      case 2:
        blinkColor('yellow');
        setTimeout(restoreYellow, 200);
        index++;
        break;
      case 3:
        blinkColor('blue');
        setTimeout(restoreBlue, 200);
        index++;
        break;
    }
    if (index >= pattern.length) clearInterval(interval);
  }, 500);
}

// Check user input, continue if correct of show game over page
function checkInput() {
  for (var i = 0; i < userInput.length; i++)
    if (pattern[i] != userInput[i]) {
      gameOver();
      break;
    } else if (i == pattern.length - 1) startNewLevel();
}

// Start a new level
function startNewLevel() {
  document.getElementsByClassName('container')[0].style.display = 'flex';
  document.getElementById('instructions').style.display = 'none';
  document.getElementById('game-over').style.display = 'none';
  newLevel();
  execPattern();
}

// Display the game over page
function gameOver() {
  document.getElementById('game-over').style.display = 'block';
  document.querySelector('#game-over > h3').innerHTML =
    'You made until level: ' + level;
  soundGameOver.play();
  level = 0;
  pattern = [];
  userInput = [];
  clearInterval(interval);
  restoreGreen();
  restoreRed();
  restoreYellow();
  restoreBlue();
}
