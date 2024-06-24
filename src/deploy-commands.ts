import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { config } from "./config";
import commands from "./commands";

const rest = new REST({ version: "9" }).setToken(config.token);

const commandData = commands.map((cmd) => ({
  name: cmd.name,
  description: cmd.description,
}));

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      { body: commandData }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
