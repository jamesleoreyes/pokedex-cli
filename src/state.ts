import { createInterface, type Interface } from "readline";
import { commandExit, commandHelp } from "./commands/index.js";

type Command = 'exit' | 'help';

type State = {
  interface: Interface;
  registry: Record<Command, CLICommand>
}

type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
}

function initState(): State {
  return {
    interface: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'Pokedex > ',
    }),
    registry: {
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
    }
  }
}

export type { CLICommand, Command, State };
export { initState };
