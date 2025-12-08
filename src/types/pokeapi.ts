export type FlatLocationAreaResponse = {
  count: number;
  next: string;
  previous: string | null;
  results: FlatLocationArea[];
}

type FlatLocationArea = {
  name: string;
  url: string;
}

export type LocationAreaResponse = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: Location;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
}

type EncounterMethodRate = {
  encounter_method: EncounterMethod;
  version_details: VersionDetail[];
}

type EncounterMethod = {
  name: string;
  url: string;
}

type VersionDetail = {
  rate: number;
  version: Version;
}

type Version = {
  name: string;
  url: string;
}

type Location = {
  name: string;
  url: string;
}

type Name = {
  name: string;
  language: Language;
}

type Language = {
  name: string;
  url: string;
}

type PokemonEncounter = {
  pokemon: Pokemon;
  version_details: VersionDetail2[];
}

export type Pokemon = {
  name: string;
  url: string;
}

type VersionDetail2 = {
  version: Version2;
  max_chance: number;
  encounter_details: EncounterDetail[];
}

type Version2 = {
  name: string;
  url: string;
}

type EncounterDetail = {
  min_level: number;
  max_level: number;
  condition_values: any[];
  chance: number;
  method: Method;
}

type Method = {
  name: string;
  url: string;
}
