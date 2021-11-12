"use strict";

const carrotSound = new Audio("./sounds/carrot_pull.mp3");
const rabbitSound = new Audio("./sounds/rabbit_pull.wav");
const bgSound = new Audio("./sounds/bg.mp3");
const winSound = new Audio("./sounds/game_win.mp3");
const alertSound = new Audio("./sounds/alert.wav");
bgSound.loop = true;

export function playCarrot() {
  playSound(carrotSound);
}
export function playRabbit() {
  playSound(rabbitSound);
}
export function playBg() {
  playSound(bgSound);
}
export function stopBg() {
  stopSound(bgSound);
}
export function playWin() {
  playSound(winSound);
}
export function stopWin() {
  stopSound(winSound);
}
export function playAlert() {
  playSound(alertSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
function stopSound(sound) {
  sound.pause();
}
