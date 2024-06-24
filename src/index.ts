import { Client, GatewayIntentBits, Message } from "discord.js";
import { config } from "./config";
import { ready } from "./events/ready";
import { pingCommand } from "./commands/ping";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => ready(client));

client.on("messageCreate", (message: Message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  if (command === "ping") {
    pingCommand(message);
  }
});

client.login(config.token);
