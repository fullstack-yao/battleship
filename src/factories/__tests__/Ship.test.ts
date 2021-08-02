import Ship from '../Ship';

describe('Ship', () => {
  let ship: Ship;

  beforeEach(() => {
    ship = new Ship(2);
  });

  test('inits a ship', () => {
    expect(ship).toEqual({ length: 2, hits: 0 });
  });

  test('gets a hit', () => {
    ship.hit();
    expect(ship.hits).toEqual(1);
  });

  test('sinks', () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
