const ayarlar = require("../../ayarlar.json")
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

let member = message.mentions.members.first() ||  message.guild.members.cache.get(args[0]) || message.member;

const embed = new Discord.MessageEmbed()
.setDescription(`**[Avatar Görüntüle](${member.user.avatarURL({dynamic: true})})**`)
.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
.setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp();
message.lineReply(embed)

}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['pp'],
 permLevel: 0
}
exports.help = {
 name: 'avatar',
 kategori: 'avatar komutu'
}