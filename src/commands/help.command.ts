import { CLICommand, Command } from "../types/index.js";

function commandHelp(commands: Record<Command, CLICommand>) {
  console.log()
  console.log('Welcome to the Pokedex!');
  console.log('Usage:\n')

  for (const value of Object.values(commands)) {
    console.log(`${value.name}: ${value.description}`);
  };

  console.log()
};

export { commandHelp };
