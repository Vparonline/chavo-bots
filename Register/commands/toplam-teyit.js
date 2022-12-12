const ayarlar = require("../ayarlar.json")
const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {

const embed = new Discord.MessageEmbed()
.setColor(ayarlar.renk)

if(message.author.id !== "719596854379282563") return

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let top = [...message.guild.members.cache.filter(member => db.get(`toplam_${member.id}`)).values()].sort((member1, member2) => Number(db.get(`toplam_${message.member.id}`))-Number(db.get(`toplam_${message.member.id}`))).slice(0, 15).map((member, index) => `\`${index+1}.\` ${member} | \`${db.get(`toplam_${member.id}`) || "0"}\` Toplam Kayıt. [\`${db.get(`erkek_${member.id}`) || "0"}\` Erkek, \`${db.get(`kadın_${member.id}`) || "0"}\` Kadın]`).join('\n');
if(!top) return message.lineReply(embed.setDescription(`\`❯\` \`${message.guild.name}\` Sunucusuna Ait Kayıt Bulunamadı`))

const topt = new Discord.MessageEmbed()

.setAuthor(client.user.username, client.user.avatarURL())
.setDescription(`\`❯\` \`${message.guild.name}\` Sunucusuna Ait Günlük Veri Aşağıda Belirtilmiştir. \n\n ${top}`)
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
message.lineReply(topt)

}
exports.conf = {
 aliases: ["teyit"],
 permLevel: 0,
 guildOnly: true,
};
exports.help = {
 name: "top-teyit",
 description: '.teyit [ Teyit ]',
 aliases: ["teyit"]
}