import { Command } from "@type/commandType";
import { Collection } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";

const commands = new Collection<string, Command>();

const commandFiles = readdirSync(__dirname).filter(
  (file) => file.endsWith(".ts") && file !== "index.ts"
);

const commandData: Array<Omit<Command, "execute">> = commandFiles.map(
  (file) => {
    const { command } = require(join(__dirname, file)) as { command: Command };
    commands.set(command.name, command);
    return {
      name: command.name,
      description: command.description,
      options: command.options || [],
    };
  }
);

export { commands, commandData };
