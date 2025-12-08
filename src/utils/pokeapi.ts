import { type LocationAreaResponse } from "../types/pokeapi.js";
import { Cache } from "./pokecache.js";

const pokeApiCache = new Cache(10000);

class PokeAPI {
  private static readonly baseURL = 'https://pokeapi.co/api/v2';

  constructor() { };

  async fetchLocationAreas(pageURL?: string): Promise<LocationAreaResponse> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area?offset=0&limit=20`;

    const cached = pokeApiCache.get<LocationAreaResponse>(url)
    if (cached !== undefined) return cached;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

    const data: LocationAreaResponse = await response.json();
    pokeApiCache.add(url, data);
    return data;
  };
};

const pokeApi = new PokeAPI();
export { pokeApi, PokeAPI };
