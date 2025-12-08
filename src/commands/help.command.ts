import { type State } from "../state.js";

async function commandHelp(state: State) {
  console.log()
  console.log('Welcome to the Pokedex!');
  console.log('Usage:\n')

  for (const value of Object.values(state.registry)) {
    console.log(`${value.name}: ${value.description}`);
  };

  console.log()
};

export { commandHelp };
