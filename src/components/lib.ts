import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from "@discordjs/voice";
import { Client, Intents } from "discord.js";

let _connection: any;
const player = createAudioPlayer();
const { join } = require("path");

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
  _connection = joinVoiceChannel({
    channelId: msg.member?.voice.channel?.id as string,
    guildId: msg.member?.guild.id as string,
    // @ts-ignore: Unreachable code error
    adapterCreator: msg.channel.guild.voiceAdapterCreator,
  });
};

const joinServer = (msg: any) => {
  if (!msg.member?.voice.channel) {
    msg.reply("JOIN ห้อง ก่อนไอ้สัส");
  } else {
    connection(msg);
  }
};

const disconnect = () => {
  _connection.destroy();
  _connection = undefined;
};

const play = (msg: any) => {
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
    if (_connection == undefined) {
      connection(msg);
    }
    const resource = createAudioResource(join(__dirname, "test.mp3"));
    player.play(resource);
    const subscribe = _connection.subscribe(player);
  }
};

export { client, connection, disconnect, play, joinServer };
