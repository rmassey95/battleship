import { Player } from "./player";
import "./style.css";
import { createBoard } from "./dom";

const game = () => {
  const user = Player();
  const comp = Player();

  user.randGenPositions();
  comp.randGenPositions();

  createBoard(user, comp);
};

game();

export { game };
