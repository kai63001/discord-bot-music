import {
  connection as con,
  client as cli,
  disconnect as dis,
  play,
  joinServer,
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
  switch (true) {
    case msg.content == "!join":
      joinServer(msg);
      break;
    case msg.content == "!disconnect":
      dis();
      break;
    case msg.content.indexOf("!play") == 0:
      const letplay = play(msg);
      break;
    case msg.content == "!!help":
      msg.reply("!play <song name> or <URL>")

    default:
      break;
  }
});

client.login(process.env.TOKEN);
