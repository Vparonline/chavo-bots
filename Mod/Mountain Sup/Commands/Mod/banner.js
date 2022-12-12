const fetch = require('node-fetch');
const ayarlar = require("../../ayarlar.json")
const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {

const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
let uid = user.id
let response = fetch(`https://discord.com/api/v8/users/${uid}`, { method: 'GET', headers: { Authorization: `Bot ${client.token}`}})
let receive = ''
let banner = 'https://cdn.discordapp.com/attachments/829722741288337428/834016013678673950/banner_invisible.gif'

response.then(a => {
if(a.status !== 404) { a.json().then(data => { receive = data['banner']
if(receive !== null) {
let response2 = fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, { method: 'GET', headers: { Authorization: `Bot ${client.token}`}})
let statut = ''
response2.then(b => { statut = b.status
banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`

if(statut === 415) { banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`}})}})}})
setTimeout(() => { if (!receive) return message.lineReply("Bu Kullanıcının Banneri Bulunamadı")

const embed = new MessageEmbed()
.setDescription(`**[Banner Görüntüle](${banner})**`)
.setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setImage(banner)
.setTimestamp();
message.lineReply(embed)}, 1000)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["banner"],
    permLevel: 0
};
exports.help = {
    name: "banner",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}