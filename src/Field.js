"use strict";

const sizeofImg = 80;
const carrotSound = new Audio("./sounds/carrot_pull.mp3");
const rabbitSound = new Audio("./sounds/rabbit_pull.wav");

export default class Field {
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
    this._addItem("carrot", this.carrotNum, "/imgs/Carrot.png");
    this._addItem("rabbit", this.rabbitNum, "/imgs/Rabbit.png");
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
      playSound(carrotSound);
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".rabbit")) {
      playSound(rabbitSound);
      this.onItemClick && this.onItemClick("rabbit");
    }
  };
}

function randomNum(num1, num2) {
  return Math.random() * (num2 - num1) + num1;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}
