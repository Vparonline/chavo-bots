const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js");

module.exports.run = async (client , message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply("Yeterli Yetkin Bulunmuyor")
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.lineReply(`Bir Kişi Belirtmelisin`).then(x => x.delete({timeout: 4000 })).catch(() => {});
if(member.roles.highest.position >= message.member.roles.highest.position) return message.lineReply('Belirttiğin Kişi Senle Aynı Veya Üstün').then(x => x.delete({timeout: 4000 })).catch(() => {});

let button1 = new MessageButton()
.setStyle('grey')
.setLabel('Streamer')
.setID('streammer')
.setEmoji('992429411343278080')

let button2 = new MessageButton()
.setStyle('grey')
.setLabel('Müzisyen')
.setID('müzisyen')
.setEmoji('992429411343278080')

let button3 = new MessageButton()
.setStyle('grey')
.setLabel('Sponsor')
.setID('sponsor')
.setEmoji('992429411343278080')

let button4 = new MessageButton()
.setStyle('grey')
.setLabel('Special')
.setID('vip')
.setEmoji('992429411343278080')

let button5 = new MessageButton()
.setStyle('grey')
.setLabel('Kaldır')
.setID(`iptal`)
.setEmoji('992429427231313991')
    
let row = new MessageActionRow()
.addComponents(button1, button2, button3, button4)
    
let row2 = new MessageActionRow()
.addComponents(button5,)

const chavo = new MessageEmbed()
.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.butonr)
.setTimestamp()
.setDescription(`${member} Belirtilen Üyenin İşlemini Belirtiniz.

\`\`\`fix
Not: İşlem 30 Saniye Sonra İptal Edilcek\`\`\``)

let msg = await message.channel.send({ components: [row, row2], embed: chavo})
var filter = (buton) => buton.clicker.member.id === message.author.id;
let collector = await msg.createButtonCollector(filter, { time: 30000 })
collector.on("collect", async (buton) => {

if(buton.id === "streammer") {
await buton.reply.defer()
await member.roles.add(ayarlar.streammer)
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üyeye <@&${ayarlar.streammer}> Başarıyla Verildi`)
msg.edit({ embed: kızmesaj, components: []})}

if(buton.id === "müzisyen") {
await buton.reply.defer()
await member.roles.add(ayarlar.müzisyen)
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üyeye <@&${ayarlar.müzisyen}> Başarıyla Verildi`)
msg.edit({ embed: kızmesaj, components: []}) }

if(buton.id === "sponsor") {
await buton.reply.defer()
await member.roles.add(ayarlar.sponsor)
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üyeye <@&${ayarlar.sponsor}> Başarıyla Verildi`)
msg.edit({ embed: kızmesaj, components: []}) }

if(buton.id === "vip") {
await buton.reply.defer()
await member.roles.add(ayarlar.vip)
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üyeye <@&${ayarlar.vip}> Başarıyla Verildi`)
msg.edit({ embed: kızmesaj, components: []}) }

if(buton.id === "iptal") {
await buton.reply.defer()
await member.roles.remove(ayarlar.vip)
await member.roles.remove(ayarlar.sponsor)
await member.roles.remove(ayarlar.müzisyen)
await member.roles.remove(ayarlar.streammer)
const kayıtiptal = new MessageEmbed()
.setDescription(`${member} Adlı Üyenin Rolleri Üzerinden Alındı`)
msg.edit({ embed: kayıtiptal, components: []})}})

}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['perm'],
 permLevel: 2
};
exports.help = {
 name: 'perm',
 description: 'Belirttiğiniz Üyeye Rol Verir',
 category:'owner',
 usage: 'category'
};