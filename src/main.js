"use strict";

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const sizeofImg = 80;

// main
{
  initGame();
}

function initGame() {
  addItem("carrot", 5, "/imgs/Carrot.png");
  addItem("rabbit", 5, "/imgs/Rabbit.png");
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - sizeofImg;
  const y2 = fieldRect.height - sizeofImg;
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
    field.appendChild(item);
  }
}

function randomNum(num1, num2) {
  return Math.random() * (num2 - num1) + num1;
}
