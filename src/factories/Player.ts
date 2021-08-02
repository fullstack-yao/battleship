import Board from './Board';
import config from '../config';

const { STATE, BOARD_SIZE_DEFAULT } = config;

class Player {
  name: string

  constructor(name: string) {
    this.name = name;
  }

  attack(row: number, column: number, board: Board): string {
    if (
      row < 0 ||
      column < 0 ||
      row > board.size - 1 ||
      column > board.size - 1
    ) {
      return 'Invalid Coord';
    }
    return board.receiveAttack(row, column);
  }

  randomAttack(board: Board): string {
    let row = Math.floor(Math.random() * BOARD_SIZE_DEFAULT);
    let column = Math.floor(Math.random() * BOARD_SIZE_DEFAULT);
    let res = board.receiveAttack(row, column);

    while (res === STATE.ALREADY_ATTACKED) {
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);
      res = board.receiveAttack(row, column);
    }
    return res;
  }
}

export default Player;
