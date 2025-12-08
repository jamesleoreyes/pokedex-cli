import { pokeApi } from "../utils/pokeapi.js";
import { type State } from "../state.js";

async function commandExplore(state: State, ...args: string[]) {
  const locationName = args[0];
  if (locationName === undefined) {
    console.log('Location area name is required. Type `help` for usage details.');
    return;
  };

  console.log(`Exploring ${locationName}...`);
  
  const locationArea = await pokeApi.fetchLocationAreaByName(locationName);
  
  console.log('Found Pokemon:');

  for (const encounter of locationArea.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  };
};

export { commandExplore };
