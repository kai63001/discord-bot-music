import { joinVoiceChannel } from "@discordjs/voice";
import { Client, Intents } from "discord.js";

const client = () => {
  return new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ],
  });
};

const connection = (msg: any) => {
  return joinVoiceChannel({
    channelId: msg.member?.voice.channel?.id as string,
    guildId: msg.member?.guild.id as string,
    // @ts-ignore: Unreachable code error
    adapterCreator: msg.channel.guild.voiceAdapterCreator,
  });
};

export { client, connection };
