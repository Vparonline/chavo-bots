const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {
    
if(!message.author.id == "719596854379282563") return;

let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
if(!rol) message.lineReply('Bir Rol Belirtmelisin')

let offline = message.guild.members.cache.filter(s => s.roles.cache.has(rol.id) && s.presence.status === 'offline')
let ses = message.guild.members.cache.filter(s => s.roles.cache.has(rol.id) && s.voice.channel)
let unses = message.guild.members.cache.filter(s => s.roles.cache.has(rol.id) && !s.voice.channel)

await message.lineReply(`Aktif Olmayan Üye Sayısı: ${offline.size}`, { code: "xl" })
await message.lineReply(`${offline.map(s => s).join(', ') || 'Bulunmuyor'}`)
await message.lineReply(`Seste Bulunan Üye Sayısı: ${ses.size}`, { code: "xl" })
await message.lineReply(`${ses.map(s => s).join(', ') || 'Bulunmuyor'}`)
await message.lineReply(`Seste Bulunmayan Üye Sayısı: ${unses.size}`, { code: "xl" })
await message.lineReply(`${unses.map(s => s).join(', ') || 'Bulunmuyor'}`)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["rol-denetim"],
    permLevel: 0
};
exports.help = {
    name: "rol-denetim",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}