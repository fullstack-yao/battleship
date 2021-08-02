import Board from '../factories/Board';
import config from '../config';

const {STATE_ICON} = config;

const printBoard: (board: Board['board']) => void = (board) => {
  const printedBoard1 = board.map(row => {
    return row.map(ele => {
      if (!ele.ship) {
        return ele.isAttacked ? STATE_ICON.MISS : STATE_ICON.EMPTY;
      } else {
        return ele.isAttacked ? STATE_ICON.HIT : STATE_ICON.SHIP;
      }
    });
  });
  printedBoard1.forEach(row => {
    console.log(row.join(' '));
  });
};

export default printBoard;
