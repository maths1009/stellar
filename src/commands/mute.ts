import { Command } from "@type/commandType";
import {
  CommandInteraction,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
  User,
} from "discord.js";

export const command: Command = {
  name: "mute",
  description: "Réduit au silence un utilisateur.",
  options: [
    {
      name: "user",
      type: ApplicationCommandOptionType.User,
      description: "User to be muted",
      required: true,
    },
    {
      name: "duration",
      type: ApplicationCommandOptionType.Integer,
      description: "Silence time in minutes",
      required: false,
    },
  ],
  requiredPermissions: [PermissionFlagsBits.ModerateMembers],
  botPermissions: [PermissionFlagsBits.ModerateMembers],
  execute: async (interaction: CommandInteraction) => {
    const user = interaction.options.get("user", true)?.user as User;
    const duration = (interaction.options.get("duration", false)?.value ||
      0) as number;
    const member = interaction.guild?.members.cache.get(user.id);

    if (!member) {
      await interaction.reply({
        content: "Utilisateur non trouvé.",
        ephemeral: true,
      });
      return;
    }

    try {
      const muteDuration = duration > 0 ? duration * 60 * 1000 : null;
      await member.timeout(muteDuration, "Réduction au silence via commande");
      await member.send(
        `Vous avez été réduit au silence sur ${interaction.guild?.name} pour ${
          duration > 0 ? `${duration} minutes` : "une durée indéfinie"
        }.`
      );
      await interaction.reply({
        content: `${user?.tag} a été réduit au silence pour ${
          duration > 0 ? `${duration} minutes` : "une durée indéfinie"
        }.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content:
          "Une erreur est survenue lors de la réduction au silence de l'utilisateur.",
        ephemeral: true,
      });
    }
  },
};
