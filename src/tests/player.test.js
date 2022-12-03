import { Player } from "../player";

test("AI chooses random spot on board", () => {
  const comp = Player();
  let compCoord = comp.compChoice();

  expect(compCoord[0]).toBeLessThan(10);
  expect(compCoord[0]).toBeGreaterThanOrEqual(0);
  expect(compCoord[1]).toBeLessThan(10);
  expect(compCoord[1]).toBeGreaterThanOrEqual(0);
});

test("An already recorded miss from the computer creates a new comp choice", () => {
  const comp = Player();
  comp.gameboard.misses.push([4, 4]);
  let compCoord = comp.compChoice(4, 4);
  expect(compCoord).not.toStrictEqual([4, 4]);
});

test("new player is created and positions are randomly selected for ships", () => {
  const player = Player();
  player.randGenPositions();
  let ships = player.gameboard.board.filter((coord) => coord.shipHere != false);

  expect(ships.length).toBe(20);
});
