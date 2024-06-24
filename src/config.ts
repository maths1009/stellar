import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export const config = {
  token: process.env.TOKEN!,
  clientId: process.env.CLIENT_ID!,
  guildId: process.env.GUILD_ID!,
  prefix: process.env.PREFIX || "!",
};
