"use strict";
import Field from "./field.js";
import * as sound from "./sound.js";

export default class Game {
  constructor(gameDuration, carrotNum, rabbitNum) {
    this.gameDuration = gameDuration;
    this.carrotNum = carrotNum;
    this.rabbitNum = rabbitNum;

    this.timer = document.querySelector(".game__timer ");
    this.score = document.querySelector(".game__score ");
    this.icon = document.querySelector(".game__playBtn i");
    this.playBtn = document.querySelector(".game__playBtn ");

    // play Button
    this.playBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
        this.started = !this.started;
      }
    });

    this.started = false;
    this.scoreFig = 0;
    this.interval = undefined;

    this.gameField = new Field(this.carrotNum, this.rabbitNum);
    this.gameField.setClickListener(this.onItemClick);
  }

  //   setGameStopListener
  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  // onItemClick
  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.scoreFig++;
      this.updateScore();
      if (this.scoreFig === this.carrotNum) {
        this.finish(true);
      }
    } else if (item === "rabbit") {
      this.finish(false);
    }
  };

  // Start Game
  start() {
    sound.playBg();
    this.init();
    this.showStopBtn();
    this.showTimerAndScore();
    this.startGameTimer();
  }

  // Stop Game
  stop() {
    this.hidePlayBtn();
    this.stopGameTimer();
    sound.stopBg();
    sound.playAlert();
    this.onGameStop && this.onGameStop("cancel");
  }

  // Finish Game
  finish(bool) {
    this.hidePlayBtn();
    sound.stopBg();
    this.stopGameTimer();
    if (bool) {
      sound.playWin();
      this.onGameStop && this.onGameStop("win");
    } else {
      this.onGameStop && this.onGameStop("lose");
    }
  }

  // Replay Game
  replay() {
    this.init();
    this.playBtn.classList.remove("hide");
    this.showStopBtn();
    this.startGameTimer();
    sound.playBg();
  }

  // Init Game
  init() {
    sound.stopWin();
    this.score.innerText = this.carrotNum;
    this.scoreFig = 0;
    this.gameField.init();
  }

  hidePlayBtn() {
    this.playBtn.classList.add("hide");
  }

  stopGameTimer() {
    clearInterval(this.interval);
  }

  showStopBtn() {
    this.icon.classList.add("fa-stop");
    this.icon.classList.remove("fa-play");
  }

  showTimerAndScore() {
    this.timer.classList.remove("hide");
    this.score.classList.remove("hide");
  }

  startGameTimer() {
    let remainingTime = this.gameDuration;
    this.updateTimer(remainingTime);
    this.interval = setInterval(() => {
      if (remainingTime === 0) {
        clearInterval(this.interval);
        this.finish(false);
        return;
      } else {
        this.updateTimer(--remainingTime);
      }
    }, 1000);
  }

  updateTimer(time) {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    if (sec < 10) {
      this.timer.innerHTML = `0${min}:0${sec}`;
    } else {
      this.timer.innerHTML = `0${min}:${sec}`;
    }
  }

  updateScore() {
    this.score.innerText = this.carrotNum - this.scoreFig;
  }
}
