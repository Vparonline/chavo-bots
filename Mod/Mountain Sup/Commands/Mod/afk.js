const ayarlar = require("../../ayarlar.json")
const Discord = require('discord.js');
const db = require('quick.db')

module.exports.run = async (client, message, args) => { if(message.member.displayName.includes("[AFK]")) return

const embed = new Discord.MessageEmbed()

let user = message.author
let sebep = args.join(' ') || `Sebeb Belirtilmedi`;
 
if(!sebep) return message.lineReply(embed.setDescription(`Bir Sebeb Belirtmelisin.`)).then(x => x.delete({timeout: 4000 })).catch(() => {});
if(message.member.manageable) message.member.setNickname(`[AFK] ${message.member.displayName}`); db.set(`afk_${user.id}`, sebep)

message.lineReply(embed.setDescription(`${message.author} Başarıyla \`${sebep}\` Sebebiyle AFK Oldun.`)).then(x => x.delete({timeout: 4000 })).catch(() => {});

}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["afk"],
 permLevel: 0
};
exports.help = {
 name: "afk",
 description: ".afk [ sebeb ]",
 usage: "afk"
}