import { Client, Intents } from "discord.js";
require("dotenv").config();
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";
const { join } = require('path');

const token = process.env.TOKEN;
let connection: any;
const player = createAudioPlayer();
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
      connection = joinVoiceChannel({
        channelId: msg.member?.voice.channel?.id as string,
        guildId: msg.member?.guild.id as string,
        // @ts-ignore: Unreachable code error
        adapterCreator: msg.channel.guild.voiceAdapterCreator,
      });
    }
  } else if (msg.content == "!disconnect") {
    connection.destroy();
  } else if (msg.content == "!play") {
    const resource = createAudioResource(join(__dirname, 'test.mp3'));
    player.play(resource);
    const subscribe = connection.subscribe(player);
  }
});

client.login(token);
