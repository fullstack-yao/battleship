import Board from '../Board';
import Ship from '../Ship';
import config from '../../config';

const { STATE } = config;

describe('Board', () => {
  let board: Board;
  let ship: Ship;
  let testBoardMatrix: {ship: Ship | null, isAttacked: boolean}[][];

  beforeEach(() => {
    board = new Board(10);
    ship = new Ship(2);
    testBoardMatrix = [];

    for (let i = 0; i < 10; i++) {
      testBoardMatrix[i] = [];
      for (let j = 0; j < 10; j++) {
        testBoardMatrix[i][j] = {ship: null, isAttacked: false};
      }
    }
  });

  test('inits a board', () => {
    expect(board).toEqual({
      size: 10,
      board: testBoardMatrix
    });
  });

  test('places a ship horizontally', () => {
    board.placeShip(ship, 0, 0, false);
    testBoardMatrix[0][0] = {ship: ship, isAttacked: false};
    testBoardMatrix[0][1] = {ship: ship, isAttacked: false};
    expect(board).toEqual({
      size: 10,
      board: testBoardMatrix
    });
  });

  test('places a ship vertically', () => {
    board.placeShip(ship, 0, 0, true);
    testBoardMatrix[0][0] = {ship: ship, isAttacked: false};
    testBoardMatrix[1][0] = {ship: ship, isAttacked: false};
    expect(board).toEqual({
      size: 10,
      board: testBoardMatrix
    });
  });

  test('is placeable with outside board', () => {
    expect(board.isPlaceable(ship, 99, 99, true)).toBe(false);
    expect(board.isPlaceable(ship, -1, -1, true)).toBe(false);
  });

  test('is placeable on occupied positions', () => {
    board.placeShip(ship, 0, 0, true);
    expect(board.isPlaceable(ship, 0, 0, true)).toBe(false);
    expect(board.isPlaceable(ship, 1, 0, true)).toBe(false);
  });

  test('receives attack with miss, hit, already attacked, sunk and win', () => {
    board.placeShip(ship, 0, 0, true);
    const ship1 = new Ship(2);
    board.placeShip(ship1, 2, 2, false);
    testBoardMatrix[0][0] = {ship: ship, isAttacked: false};
    testBoardMatrix[1][0] = {ship: ship, isAttacked: false};
    testBoardMatrix[2][2] = {ship: ship1, isAttacked: false};
    testBoardMatrix[2][3] = {ship: ship1, isAttacked: false};

    expect(board.receiveAttack(4, 4)).toBe(STATE.MISS);
    testBoardMatrix[4][4].isAttacked = true;

    expect(board.receiveAttack(0, 0)).toBe(STATE.HIT);
    testBoardMatrix[0][0].isAttacked = true;

    expect(board.receiveAttack(0, 0)).toBe(STATE.ALREADY_ATTACKED);

    expect(board.receiveAttack(1, 0)).toBe(STATE.SUNK);
    testBoardMatrix[1][0].isAttacked = true;

    expect(board.receiveAttack(2, 2)).toBe(STATE.HIT);
    testBoardMatrix[2][2].isAttacked = true;

    expect(board.receiveAttack(2, 3)).toBe(STATE.WIN);
    testBoardMatrix[2][3].isAttacked = true;

    expect(board).toEqual({
      size: 10,
      board: testBoardMatrix
    });
  });
});
