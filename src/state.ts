import { createInterface, type Interface } from "readline";
import { commandExit, commandHelp, commandMap, commandMapb, commandExplore } from "./commands/index.js";

type Command = 'exit' | 'help' | 'map' | 'mapb' | 'explore';

type State = {
  interface: Interface;
  registry: Record<Command, CLICommand>;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
}

type CLICommand = {
  name: string;
  description: string;
  examples?: string[];
  callback: (state: State, ...args: string[]) => Promise<void>;
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
      },
      explore: {
        name: 'explore',
        description: 'Show a list of Pokemon in a location area',
        examples: [
          'explore pastoria-city-area',
          'explore valley-windworks-area',
          'explore eterna-forest-area',
          'explore fuego-ironworks-area',
          'explore mt-coronet-1f-route-207',
        ],
        callback: commandExplore,
      },
    },
    nextLocationsURL: null,
    prevLocationsURL: null,
  };
};

export type { CLICommand, Command, State };
export { initState };
