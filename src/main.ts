import { cleanInput } from './utils/format.js';
import { Command, initState } from './state.js';

function main() {
  const state = initState();

  state.interface.prompt();
  state.interface.on('line', line => {
    const input = cleanInput(line);
    if (!input) state.interface.prompt();

    // get command (simply check first word for now)
    const command = input[0] as Command;

    // execute command handler based on command found
    if (command in state.registry) {
      state.registry[command].callback(state);
    } else {
      console.log('Unknown command');
    }

    // continue REPL
    state.interface.prompt();
  });
};

main();
