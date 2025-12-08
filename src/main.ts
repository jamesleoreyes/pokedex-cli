import { cleanInput } from './utils/format.js';
import { Command, initState } from './state.js';

async function main() {
  const state = initState();
  
  state.interface.prompt();
  state.interface.on('line', async (line) => {
    const input = cleanInput(line);
    if (!input) state.interface.prompt();

    const command = input[0] as Command;
    if (command in state.registry) {
      try {
        await state.registry[command].callback(state);
      } catch (error) {
        if (error instanceof TypeError) {
          console.error(`Network or CORS error: ${error.message}`)
        } else if (error instanceof SyntaxError) {
          console.error(`JSON parsing error: ${error.message}`)
        } else {
          console.error(`An error occurred when fetching Pokemon data: ${error instanceof Error ? error.message : 'idk what happened'}`);
        };
      };
    } else {
      console.log('Unknown command');
    };

    state.interface.prompt();
  });
};

main();
