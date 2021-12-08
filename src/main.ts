import { Client, Intents } from "discord.js";
require("dotenv").config();

const token = process.env.TOKEN;

const clinet = new Client({ intents: [Intents.FLAGS.GUILDS] });

clinet.once("ready", () => {
  console.log("ready");
});

clinet.login(token);
