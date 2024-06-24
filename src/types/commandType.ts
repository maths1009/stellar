import { CommandInteraction, ChannelType } from "discord.js";

export interface Command {
  name: string;
  description: string;
  options?: any[];
  execute: (interaction: CommandInteraction) => Promise<void>;
}
