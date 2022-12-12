const { MessageEmbed } = require("discord.js")
const ayarlar = require("../../ayarlar.json")
const discord = require("discord.js")
const db = require("quick.db")

module.exports.run =async (bot, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply("Yeterli Yetkin Bulunmuyor",)

let tag1 = message.guild.members.cache.filter(s => !s.bot).filter(s => s.user.username.includes(ayarlar.tag) && !s.roles.cache.has(ayarlar.family))

tag1.array().forEach(async (member, index) => {
setTimeout(async () => { await member.roles.add(ayarlar.family)}, index * 1000)})

const embed = new MessageEmbed()
.setDescription(`\`${message.guild.name}\` Tag Control Paneli Belirtilmiştir.`)
.addFields({ name: "__Tag Rol__", value: `\`\`\`fix
[${tag1.size}] (${ayarlar.tag})

\`\`\``, inline: true })

message.lineReply(embed).then(x => x.delete({timeout: 10000 })).catch(() => {});

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["tagtara"],
    permLevel: 0
};
exports.help = {
    name: "tagtara",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}