import { Command } from "@type/commandType";
import { CommandInteraction } from "discord.js";

export const command: Command = {
  name: "ping",
  description: "Replies with Pong!",
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply("Pong!");
  },
};
