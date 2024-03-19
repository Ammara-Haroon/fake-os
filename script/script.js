const clockTime = document.getElementById("time");

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

setClockTime();
setInterval(() => {
  setClockTime();
}, 1000);

const startBtn = document.getElementById("startButton");
const startMenu = document.getElementById("startMenu");

startBtn.addEventListener("click", () => {
  startMenu.classList.toggle("show");
  //alert("hello");
  //console.log("hi");
});
