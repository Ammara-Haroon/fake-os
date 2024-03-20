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

const createMenuButton = (txt, className) => {
  const menuBtn = document.createElement("p");
  menuBtn.classList.add(className);
  const txtNode = document.createTextNode(txt);
  menuBtn.appendChild(txtNode);
  return menuBtn;
};
export const createMenuBar = (modalName) => {
  const menuBar = document.createElement("div");
  menuBar.classList.add("menu-bar");

  const minBtn = createMenuButton("-", "minimize-btn");
  menuBar.appendChild(minBtn);

  const szBtn = createMenuButton("\u25A1", "screen-size-btn");
  menuBar.appendChild(szBtn);

  const closeBtn = createMenuButton("x", "close-btn");
  menuBar.appendChild(closeBtn);

  closeBtn.addEventListener("click", () => {
    const modal = document.getElementById(modalName);
    document.querySelector("body").removeChild(modal);
  });

  return menuBar;
};
