const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js")
const ayarlar = require("../../ayarlar.json")

module.exports.run = async (client, message, args) => {

if(![ayarlar.ykayıt].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yetkin Bulunmamakta`).setColor(ayarlar.footer)).then(x => x.delete({timeout: 4000 })).catch(() => {});

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.lineReply(`Bir Kişi Belirtmelisin \`.kayıtsız <Châvo?/ID>\``).then(message.react("<a:cvo_redtik:1031169744008659014>")).then(x => x.delete({timeout: 5000 })).catch(() => {});

member.roles.cache.has(ayarlar.booster) ? member.roles.set([ayarlar.booster, ayarlar.kayıtsız]) : member.roles.set([ayarlar.kayıtsız]);
member.setNickname(`${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : ayarlar.utag} İsim | Yaş`)

const embed = new Discord.MessageEmbed()
.setDescription(`${member} Üyesi ${message.author} Tarafından Kayıtsıza Atıldı`)
.setAuthor(client.user.username, client.user.avatarURL())
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
message.lineReply(embed).then(x => x.delete({timeout: 10000 })).catch(() => {});

const chavo = new Discord.MessageEmbed()
.setDescription(`\`\`\`fix
❯ Üye: ${member.user.tag} (${member.id}) \n❯ Yetkili: ${message.author.tag} (${message.author.id}) \n❯ Rol: New Phêdra\`\`\``)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
client.channels.cache.get(ayarlar.kayıtsızlog).send(chavo);

}
exports.conf = {
 aliases: ["kayıtsız"],
 permLevel: 0
};
exports.help = {
 name: "kayıtsız",
 description: '.kayıtsız [ @üye ]',
}