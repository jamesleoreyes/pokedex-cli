import { pokeApi } from "../utils/pokeapi.js";
import { type State } from "../state.js";

async function commandPokedex(state: State) {
  if (state.pokedex.size === 0) {
    console.log('You have not caught any Pokemon yet! Use `catch <pokemon_name>` to try and catch one.');
    return;
  };

  console.log('Your Pokedex:');

  for (const [name, _] of state.pokedex) {
    console.log(` - ${name}`);
  };
};

export { commandPokedex };
