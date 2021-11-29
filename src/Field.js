"use strict";
import * as sound from "./sound.js";

const sizeofImg = 80;

export const ItemType = Object.freeze({
  carrot: "carrot",
  rabbit: "rabbit",
});

export class Field {
  constructor(carrotNum, rabbitNum) {
    this.carrotNum = carrotNum;
    this.rabbitNum = rabbitNum;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", this.onClick);
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.field.innerHTML = "";
    this._addItem(ItemType.carrot, this.carrotNum, "/imgs/Carrot.png");
    this._addItem(ItemType.rabbit, this.rabbitNum, "/imgs/Rabbit.png");
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - sizeofImg;
    const y2 = this.fieldRect.height - sizeofImg;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute";
      item.style.width = `${sizeofImg}px`;
      item.style.height = `${sizeofImg}px`;
      const x = randomNum(x1, x2);
      const y = randomNum(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  onClick = (event) => {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick(ItemType.carrot);
    } else if (target.matches(".rabbit")) {
      sound.playRabbit();
      this.onItemClick && this.onItemClick(ItemType.rabbit);
    }
  };
}

function randomNum(num1, num2) {
  return Math.random() * (num2 - num1) + num1;
}
