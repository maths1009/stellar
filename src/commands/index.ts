import { Command } from "@type/commandType";
import { Collection } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";

const commands = new Collection<string, Command>();

const commandFiles = readdirSync(__dirname).filter(
  (file) => file.endsWith(".ts") && file !== "index.ts"
);

for (const file of commandFiles) {
  const { command } = require(join(__dirname, file));
  commands.set(command.name, command);
}

export default commands;
