import { Client, Intents } from "discord.js";
const token = "OTE4MDQ2NjcwMjE2OTIxMTIw.YbBjlg.J3IaADXHb-f1nu03JRJD8b_JtTs";


const clinet = new Client({intents: [Intents.FLAGS.GUILDS]})

clinet.once('ready', ()=> {
    console.log("ready")
})


clinet.login(token)