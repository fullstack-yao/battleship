/* eslint-disable no-case-declarations */
import readline from 'readline';

import Board from './factories/Board';
import Player from './factories/Player';
import printBoard from './helpers/printBoard';
import getCoordFromInput from './helpers/getCoordFromInput';
import config from './config';

const { STATE } = config;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const ask = (q: string) => {
  rl.setPrompt(q);
  rl.prompt();

  const players: Player[] = [];
  const boards: Board[] = [];
  let currentPlayerIdx = 0;
  let promptIdx = 1;
  let playerName = '';

  rl.on('line', (userInput) => {
    if (userInput === 'exit') {
      rl.close();
    }

    switch (promptIdx) {
      case 1:
        playerName = userInput || 'human';
        players[0] = new Player(playerName);
        boards[0] = new Board();
        boards[0].placeShipsRandomly();
        console.log(`Hi ${playerName}, Your board has been created:`);
        printBoard(boards[0].board);
        rl.setPrompt(
          'Please enter the name for player2(enter for computer):\n'
        );
        promptIdx++;
        rl.prompt();
        break;
      case 2:
        playerName = userInput || 'computer';
        players[1] = new Player(playerName);
        boards[1] = new Board();
        boards[1].placeShipsRandomly();
        console.log(`Hi ${playerName}, Your board has been created:`);
        printBoard(boards[1].board);
        rl.setPrompt(`${players[0].name}, please attack(row, column)\n`);
        promptIdx++;
        rl.prompt();
        break;
      case 3:
        const coord = getCoordFromInput(userInput);
        if (!coord) {
          rl.setPrompt(
            `Invalid row/column. ${
              players[currentPlayerIdx].name
            }, please try again\n`
          );
          rl.prompt();
          break;
        } else {
          const row = coord[0];
          const column = coord[1];
          const opponentIdx = (currentPlayerIdx + 1) % 2;
          const res = players[currentPlayerIdx].attack(
            row,
            column,
            boards[opponentIdx]
          );
          console.log(res);
          if (res === 'Invalid Coord') {
            rl.setPrompt(
              `${players[currentPlayerIdx].name}, please try again\n`
            );
            rl.prompt();
            break;
          }
          console.log('opponent\'s board');
          printBoard(boards[opponentIdx].board);
          if (res === STATE.ALREADY_ATTACKED) {
            rl.setPrompt(
              `${players[currentPlayerIdx].name}, please try again\n`
            );
            rl.prompt();
          } else if (res === STATE.WIN) {
            console.log(
              `Congratulations ${players[currentPlayerIdx].name}!!!`
            );
            rl.close();
          } else {
            rl.setPrompt(
              `${players[opponentIdx].name}, please attack(row, column)\n`
            );
            currentPlayerIdx = opponentIdx;
            rl.prompt();
          }
          break;
        }
      default:
        break;
    }
  });

  rl.on('close', () => {
    console.log('closed');
    process.exit(0);
  });

};

ask('Please enter the name for player1(enter for human):\n');
