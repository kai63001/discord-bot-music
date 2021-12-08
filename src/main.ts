import { Client, Intents } from "discord.js";
require("dotenv").config();
import { joinVoiceChannel, getVoiceConnection } from "@discordjs/voice";

const token = process.env.TOKEN;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.once("ready", () => {
  console.log("ready");
});

client.on("messageCreate", async (msg) => {
  if (msg.content == "ปราม") {
    console.log(msg);
    msg.reply("ควย นัท");
  } else if (msg.content == "!join") {
    if (!msg.member?.voice.channel) {
      msg.reply("JOIN ห้อง ก่อนไอ้สัส");
    } else {
      const connection: any = joinVoiceChannel({
        channelId: msg.member?.voice.channel?.id as string,
        guildId: msg.member?.guild.id as string,
        // @ts-ignore: Unreachable code error
        adapterCreator: msg.channel.guild.voiceAdapterCreator,
      });
    }
  }
});

client.login(token);
