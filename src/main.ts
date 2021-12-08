import { Client, Intents } from "discord.js";
import { connection as con } from "@components/connect";
require("dotenv").config();
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
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
  if (msg.content == "ปราม") {
    console.log(msg);
    msg.reply("ควย นัท");
  } else if (msg.content == "!join") {
    if (!msg.member?.voice.channel) {
      msg.reply("JOIN ห้อง ก่อนไอ้สัส");
    } else {
      connection = con(msg);
    }
  } else if (msg.content == "!disconnect") {
    connection.destroy();
  } else if (msg.content == "!play") {
    if (connection == undefined) {
      connection = con(msg);
    }
    const resource = createAudioResource(join(__dirname, "test.mp3"));
    player.play(resource);
    const subscribe = connection.subscribe(player);
  }
});

client.login(token);
