import { makeModalWindowActive } from "./DOM-utils.js";

const clockTime = document.getElementById("time");
//sets clock to new time
const setClockTime = () => {
  const timeNow = new Date()
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
  clockTime.innerText = timeNow;
};

//keeps the clock ticking every second
setClockTime();
setInterval(() => {
  setClockTime();
}, 1000); //1 sec

const startBtn = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");
//opens and closes the start menu by toggling class
startBtn.addEventListener("click", (e) => {
  startMenu.classList.toggle("show");
  //console.log(window.getComputedStyle(startMenu).zIndex);
});

const body = document.querySelector("body");

body.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("sm") &&
    !e.target.classList.contains("sb")
  ) {
    startMenu.classList.remove("show");
    //console.log(window.getComputedStyle(startMenu).zIndex);
  }
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    document.querySelector(".btn-container").removeChild(overlay);
  }
});

///////////////////
