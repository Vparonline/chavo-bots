const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js");

module.exports.run = async (client , message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply("Yeterli Yetkin Bulunmuyor")
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member.user.username.includes(ayarlar.tag)) return message.lineReply("Belirtilen Üyede Tag Bulunmuyor.")
if(!member) return message.lineReply(`Bir Kişi Belirtmelisin`).then(x => x.delete({timeout: 4000 })).catch(() => {});
if(member.roles.highest.position >= message.member.roles.highest.position) return message.lineReply('Belirttiğin Kişi Senle Aynı Veya Üstün').then(x => x.delete({timeout: 4000 })).catch(() => {});

let button1 = new MessageButton()
.setStyle('grey')
.setLabel('Başlat')
.setID('streammer')
.setEmoji('992429411343278080')
    
let row = new MessageActionRow()
.addComponents(button1)

const chavo = new MessageEmbed()
.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.butonr)
.setTimestamp()
.setDescription(`${member} Belirtilen Üyenin İşlemini Belirtiniz.

\`\`\`fix
Not: İşlem 30 Saniye Sonra İptal Edilcek\`\`\``)

let msg = await message.channel.send({ components: [row,], embed: chavo})
var filter = (buton) => buton.clicker.member.id === message.author.id;
let collector = await msg.createButtonCollector(filter, { time: 30000 })
collector.on("collect", async (buton) => {

if(buton.id === "streammer") {
await buton.reply.defer()
await member.roles.add("1030944082245210245")
await member.roles.add("1030944082245210243")
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üyeye <@&1030944082245210245> Başarıyla Verildi`)
msg.edit({ embed: kızmesaj, components: []})}})

}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['ybaşlat'],
 permLevel: 2
};
exports.help = {
 name: 'ybaşlat',
 description: 'Belirttiğiniz Üyeye Rol Verir',
 category:'owner',
 usage: 'category'
};