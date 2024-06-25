import {
  CommandInteraction,
  ChannelType,
  ApplicationCommandOptionType,
} from "discord.js";

export interface Command {
  name: string;
  description: string;
  options?: Array<{
    name: string;
    description: string;
    type: ApplicationCommandOptionType;
    required: boolean;
  }>;
  channelType?: ChannelType;
  requiredPermissions?: bigint[];
  botPermissions?: bigint[];
  execute: (interaction: CommandInteraction) => Promise<void>;
}
