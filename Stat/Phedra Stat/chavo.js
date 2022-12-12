const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const settings = require("./src/configs/settings.json");
const chavo = require('discord-buttons')
const db = require('quick.db')
chavo(client)
client.commands = new Collection();
client.aliases = new Collection();
client.cooldown = new Map();
require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");

client
.login(settings.token)
.then(() => console.log("[BOT] Bot connected!"))
.catch(() => console.log("[BOT] Bot can't connected!"));


client.on('ready', () => { 
client.user.setPresence({ activity: { name: "Châvo? ❤️ Phêdra" }, status: "dnd" }) 
client.channels.cache.get('1027156940285038643').join();  console.log(`Discord Botu ${client.user.tag} Adı İle Giriş Yaptı`)});

client.on('voiceStateUpdate', async (___, newState) => {
if(newState.member.user.bot && newState.channelID && newState.member.user.id == client.user.id && !newState.selfDeaf ) { newState.setSelfDeaf(true); //newState.setSelfMute(true);
}});