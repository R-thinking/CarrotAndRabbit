"use strict";

export default class PopUp {
  constructor() {
    this.pop_up = document.querySelector(".pop-up");
    this.pop_up_message = document.querySelector(".pop-up__message");
    this.pop_up_replayBtn = document.querySelector(".pop-up__replayBtn");
    this.pop_up_replayBtn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setEventListener(onClick) {
    this.onClick = onClick;
  }

  show(message) {
    this.pop_up_message.innerText = message;
    this.pop_up.classList.remove("hide");
  }
  hide() {
    this.pop_up.classList.add("hide");
  }
}
