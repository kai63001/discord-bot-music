import { joinVoiceChannel } from "@discordjs/voice";

const connection = (msg: any) => {
  return joinVoiceChannel({
    channelId: msg.member?.voice.channel?.id as string,
    guildId: msg.member?.guild.id as string,
    // @ts-ignore: Unreachable code error
    adapterCreator: msg.channel.guild.voiceAdapterCreator,
  });
};

export { connection };
