import { createInterface } from "readline";
import { Command } from "./types.js";
import { getCommands } from "./commands/registry.js";
import { cleanInput } from "./utils/format.js";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Pokedex > ',
});

const commands = getCommands();

function startREPL() {
  rl.prompt();
  rl.on('line', line => {
    const input = cleanInput(line);
    if (!input) rl.prompt();

    // get command (simply check first word for now)
    const command = input[0] as Command;

    // execute command handler based on command found
    if (command in commands) {
      commands[command].callback(commands);
    } else {
      console.log('Unknown command');
    }

    // continue REPL
    rl.prompt();
  });
};

export { startREPL, cleanInput, rl };
