import {
  connection as con,
  client as cli,
  disconnect as dis,
  play,
} from "@components/lib";
require("dotenv").config();

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
        con(msg);
      }
      break;
    case "!disconnect":
      dis();
      break;
    case "!play":
      play(msg);
      break;
    default:
      break;
  }
});

client.login(
  process.env.TOKEN ||
    "OTE4MDQ2NjcwMjE2OTIxMTIw.YbBjlg.J3IaADXHb-f1nu03JRJD8b_JtTs"
);
