const Discord = require('discord.js')
const ayarlar = require("../../ayarlar.json")

module.exports.run = async (client, message, args) => {
        
const embed = new Discord.MessageEmbed()
        
if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply("Yeterli Yetkin Bulunmuyor",)

let sesteolmayan = message.guild.members.cache.filter(s => s.roles.cache.has(ayarlar.ykayıt)).filter(s => !s.voice.channel).map(s => s).join('\n')
message.lineReply(`\`\`\`yaml
➹ Mountain Ses Aktifliğini Arttırmak İçin Müsaitseniz Ses Odalarına Değilseniz Alone Odalarına Geçebilirsiniz.\`\`\`${sesteolmayan}`)

}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["ysay"],
 permLevel: 0
};
exports.help = {
 name: "ysay",
 description: "Belirtilen Etikette Kaç Kişi Olduğunu Gösterir",
};