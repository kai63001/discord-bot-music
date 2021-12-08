import { Client, Intents } from "discord.js";
import { connection as con, client as cli } from "@components/lib";
require("dotenv").config();
import {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from "@discordjs/voice";
const { join } = require("path");

const token = process.env.TOKEN;
let connection: any;
const player = createAudioPlayer();
const client = cli();

client.once("ready", () => {
  console.log("ready");
  // @ts-ignore: Unreachable code error
  client.user.setActivity("MUSIC | !help", {
    type: "PLAYING",
  });
});

client.on("messageCreate", async (msg: any) => {
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
      break;
    case "!play":
      let playing: number = 0;
      player.on(AudioPlayerStatus.Playing, () => {
        playing += 1;
        if (playing == 1) {
          msg.reply("เล่นเพลงอยู่");
        }
      });
      if (!msg.member?.voice.channel) {
        msg.reply("JOIN ห้อง ก่อนไอ้สัส");
      } else {
        if (connection == undefined) {
          connection = con(msg);
        }
        const resource = createAudioResource(join(__dirname, "test.mp3"));
        player.play(resource);
        const subscribe = connection.subscribe(player);
      }
      break;
    default:
      break;
  }
});

client.login(token);
