import { Gameboard } from "./gameboard";

const Player = () => {
  let gameboard = Gameboard();
  let turn = false;

  const randNum = (max) => {
    return Math.floor(Math.random() * max);
  };

  const compChoice = (num1 = randNum(10), num2 = randNum(10)) => {
    let arr = [num1, num2];

    if (gameboard.misses.length == 0 && gameboard.hits.length == 0) {
      return arr;
    } else if (
      gameboard.misses.length == 0 &&
      !gameboard.hits.find((hit) => hit[0] === arr[0] && hit[1] === arr[1])
    ) {
      return arr;
    } else if (
      gameboard.hits.length === 0 &&
      !gameboard.misses.find((miss) => miss[0] === arr[0] && miss[1] === arr[1])
    ) {
      return arr;
    } else if (
      !gameboard.misses.find(
        (miss) => miss[0] === arr[0] && miss[1] === arr[1]
      ) &&
      !gameboard.hits.find((hit) => hit[0] === arr[0] && hit[1] === arr[1])
    ) {
      return arr;
    } else {
      return compChoice();
    }
  };

  const randGenPositions = () => {
    let i = 1;
    while (i <= 20) {
      let num1 = randNum(10);
      let num2 = randNum(10);

      let coordLoc = gameboard.findLoc([num1, num2]);

      if (!gameboard.board[coordLoc].shipHere) {
        gameboard.placeShip([num1, num2]);
        i++;
      }
    }
  };

  return { gameboard, turn, compChoice, randGenPositions };
};

export { Player };
