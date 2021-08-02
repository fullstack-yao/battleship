import config from '../config';

const { STATE } = config;

class Ship {
  length: number
  hits: number

  constructor(length: number) {
    this.length = length;
    this.hits = 0;
  }

  hit(): string {
    this.hits++;
    if (this.isSunk()) {
      return STATE.SUNK;
    }
    return STATE.HIT;
  }

  isSunk(): boolean {
    return this.hits === this.length;
  }
}

export default Ship;
