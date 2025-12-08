import { CLICommand, Command } from "src/types.js";
import { commandExit, commandHelp } from "./index.js";

function getCommands(): Record<Command, CLICommand> {
  return {
    help: {
      name: 'help',
      description: 'Displays usage of CLI',
      callback: commandHelp,
    },
    exit: {
      name: 'exit',
      description: 'Exits the pokedex',
      callback: commandExit,
    },
  };
};

export { getCommands };
