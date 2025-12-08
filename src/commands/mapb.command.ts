import { pokeApi } from "../utils/pokeapi.js";
import { type State } from "../state.js";
import { type FlatLocationAreaResponse } from "src/types/pokeapi.js";

async function commandMapb(state: State) {
  let locationAreas: FlatLocationAreaResponse = {
    count: 0,
    next: '',
    previous: '',
    results: [],
  };

  if (!state.prevLocationsURL) {
    console.log('No previous pages available. Use `map` first to get initial location areas.');
    return;
  } else {
    locationAreas = await pokeApi.fetchLocationAreas(state.prevLocationsURL);
  };

  state.prevLocationsURL = locationAreas.previous;
  state.nextLocationsURL = locationAreas.next;

  for (const value of locationAreas.results) {
    console.log(`${value.name}`);
  };
};

export { commandMapb };
