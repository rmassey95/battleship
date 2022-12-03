import { Gameboard } from "../gameboard";

test("gameboard is an array of objects", () => {
  const gameboard = Gameboard();
  expect(typeof gameboard.board).toBe("object");
});
test("gameboard is of size 100 for 10x10 square", () => {
  const gameboard = Gameboard();
  expect(gameboard.board.length).toBe(100);
});
test("there are no ships at any position in the gameboard when first created", () => {
  const gameboard = Gameboard();
  expect(
    gameboard.board.find(
      (coord) => JSON.stringify(coord.coords) === JSON.stringify([0, 1])
    ).shipHere
  ).toBeFalsy();
});

test("make sure board updates ship position", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([0, 1], 2);

  expect(
    typeof gameboard.board.find(
      (coord) => JSON.stringify(coord.coords) === JSON.stringify([0, 1])
    ).shipHere
  ).toBe("object");
});

test("receive attack function properly records a miss", () => {
  const gameboard = Gameboard();
  gameboard.receiveAttack([2, 3]);

  expect(gameboard.misses[0]).toStrictEqual([2, 3]);
});

test("receive attack function properly records a miss", () => {
  const gameboard = Gameboard();
  gameboard.receiveAttack([1, 3]);

  expect(gameboard.misses[0]).toStrictEqual([1, 3]);
});

test("receive attack function properly records a hit", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([4, 6], 2);
  gameboard.receiveAttack([4, 6]);

  expect(gameboard.misses[0]).toStrictEqual(undefined);
});

test("receive attack function properly records a hit 2", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([4, 6], 2);
  gameboard.receiveAttack([4, 6]);

  expect(
    gameboard.board
      .find((loc) => loc.coords[0] === 4 && loc.coords[1] === 6)
      .shipHere.getTimesHit()
  ).toBe(1);
});

test("receive attack function properly records a hit 3", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([8, 2], 2);
  gameboard.receiveAttack([8, 2]);

  expect(
    gameboard.board
      .find((loc) => (loc.coords[0] === 8) & (loc.coords[1] === 2))
      .shipHere.getTimesHit()
  ).toBe(1);
});

test("Creating a new ship has hits of zero upon creation", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([8, 2], 2);

  expect(
    gameboard.board
      .find((loc) => loc.coords[0] === 8 && loc.coords[1] === 2)
      .shipHere.getTimesHit()
  ).toBe(0);
});

test("receive attack function doesn't record a hit on a missed shot", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([4, 0], 2);
  gameboard.receiveAttack([1, 1]);

  expect(
    gameboard.board
      .find((loc) => loc.coords[0] === 4 && loc.coords[1] === 0)
      .shipHere.getTimesHit()
  ).toBe(0);
});

test("all ships have been sunk", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([2, 7], 1);
  gameboard.receiveAttack([2, 7]);

  expect(gameboard.allShipsSunk()).toBeTruthy();
});

test("all ships have not been sunk after missed hit", () => {
  const gameboard = Gameboard();
  gameboard.placeShip([2, 7], 1);
  gameboard.placeShip([5, 2], 1);
  gameboard.receiveAttack([1, 2]);

  expect(gameboard.allShipsSunk()).toBeFalsy();
});
