import { game } from "./index";

let gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");

const newGame = () => {
  gameContainer = document.createElement("div");
  gameContainer.classList.add("game-container");

  game();
};

const displayWinner = (whoWon) => {
  const endGame = document.createElement("div");
  const winner = document.createElement("h1");
  endGame.classList.add("end-game-msg");

  winner.innerText = `${whoWon} Wins!`;

  const playAgain = document.createElement("button");
  playAgain.innerText = "Play Again?";
  playAgain.addEventListener("click", () => {
    clearScreen();
    newGame();
  });

  endGame.append(winner, playAgain);

  document.querySelector("body").append(endGame);
};

const clearScreen = () => {
  let gameContainer = document.querySelector(".game-container");
  let endGame = document.querySelector(".end-game-msg");
  if (gameContainer) {
    gameContainer.remove();
  } else {
    endGame.remove();
  }
};

const createBoard = (user, comp) => {
  const compBoard = document.createElement("div");
  const userBoard = document.createElement("div");
  compBoard.classList.add("comp-board");
  userBoard.classList.add("user-board");

  for (let i = 0; i < 100; i++) {
    const tile = document.createElement("button");
    tile.classList.add("user-tile");
    if ((i + 1) % 10 === 0) {
      tile.classList.add("last-col");
    }
    if (i + 1 - 90 > 0) {
      tile.classList.add("last-row");
    }
    if (user.gameboard.board[i].shipHere) {
      tile.classList.add("ship");
    }
    tile.setAttribute("loc", i);
    userBoard.appendChild(tile);
  }
  gameContainer.append(userBoard);
  document.querySelector("body").append(gameContainer);

  for (let i = 0; i < 100; i++) {
    const tile = document.createElement("button");
    tile.classList.add("comp-tile");
    if ((i + 1) % 10 === 0) {
      tile.classList.add("last-col");
    }
    if (i + 1 - 90 > 0) {
      tile.classList.add("last-row");
    }
    tile.setAttribute("loc", i);

    tile.addEventListener("click", () => {
      comp.gameboard.receiveAttack(comp.gameboard.board[i].coords);

      tile.classList.add("clicked");

      if (comp.gameboard.allShipsSunk()) {
        clearScreen();
        displayWinner("User");
      } else {
        let compChoice = user.compChoice();
        let compIndexPos = user.gameboard.board.findIndex(
          (obj) =>
            obj.coords[0] == compChoice[0] && obj.coords[1] == compChoice[1]
        );
        user.gameboard.receiveAttack(compChoice);

        document
          .querySelector(`[loc="${compIndexPos}"`)
          .classList.add("clicked");

        if (user.gameboard.allShipsSunk()) {
          clearScreen();
          displayWinner("Computer");
        }
      }

      tile.disabled = true;
    });
    compBoard.appendChild(tile);
  }
  gameContainer.append(compBoard);
  document.querySelector("body").append(gameContainer);
};

export { newGame, createBoard };
