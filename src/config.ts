export default {
  BOARD_SIZE_DEFAULT: 10,
  BOARD_SHIPTOTALCOUNT_DEFAULT: 5,
  SHIP_MINLENGTH_DEFAULT: 2,
  SHIP_MAXLENGTH_DEFAULT: 5,
  STATE: {
    HIT: 'hit',
    MISS: 'miss',
    ALREADY_ATTACKED: 'already attacked',
    SUNK: 'sunk',
    WIN: 'win'
  },
  STATE_ICON: {
    EMPTY: 'O',
    SHIP: '#',
    MISS: '-',
    HIT: 'X'
  }
};
