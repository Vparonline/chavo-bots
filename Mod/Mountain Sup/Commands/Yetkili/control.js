const { MessageEmbed } = require('discord.js');
const ayarlar = require("../../ayarlar.json")
const disbut = require("discord-buttons");
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply("Yeterli Yetkin Bulunmuyor",)
let kayitsiz = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

let kayıtsızdagit = new disbut.MessageButton()
.setLabel('Kayıtsız Rol Dağıt')
.setID('kayıtsızdagit')
.setStyle('red')

let ozi = new MessageEmbed()
.setDescription(`\`${message.guild.name}\` Kayıtsız Control Paneli Belirtilmiştir.`)

.addFields({ name: "__Kayıtsız Rol__", value: `\`\`\`fix
${kayitsiz.size} kişi\`\`\``, inline: true })

.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
.setFooter(message.author.tag, message.author.avatarURL())
.setColor(ayarlar.renk)
.setTimestamp()

let msg = await message.channel.send({ buttons : [kayıtsızdagit], embed: ozi});
var filter = (button) => button.clicker.user.id === message.author.id;
let collector = await msg.createButtonCollector(filter, { time: 30000 })
collector.on("collect", async (button) => {

if (button.id === 'kayıtsızdagit') {
 
let kayitsiz = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
button.reply.send(`
\`\`\`fix
Kayıtsız Rolü Olmayan ${kayitsiz.size} Kullanıcıya Rol Verildi\`\`\`
\`\`\`fix
Kayıtsız Rolü Verilen Kullanıcılar:\`\`\`
${kayitsiz.map(x => x || "Kayıtsız Rolü Bulunmayan Yok")}`)
message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0).map(x=> x.roles.add(ayarlar.kayıtsız))}});

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["control"],
    permLevel: 0
};
exports.help = {
    name: "control",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}