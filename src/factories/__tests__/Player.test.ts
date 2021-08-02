import Board from '../board';
import Player from '../Player';
import Ship from '../Ship';

describe('Player', () => {
  let player: Player;
  let board: Board;

  beforeEach(() => {
    player = new Player('human');
    board = new Board();
  });

  test('inits a player', () => {
    expect(player).toEqual({ name: 'human'});
  });

  test('attacks with an invalid coord', () => {
    expect(player.attack(99, 99, board)).toBe('Invalid Coord');
  });

  test('attacks randomly', () => {
    expect(player.randomAttack(board)).not.toBe('Invalid Coord');
  });
});
