import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from "@discordjs/voice";
import { Client, Intents } from "discord.js";
import { youtube } from "@components/youtube";

let _connection: any;
const player = createAudioPlayer();

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

const play = async (msg: any) => {
  let playing: number = 0;
  player.on(AudioPlayerStatus.Playing, () => {
    playing += 1;
    if (playing == 1) {
      msg.reply("เล่นเพลงอยู่");
    }
  });
  if (!msg.member?.voice.channel) {
    msg.reply("JOIN ห้อง ก่อนไอ้สัส");
    return;
  } else {
    if (msg.content.replace(/!play/g, "").trim().length == 0) {
      msg.reply("จะให้เล่นอะไรวะครับ !play ชื่อเพลง ไม่ก็ link");
      return;
    }
    if (msg?.guild?.voice?.cannel == undefined) {
      connection(msg);
    }
    if (msg.content.indexOf("youtube.com") >= 0) {
      const path = await youtube(msg);
      // console.log(path)
      const resource = await createAudioResource(path[1].url);
      player.play(resource);
      const subscribe = _connection.subscribe(player);
    } else {
      msg.reply("ยังไม่ได้ทำใจเย็นๆ");
    }
  }
  return;
};

function sleep(ms: number | undefined) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export { client, connection, disconnect, play, joinServer };
