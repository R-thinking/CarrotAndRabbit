"use strict";
import PopUp from "./popup.js";
import Game from "./game.js";

const GAME_DURATION_SEC = 10;
let carrotNum = 5;
let rabbitNum = 5;

const gameFinishBanner = new PopUp();
const game = new Game(GAME_DURATION_SEC, carrotNum, rabbitNum);

// main
{
  game.setGameStopListener((reason) => {
    console.log(reason);
    let message = "";
    switch (reason) {
      case "cancel":
        message = "Retry?";
        break;
      case "win":
        message = "You won!";
        break;
      case "lose":
        message = "You lost!";
        break;
      default:
        throw new Error("Not valid reason");
    }
    gameFinishBanner.show(message);
  });
  gameFinishBanner.setEventListener(() => {
    game.replay();
  });
}
