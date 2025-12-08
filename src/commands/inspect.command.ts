import { type State } from "../state.js";

async function commandInspect(state: State, ...args: string[]) {
  const pokemonName = args[0];
  if (pokemonName === undefined) {
    console.log('Pokemon name is required. Type `help` for usage details.');
    return;
  };

  const pokemon = state.pokedex.get(pokemonName)
  if (pokemon === undefined) {
    console.log(`You have not caught a ${pokemonName}`);
    return;
  } else {
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);

    console.log('Stats:');
    for (const stat of pokemon.stats) {
      console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
    };

    console.log('Types:');
    for (const type of pokemon.types) {
      console.log(`  - ${type.type.name}`);
    };
  };
};

export { commandInspect };
