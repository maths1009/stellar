import { CommandInteraction, ChannelType } from "discord.js";

export interface Command {
  name: string;
  description: string;
  options?: any[];
  channelType?: ChannelType;
  requiredPermissions?: bigint[];
  execute: (interaction: CommandInteraction) => Promise<void>;
}
