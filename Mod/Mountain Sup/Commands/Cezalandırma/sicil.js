const ayarlar = require('../../ayarlar.json')
const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async (client, message, args,) => {

if(!message.member.roles.cache.has() && !message.member.hasPermission("ADMINISTRATOR")) return
let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!user) return message.channel.send("Bir Kişi Belirtmelisin.",)
if(!db.get(`${user.id}_sicil`)) return message.channel.send("Belirttiğiniz Üyenin Sicili Temiz");


let sicil = db.get(`${user.id}_sicil`).map((data, index) => `${index+1}. ${data}`).join("\n\n")

message.channel.send(`\`\`\`yaml
\n${sicil}
\`\`\``)

}
exports.conf = {
    guildOnly: true,
    aliases: ["sicil"],
    permLevel: 0
};

exports.help = {
    name: "sicil",
};