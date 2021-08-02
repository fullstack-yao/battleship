import Ship from './Ship';
import config from '../config';

const {
  STATE,
  BOARD_SIZE_DEFAULT,
  BOARD_SHIPTOTALCOUNT_DEFAULT,
  SHIP_MAXLENGTH_DEFAULT,
  SHIP_MINLENGTH_DEFAULT
} = config;

class Board {
  size: number;
  board: {ship: Ship | null, isAttacked: boolean}[][];

  constructor(size: number = BOARD_SIZE_DEFAULT) {
    this.size = size;
    this.board = [];
    for (let i = 0; i < size; i++) {
      this.board[i] = [];
      for (let j = 0; j < size; j++) {
        this.board[i][j] = {ship: null, isAttacked: false};
      }
    }
  }

  isPlaceable(
    ship: Ship,
    row: number,
    column: number,
    isVertical: boolean
  ): boolean {
    if (
      row < 0 ||
      column < 0 ||
      row > this.size - 1 ||
      column > this.size - 1
    ) {
      return false;
    }

    if (isVertical) {
      if (row + ship.length >= this.size) return false;
    } else {
      if (column + ship.length >= this.size) return false;
    }

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][column].ship) {
          return false;
        }
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][column + i].ship) {
          return false;
        }
      }
    }

    return true;
  }

  placeShip(
    ship: Ship,
    row: number,
    column: number,
    isVertical: boolean
  ): boolean {
    if (!this.isPlaceable(ship, row, column, isVertical)) {
      return false;
    }

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][column] = {ship: ship, isAttacked: false};
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][column + i] = {ship: ship, isAttacked: false};
      }
    }
    return true;
  }

  placeShipsRandomly(shipTotalCount=BOARD_SHIPTOTALCOUNT_DEFAULT): void {
    const ships = [];
    for (let i = 0; i < shipTotalCount; i++) {
      ships.push(new Ship(
        Math.max(SHIP_MINLENGTH_DEFAULT,
          Math.floor(Math.random() * SHIP_MAXLENGTH_DEFAULT) + 1)
      ));
    }

    let placements = 0;

    while (placements < shipTotalCount) {
      const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;
      const row = Math.floor(Math.random() * this.size);
      const column = Math.floor(Math.random() * this.size);
      if (this.placeShip(ships[placements], row, column, isVertical)) {
        placements++;
      }
    }
  }

  receiveAttack(row: number, column: number): string {
    const cell = this.board[row][column];
    if (cell.isAttacked) {
      return STATE.ALREADY_ATTACKED;
    } else {
      cell.isAttacked = true;
      if (cell.ship) {
        const res = cell.ship.hit();
        return this.isWin() ? STATE.WIN : res;
      } else {
        return STATE.MISS;
      }
    }
  }

  isWin(): boolean {
    let isWin = true;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j].ship && !this.board[i][j].isAttacked) {
          isWin = false;
        }
      }
    }
    return isWin;
  }

}

export default Board;
