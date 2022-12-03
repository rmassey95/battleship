import { Ship } from "./ship";

const Gameboard = () => {
  const setGameboard = () => {
    let game = [];

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        let arr = [x, y];
        game.push({
          coords: arr,
          shipHere: false,
        });
      }
    }

    return game;
  };

  let board = setGameboard();
  let misses = [];
  let hits = [];

  const findLoc = (coord) => {
    return board.findIndex(
      (loc) => loc.coords[0] === coord[0] && loc.coords[1] === coord[1]
    );
  };

  const placeShip = (coord, length = 1) => {
    const loc = findLoc(coord);
    const createdShip = Ship(length);

    board[loc].shipHere = createdShip;
  };

  const receiveAttack = (coord) => {
    const loc = findLoc(coord);
    if (!board[loc].shipHere) {
      misses.push(coord);
    } else {
      hits.push(coord);
      board[loc].shipHere.hit();
    }
  };

  const allShipsSunk = () => {
    const ships = board.filter((loc) => typeof loc.shipHere === "object");

    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].shipHere.isSunk()) {
        return false;
      }
    }

    return true;
  };

  return {
    placeShip,
    board,
    receiveAttack,
    misses,
    hits,
    findLoc,
    allShipsSunk,
  };
};

export { Gameboard };
