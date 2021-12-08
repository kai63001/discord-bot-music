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
    case /!play/gm.test(msg.content):
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
