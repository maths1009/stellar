import { Message } from "discord.js";

export const pingCommand = (message: Message) => {
  message.channel.send("Pong!");
};
