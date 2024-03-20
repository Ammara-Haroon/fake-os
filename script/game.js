import { createMenuBar } from "./script.js";
const NUMBER_OF_SQUARES = 9;
const checkForWinner = () => {
  const countDisabled = document.querySelectorAll(":disabled").length;
  if (countDisabled < 5) return;
  const isGameFinished = countDisabled === NUMBER_OF_SQUARES;
  const btnArr = document.querySelectorAll(".game-btn");
  console.log(btnArr);

  const moves = [];
  for (let i = 0; i < 9; i++) {
    moves.push(btnArr[i].innerText === "" ? "-" : btnArr[i].innerText);
  }

  let combo = [];
  for (let i = 0; i < 3; i++) {
    combo.push(moves[3 * i] + moves[3 * i + 1] + moves[3 * i + 2]);

    combo.push(moves[i] + moves[i + 3] + moves[i + 6]);
  }
  combo.push(moves[0] + moves[4] + moves[8]);
  combo.push(moves[2] + moves[4] + moves[6]);

  if (combo.includes("XXX")) {
    alert("Congratulations, X is the winner !");
    btnArr.forEach((btn) => (btn.disabled = true));
  } else if (combo.includes("OOO")) {
    alert("Congratulations, O is the winner !");
    btnArr.forEach((btn) => (btn.disabled = true));
  } else if (isGameFinished) {
    alert("It's a tie !");
  }
  // console.log(btnArr[i].innerText);

  console.log("game eneded" + combo);
};
const gameIcon = document.getElementById("gameIcon");

let turn = "O";
const createTicTacToe = () => {
  if (document.querySelector("#gameModal")) {
    return;
  }
  turn = "O";
  const gameModal = document.createElement("div");
  gameModal.classList.add("modal");
  gameModal.id = "gameModal";
  const menuBar = createMenuBar("gameModal");
  gameModal.appendChild(menuBar);
  menuBar.style.display = "flex";
  const heading = document.createElement("h1");
  heading.appendChild(document.createTextNode("Tic-Tac-Toe"));
  gameModal.appendChild(heading);
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");

  for (let i = 0; i < NUMBER_OF_SQUARES; ++i) {
    const btn = document.createElement("button");
    btn.classList.add("game-btn");
    btnContainer.appendChild(btn);
    btn.addEventListener("click", () => {
      btn.innerText = turn;
      btn.disabled = true;
      turn = turn === "O" ? "X" : "O";
      checkForWinner();
    });

    gameModal.appendChild(btnContainer);
  }

  document.getElementsByTagName("body")[0].appendChild(gameModal);
};

gameIcon.addEventListener("click", () => {
  createTicTacToe();
});
