import { pokeApi } from "../utils/pokeapi.js";
import { type State } from "../state.js";

async function commandCatch(state: State, ...args: string[]) {
  const pokemonName = args[0];
  if (pokemonName === undefined) {
    console.log('Pokemon name is required. Type `help` for usage details.');
    return;
  };

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await pokeApi.fetchPokemonByName(pokemonName);

  const max = 600;
  const roll = Math.floor(Math.random() * max);
  if (roll > pokemon.base_experience) {
    console.log(`${pokemonName} was caught!`);
    console.log(`You can get details with the \`inspect ${pokemonName}\` command.`);
    state.pokedex.set(pokemonName, pokemon);
  } else {
    console.log(`${pokemonName} escaped!`);
  };

};

export { commandCatch };
