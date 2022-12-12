const ayarlar = require("../../ayarlar.json")
const Discord = require('discord.js');

module.exports.run = async (client , message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yeterli Yetkin Bulunmuyor",)

let link = args[0]
let isim = args[1];
let guild = message.guild;
    
if(!link) return message.channel.send('Link Girmelisin');
if(!isim) return message.channel.send('Emojiye isim seçmelisin');

guild.emojis.create(`${link}`, `${isim}`).then(emoji => message.channel.send(`\`${isim}\` adlı emojiyi sunucuya ekledim.`)).catch(console.error)

}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["emojiyükle"],
 permLevel: 0
};
exports.help = {
 name: "emojiyükle",
 description: ".e [ isim yaş ]",
 usage: "erkek"
}