import { pokeApi } from "../utils/pokeapi.js";
import { type State } from "../state.js";
import { type FlatLocationAreaResponse } from "src/types/pokeapi.js";

async function commandMap(state: State) {
  let locationAreas: FlatLocationAreaResponse = {
    count: 0,
    next: '',
    previous: '',
    results: [],
  };

  if (state.nextLocationsURL) {
    locationAreas = await pokeApi.fetchLocationAreas(state.nextLocationsURL);
  };

  if (!state.prevLocationsURL && !state.nextLocationsURL) {
    locationAreas = await pokeApi.fetchLocationAreas();
  };

  state.prevLocationsURL = locationAreas.previous;
  state.nextLocationsURL = locationAreas.next;

  for (const value of locationAreas.results) {
    console.log(`${value.name}`);
  };
};

export { commandMap };
