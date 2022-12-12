const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js");

module.exports.run = async (client , message, args) => {

if(!message.author.id == "719596854379282563") return;

let button1 = new MessageButton()
.setStyle('grey')
.setLabel('Backup Category')
.setID('backup')
.setEmoji('937713883685204070')

let button2 = new MessageButton()
.setStyle('grey')
.setLabel('Server Category')
.setID('server')
.setEmoji('937713883685204070')

let button3 = new MessageButton()
.setStyle('grey')
.setLabel('Member Category')
.setID('member')
.setEmoji('937713883685204070')

let button4 = new MessageButton()
.setStyle('grey')
.setLabel('Guard Category')
.setID('guard')
.setEmoji('937713883685204070')

let button5 = new MessageButton()
.setStyle('grey')
.setLabel('Owner Category')
.setID('owner')
.setEmoji('937713883685204070')
    
let row = new MessageActionRow()
.addComponents(button1, button2, button3, button4, button5)

const chavo = new MessageEmbed()
.setFooter(ayarlar.footer)
.setColor("GREY")
.setTimestamp()
.setDescription(`\`${message.guild.name}\` Sunucusu \`Log-Kur\` Sistemi Belirtilmiştir.

\`Backup Log\` Backup Kategorisini Kurar
\`Server Log\` Server Kategorisini Kurar
\`Member Log\` Member Kategorisini Kurar
\`Guard Log\` Guard Kategorisini Kurar
\`Owner Log\` Owner Kategorisini Kurar`)

let msg = await message.channel.send({ components: [row], embed: chavo})
var filter = (buton) => buton.clicker.member.id === message.author.id;
let collector = await msg.createButtonCollector(filter, { time: 30000 })
collector.on("collect", async (buton) => {

if(buton.id === "backup") {
await buton.reply.defer()
const parent = await message.guild.channels.create('dshsh ', { type: 'category' });
await message.guild.channels.create('voice-log', { type: 'text', parent: parent.id });
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üyeye <@&${ayarlar.friends}> Başarıyla Verildi`)
msg.edit({ embed: kızmesaj, components: []}) }

if(buton.id === "server") {
await buton.reply.defer()
const parent = await message.guild.channels.create('dshsh ', { type: 'category' });
await message.guild.channels.create('voice-log', { type: 'text', parent: parent.id });
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üyeye <@&${ayarlar.friends}> Başarıyla Verildi`)
msg.edit({ embed: kızmesaj, components: []}) }

if(buton.id === "member") {
await buton.reply.defer()
const parent = await message.guild.channels.create('dshsh ', { type: 'category' });
await message.guild.channels.create('voice-log', { type: 'text', parent: parent.id });
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üyeye <@&${ayarlar.friends}> Başarıyla Verildi`)
msg.edit({ embed: kızmesaj, components: []}) }

if(buton.id === "guard") {
await buton.reply.defer()
const parent = await message.guild.channels.create('dshsh ', { type: 'category' });
await message.guild.channels.create('voice-log', { type: 'text', parent: parent.id });
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üyeye <@&${ayarlar.friends}> Başarıyla Verildi`)
msg.edit({ embed: kızmesaj, components: []}) }

if(buton.id === "owner") {
await buton.reply.defer()
const parent = await message.guild.channels.create('dshsh ', { type: 'category' });
await message.guild.channels.create('voice-log', { type: 'text', parent: parent.id });
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üyeye <@&${ayarlar.friends}> Başarıyla Verildi`)
msg.edit({ embed: kızmesaj, components: []}) }})

}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['setup-kur'],
 permLevel: 2
};
exports.help = {
 name: 'setup-kur',
 description: 'Belirttiğiniz Üyeye Rol Verir',
 category:'owner',
 usage: 'category'
};