import { Interaction } from "discord.js";
import { commands } from "../commands";

export const interactionCreate = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) return;

  // Check if the command can only be used in a specific channel type
  if (
    command.channelType &&
    interaction.channel?.type !== command.channelType
  ) {
    await interaction.reply({
      content: `This command can only be used in ${command.channelType} channels.`,
      ephemeral: true,
    });
    return;
  }

  // Check if the user has the required permissions to use the command
  const hasPermissions =
    command.requiredPermissions?.every((permission) =>
      interaction.memberPermissions?.has(permission)
    ) || true;

  if (!hasPermissions) {
    await interaction.reply({
      content: `You do not have the required permissions to use this command.`,
      ephemeral: true,
    });
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};
