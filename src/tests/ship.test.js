import { Ship } from "../ship";

describe("check hit and ship sinking", () => {
  test("calling hit sinks the ship after the length is reached", () => {
    const ship = Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });

  test("ship should not be sunk after not being hit", () => {
    const ship = Ship(2);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("ship should not be sunk after being hit less than length", () => {
    const ship = Ship(2);
    ship.hit();
    expect(ship.isSunk()).toBeFalsy();
  });
});
