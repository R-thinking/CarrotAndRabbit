"use strict";
import PopUp from "./popup.js";
import Field from "./Field.js";
import * as sound from "./sound.js";

const playBtn = document.querySelector(".game__playBtn ");
const timer = document.querySelector(".game__timer ");
const score = document.querySelector(".game__score ");
const icon = document.querySelector(".game__playBtn i");

const GAME_DURATION_SEC = 10;

let carrotNum = 5;
let rabbitNum = 5;
let started = false;
let scoreFig = 0;
let interval = undefined;
let sec = 0;
let min = 0;

const gameFinishBanner = new PopUp();
const gameField = new Field(carrotNum, rabbitNum);

// main
{
  // play Button
  playBtn.addEventListener("click", () => {
    if (started) {
      stopGame();
    } else {
      startGame();
      started = !started;
    }
  });

  gameFinishBanner.setEventListener(() => {
    replayGame();
  });

  // carrot and rabbit
  gameField.setClickListener(onItemClick);
}
// onItemClick
function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    scoreFig++;
    updateScore();
    if (scoreFig === carrotNum) {
      finishGame(true);
    }
  } else if (item === "rabbit") {
    finishGame(false);
  }
}

// stopGame
function stopGame() {
  hidePlayBtn();
  stopGameTimer();
  gameFinishBanner.show("Replay?");
  sound.stopBg();
  sound.playAlert();
}
function hidePlayBtn() {
  playBtn.classList.add("hide");
}

function stopGameTimer() {
  clearInterval(interval);
}

// startGame
function startGame() {
  sound.playBg();
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
}

function showStopBtn() {
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
}

function showTimerAndScore() {
  timer.classList.remove("hide");
  score.classList.remove("hide");
}

function startGameTimer() {
  let remainingTime = GAME_DURATION_SEC;
  updateTimer(remainingTime);
  interval = setInterval(function () {
    if (remainingTime === 0) {
      clearInterval(interval);
      finishGame(false);
      return;
    } else {
      updateTimer(--remainingTime);
    }
  }, 1000);
}

function updateTimer(time) {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  if (sec < 10) {
    timer.innerHTML = `0${min}:0${sec}`;
  } else {
    timer.innerHTML = `0${min}:${sec}`;
  }
}

// ReplayGame
function replayGame() {
  initGame();
  playBtn.classList.remove("hide");
  showStopBtn();
  startGameTimer();
  sound.playBg();
}

function updateScore() {
  score.innerText = carrotNum - scoreFig;
}

function finishGame(bool) {
  hidePlayBtn();
  let message = "";
  sound.stopBg();
  stopGameTimer();
  if (bool) {
    message = "You won!";
    sound.playWin();
  } else {
    message = "You lost";
  }
  gameFinishBanner.show(message);
}

// initGame
function initGame() {
  sound.stopWin();
  score.innerText = carrotNum;
  scoreFig = 0;
  gameField.init();
}
