import { Command } from "@type/commandType";
import {
  CommandInteraction,
  TextChannel,
  Snowflake,
  ChannelType,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
} from "discord.js";

export const command: Command = {
  name: "clear",
  description: "Clears messages in a channel.",
  options: [
    {
      name: "amount",
      type: ApplicationCommandOptionType.Integer,
      description: "The number of messages to clear",
      required: false,
    },
  ],
  channelType: ChannelType.GuildText,
  requiredPermissions: [PermissionFlagsBits.ManageMessages],
  execute: async (interaction: CommandInteraction) => {
    const amount = (interaction.options.get("amount")?.value as number) || 0;
    const channel = interaction.channel;

    await interaction.deferReply({ ephemeral: true });

    const deletedCount = await clearMessages(channel as TextChannel, amount);

    await interaction.editReply({
      content: `Deleted ${deletedCount} messages.`,
    });
  },
};

async function clearMessages(channel: TextChannel, amount: number) {
  let deletedCount = 0;
  let lastMessageId: Snowflake | undefined;

  while (true) {
    const fetchLimit = amount > 0 ? Math.min(amount - deletedCount, 100) : 100;
    const messages = await channel.messages.fetch({
      limit: fetchLimit,
      before: lastMessageId,
    });

    if (messages.size === 0) break;

    for (const [_, message] of messages) {
      if (amount > 0 && deletedCount >= amount) break;
      await message.delete();
      deletedCount++;
    }

    lastMessageId = messages.last()?.id;

    if (amount > 0 && deletedCount >= amount) break;
  }

  return deletedCount;
}
