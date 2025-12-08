# Pokedex CLI

A fun, interactive command-line Pokedex application built with TypeScript and Node.js. Explore the Pokemon world, catch Pokemon, and build your collection!

## Features

- 🗺️ **Explore Locations**: Browse through location areas in the Pokemon world
- 🎣 **Catch Pokemon**: Attempt to catch Pokemon you encounter (success depends on their base experience)
- 📖 **Inspect Pokemon**: View detailed information about your caught Pokemon
- 📚 **Pokedex**: Keep track of all the Pokemon you've caught

## Prerequisites

- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jamesleoreyes/pokedex.git
cd pokedex
```

2. Install dependencies:
```bash
pnpm install
```

3. Build the project:
```bash
pnpm build
```

## Usage

### Starting the Application

Run the application:
```bash
pnpm start
```

Or for development with auto-reload:
```bash
pnpm dev
```

You'll see a prompt like:
```
Pokedex > 
```

### Commands

#### `help`
Displays usage information and available commands.

#### `map`
Shows the next 20 location areas in the Pokemon world. Use this to start exploring!

#### `mapb`
Shows the previous 20 location areas. Navigate backwards through locations you've already viewed.

#### `explore <location-name>`
Explore a specific location area to see what Pokemon can be found there.

**Examples:**
- `explore pastoria-city-area`
- `explore valley-windworks-area`
- `explore eterna-forest-area`
- `explore fuego-ironworks-area`
- `explore mt-coronet-1f-route-207`

#### `catch <pokemon-name>`
Attempt to catch a Pokemon! The success rate depends on the Pokemon's base experience - higher experience Pokemon are harder to catch.

**Examples:**
- `catch pikachu`
- `catch gyarados`
- `catch wingull`
- `catch gastrodon`
- `catch shellos`

#### `inspect <pokemon-name>`
View detailed information about a Pokemon you've caught, including:
- Name, height, and weight
- Base stats (HP, Attack, Defense, etc.)
- Types

**Examples:**
- `inspect pikachu`
- `inspect gyarados`
- `inspect wingull`

#### `pokedex`
View a list of all Pokemon you've successfully caught.

#### `exit`
Exit the Pokedex application.

## Example Session

```
Pokedex > map
pastoria-city-area
valley-windworks-area
eterna-forest-area
...

Pokedex > explore pastoria-city-area
Exploring pastoria-city-area...
Found Pokemon:
 - wingull
 - gastrodon
 - shellos

Pokedex > catch wingull
Throwing a Pokeball at wingull...
wingull was caught!
You can get details with the `inspect wingull` command.

Pokedex > inspect wingull
Name: wingull
Height: 6
Weight: 95
Stats:
  - hp: 40
  - attack: 30
  - defense: 30
  ...
Types:
  - water
  - flying

Pokedex > pokedex
Your Pokedex:
 - wingull

Pokedex > exit
```

## Development

### Scripts

- `pnpm build` - Compile TypeScript to JavaScript
- `pnpm start` - Run the compiled application
- `pnpm dev` - Build and run the application
- `pnpm dev:watch` - Run with nodemon for auto-reload during development
- `pnpm test` - Run tests

### Project Structure

```bash
src/
├── commands/               # Command implementations
│   ├── catch.command.ts
│   ├── exit.command.ts
│   ├── explore.command.ts
│   ├── help.command.ts
│   ├── inspect.command.ts
│   ├── map.command.ts
│   ├── mapb.command.ts
│   └── pokedex.command.ts
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
│   ├── format.ts
│   ├── pokeapi.ts
│   └── pokecache.ts
├── main.ts                 # Application entry point
└── state.ts                # Application state management
```

## How It Works

The application uses the [PokeAPI](https://pokeapi.co/) to fetch Pokemon data. When you catch a Pokemon, the success is determined by a random roll against the Pokemon's base experience value - making stronger Pokemon harder to catch!

Your caught Pokemon are stored in memory during your session. Each time you start the application, your Pokedex starts fresh.

## Contributing

This is just a fun toy project based on a project from [Boot.dev](https://www.boot.dev/courses/build-pokedex-cli-typescript)! Feel free to fork, modify, and experiment with it.
