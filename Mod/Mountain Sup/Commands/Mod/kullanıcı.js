const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js");
const moment = require("moment")
require('moment-duration-format');

module.exports.run = async (client, message, args) => {

if(message.channel.type == "dm")  return;
if(message.channel.type !== "text") return;

var user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.client.users.cache.find(m => m.username === args.slice(0).join(" ")) || message.author; message.author;
const member = message.guild.member(user)
let kisi = client.users.cache.get(member.id);

moment.locale('tr-TR');
  var userRoles
    if(member.roles.size > 1) {
      userRoles = `${member.roles.array().sort((a, b) => a.comparePositionTo(b)).slice(1).reverse().map(role => `**\`${role.name}\`**`)}`
        } else { userRoles = '`Bulunmuyor`'}
              
function checkDays(date) {
  let now = new Date();
    let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " gün" : " gün") + " önce";};

if(!member) return message.reply('Bir Kişi Belirtmelisin')
  let serverSize = message.guild.memberCount;
    let durum = (member.user.presence.status).replace('dnd', '\`Rahatsız Etmeyin\`').replace('idle', '\`Boşta\`').replace('online', '\`Aktif\`').replace('offline', '\`Çevrimdışı\`');

const embed = new Discord.MessageEmbed()
.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)
.addField('Üye Bilgi:', `Nick: \`${member.displayName}\` \nDurum: ${durum}  \nKatılma: \`${moment.utc(member.joinedAt).format('Do MMMM YYYY')} - ${checkDays(member.joinedAt)}\`  \nSunucu Rolleri: ${member.roles.cache.sort((b, a) => { return a.position - b.position }).map(role => `${role}`).join(" | ")}`, false)        
.addField('Kullanıcı Bilgi:', `Hesap Tarihi: \`${moment.utc(user.createdAt).format('Do MMMM YYYY')} - ${checkDays(user.createdAt)}\`  \nKullanıcı ID: \`${member.user.id}\`  \nEtiket Tag: \`${member.user.tag}\``, false)
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
return message.lineReply(embed)

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kb"],
    permLevel: 0
};
exports.help = {
    name: "kb",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}