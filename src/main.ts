import { Client, Intents } from "discord.js";
import { connection as con } from "@components/connect";
require("dotenv").config();
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from "@discordjs/voice";
const { join } = require("path");

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
  switch (msg.content) {
    case "!join":
      if (!msg.member?.voice.channel) {
        msg.reply("JOIN ห้อง ก่อนไอ้สัส");
      } else {
        connection = con(msg);
      }
      break;
    case "!disconnect":
      connection.destroy();
      connection = undefined;
    case "!play":
      let playing: number = 0;
      player.on(AudioPlayerStatus.Playing, () => {
        playing += 1;
        if (playing == 1) {
          msg.reply("เล่นเพลงอยู่");
        }
      });
      if (connection == undefined) {
        connection = con(msg);
      }
      const resource = createAudioResource(join(__dirname, "test.mp3"));
      player.play(resource);
      const subscribe = connection.subscribe(player);
    default:
      break;
  }
});

client.login(token);
