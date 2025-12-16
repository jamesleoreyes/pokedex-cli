import type { LocationAreaResponse, FlatLocationAreaResponse, Pokemon } from "../types/index.js";
import { Cache } from "./pokecache.js";

const pokeApiCache = new Cache(60000);

class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';

  constructor() { };

  async fetchLocationAreas(pageURL?: string): Promise<FlatLocationAreaResponse> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area?offset=0&limit=20`;

    const cached = pokeApiCache.get<FlatLocationAreaResponse>(url)
    if (cached !== undefined) return cached;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const data: FlatLocationAreaResponse = await response.json();
    pokeApiCache.add(url, data);
    return data;
  };

  async fetchLocationAreaByName(name: string): Promise<LocationAreaResponse> {
    if (!name) throw new Error('Location area name is required');

    const cached = pokeApiCache.get<LocationAreaResponse>(name);
    if (cached !== undefined) return cached;

    const url = `${PokeAPI.baseURL}/location-area/${name}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const data: LocationAreaResponse = await response.json();
    return data;
  };

  async fetchPokemonByName(name: string): Promise<Pokemon> {
    if (!name) throw new Error('Pokemon name is required');

    const url = `${PokeAPI.baseURL}/pokemon/${name}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const data: Pokemon = await response.json();
    return data;
  }
};

const pokeApi = new PokeAPI();
export { pokeApi, PokeAPI };
