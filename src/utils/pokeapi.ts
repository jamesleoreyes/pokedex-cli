import { type LocationAreaResponse } from "../types/pokeapi.js";


class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';

  constructor() { };

  async fetchLocationAreas(pageURL?: string): Promise<LocationAreaResponse> {
    const response = await fetch(pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const data: LocationAreaResponse = await response.json();
    return data;
  };
};

const pokeApi = new PokeAPI();
export { pokeApi, PokeAPI };
