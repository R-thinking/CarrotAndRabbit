"use strict";
import PopUp from "./popup.js";
import * as sound from "./sound.js";
import { GameBuilder, Reason } from "./game.js";

const GAME_DURATION_SEC = 10;
let carrotNum = 5;
let rabbitNum = 5;

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .setDuration(GAME_DURATION_SEC)
  .setCarrotNum(carrotNum)
  .setRabbitNum(rabbitNum)
  .build();

// main
{
  game.setGameStopListener((reason) => {
    console.log(reason);
    let message = "";
    switch (reason) {
      case Reason.cancel:
        message = "Retry?";
        sound.playAlert();
        break;
      case Reason.win:
        message = "You won!";
        sound.playWin();
        break;
      case Reason.lose:
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
