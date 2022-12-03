import { Player } from "./player";
import "./style.css";
import { createBoard, createCompBoard, createUserBoard, newGame } from "./dom";

const game = () => {
  const user = Player();
  const comp = Player();

  user.randGenPositions();
  comp.randGenPositions();

  // createUserBoard(user.gameboard);
  // createCompBoard(comp.gameboard);

  createBoard(user, comp);
};

game();

export { game };
