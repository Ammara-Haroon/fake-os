import {
  createMenuBar,
  createElementWithText,
  makeModalWindowActive,
} from "./DOM-utils.js";

const NUMBER_OF_SQUARES = 9;
const gameIcon = document.getElementById("gameIcon");
let turn = "O";

//resets the game and cleans up to start again
const resetGame = () => {
  turn = "O";
  const btnArr = document.querySelectorAll(".game-btn");
  btnArr.forEach((btn) => {
    btn.innerText = "";
    btn.disabled = false;
  });
};

//looks at the moves and check for three in a row pattern
const checkForWinner = () => {
  const countDisabled = document.querySelectorAll(":disabled").length;

  //dont check until 5 moves are made
  if (countDisabled < 5) return;
  // check if all squares have been filled
  const isGameFinished = countDisabled === NUMBER_OF_SQUARES;
  const btnArr = document.querySelectorAll(".game-btn");
  //get all the moves
  const moves = [];
  for (let i = 0; i < 9; i++) {
    moves.push(btnArr[i].innerText === "" ? "-" : btnArr[i].innerText);
  }

  //extract winning patterns
  let combo = [];
  for (let i = 0; i < 3; i++) {
    combo.push(moves[3 * i] + moves[3 * i + 1] + moves[3 * i + 2]);

    combo.push(moves[i] + moves[i + 3] + moves[i + 6]);
  }
  combo.push(moves[0] + moves[4] + moves[8]);
  combo.push(moves[2] + moves[4] + moves[6]);

  //check for 3 in a row pattern
  if (combo.includes("XXX")) {
    alert("Congratulations, X is the winner !");
    btnArr.forEach((btn) => (btn.disabled = true));
  } else if (combo.includes("OOO")) {
    alert("Congratulations, O is the winner !");
    btnArr.forEach((btn) => (btn.disabled = true));
  } else if (isGameFinished) {
    alert("It's a tie !");
  }
};

//creates the game modal
const createTicTacToe = () => {
  //the game cannot be opened twice at the same time
  if (document.querySelector("#gameModal")) {
    return;
  }

  turn = "O";
  const gameModal = createElementWithText("div", null, "modal", "gameModal");
  gameModal.classList.add("modal--game");
  //add menu bar
  const menuBar = createMenuBar("gameModal", "Tic - Tac - Toe");
  gameModal.appendChild(menuBar);
  menuBar.style.display = "flex";
  //add buttons for moves
  const btnContainer = createElementWithText("div", null, "btn-container");
  for (let i = 0; i < NUMBER_OF_SQUARES; ++i) {
    const btn = createElementWithText("button", null, "game-btn");
    btnContainer.appendChild(btn);
    btn.addEventListener("click", () => {
      btn.innerText = turn;
      btn.style.color = turn === "O" ? "red" : "blue";
      btn.disabled = true;
      turn = turn === "O" ? "X" : "O";
      checkForWinner();
    });
  }
  gameModal.appendChild(btnContainer);

  //add play again button
  const resetBtn = createElementWithText("button", "Play Again", "btn");
  resetBtn.classList.add("btn");
  resetBtn.addEventListener("click", () => {
    resetGame();
  });
  gameModal.appendChild(resetBtn);

  //display the modal on desktop
  document.getElementsByTagName("body")[0].appendChild(gameModal);
  makeModalWindowActive(gameModal);

  gameModal.addEventListener("click", () => {
    //console.log("game got clicked");
    makeModalWindowActive(gameModal);
  });

  //gameModal.classList.add("modal--maximized");
};

//opens up a game when icon is clicked
gameIcon.addEventListener("dblclick", () => {
  createTicTacToe();
});
