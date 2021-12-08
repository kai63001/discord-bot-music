import { Client, Intents } from "discord.js";
const token = "OTE4MDQ2NjcwMjE2OTIxMTIw.YbBjlg.J3IaADXHb-f1nu03JRJD8b_JtTs";


const clinet = new Client({intents: [Intents.FLAGS.GUILDS ,Intents.FLAGS.GUILD_MESSAGES]})

clinet.once('ready', ()=> {
    console.log("ready")
})

clinet.on('messageCreate' , msg=>{
    if (msg.content == "ปราม"){
        // console.log(msg)
        msg.reply("ไอ้เด็กเหี้ย")
    }
})

clinet.login(token)