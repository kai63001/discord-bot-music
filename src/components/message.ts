import { MessageEmbed } from "discord.js";

const messagePlaying = (msg: any, searched: any) => {
  const user = msg.mentions.users.first() || msg.author;
  const embed = new MessageEmbed()
    .setTitle(`Playing : ${searched.items[0].snippet.title}`)
    .setAuthor(user.username, user.avatarURL())
    .setImage(searched.items[0].snippet.thumbnails.medium.url)
    .setURL(`https://www.youtube.com/watch?v=${searched.items[0].id.videoId}`)
    .setColor("RANDOM");
  msg.reply({ embeds: [embed] });
};

const messageJoinFirst = (msg: any) => {
  const user = msg.mentions.users.first() || msg.author;
  const embed = new MessageEmbed()
    .setTitle("You should voice join channel first.")
    .setAuthor(user.username, user.avatarURL())
    .setColor("RANDOM");
  msg.reply({ embeds: [embed] });
};

export { messagePlaying,messageJoinFirst };
