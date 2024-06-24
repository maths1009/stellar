import { Client, GatewayIntentBits } from "discord.js";
import { config } from "./config";
import { ready } from "./events/ready";
import { interactionCreate } from "./events/interactionCreate";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => ready(client));

client.on("interactionCreate", interactionCreate);

client.login(config.token);
