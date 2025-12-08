import { CLICommand } from "../types/index.js";

function commandExit(commands: Record<string, CLICommand>) {
  console.log('Closing the Pokedex... Goodbye!');
  process.exit(0);
};

export { commandExit };
