import { createInterface, type Interface } from "readline";
import { commandExit, commandHelp, commandMap, commandMapb } from "./commands/index.js";
import { pokeApi, PokeAPI } from "./utils/pokeapi.js";

type Command = 'exit' | 'help' | 'map' | 'mapb';

type State = {
  interface: Interface;
  registry: Record<Command, CLICommand>;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
}

type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
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
      map: {
        name: 'map',
        description: 'Get the next 20 location areas in the Pokemon world',
        callback: commandMap,
      },
      mapb: {
        name: 'mapb',
        description: 'Get the previous 20 location areas',
        callback: commandMapb,
      }
    },
    nextLocationsURL: null,
    prevLocationsURL: null,
  };
};

export type { CLICommand, Command, State };
export { initState };
