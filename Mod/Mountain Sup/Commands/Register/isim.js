const { MessageEmbed, } = require('discord.js');
const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json")

module.exports.run = async (client, message, args) => {

let sembol = ayarlar.sembol

if(![ayarlar.ykayıt].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yetkin Bulunmamakta`).setColor(ayarlar.renk)).then(message.react("<a:cvo_redtik:992429427231313991>")).then(x => x.delete({timeout: 4000 })).catch(() => {});

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.lineReply(`Bir Kişi Belirtmelisin \`.isim <Châvo?/ID> <isim/yaş>\``).then(message.react("<a:cvo_redtik:1031169744008659014>")).then(x => x.delete({timeout: 5000 })).catch(() => {});
let isim = args[1]
if(!isim) return message.lineReply(`Bir İsim Belitmelisin \`.isim <Châvo?/ID> <isim/yaş>\``).then(message.react("<a:cvo_redtik:1031169744008659014>")).then(x => x.delete({timeout: 5000 })).catch(() => {});
let yaş = args[2]
if(!yaş) return message.lineReply(`Bir Yaş Belirtmelisin \`.kayıt <Châvo?/ID> <isim/yaş>\``).then(message.react("<a:cvo_redtik:1031169744008659014>")).then(x => x.delete({timeout: 5000 })).catch(() => {});
if(member.user.id === message.author.id) return message.lineReply("Kendi Adını Değiştiremessin").then(x => x.delete({timeout: 5000 })).catch(() => {});
if(message.member.roles.highest.position <= member.roles.highest.position) return message.lineReply("Senle Aynı Yada Üstün").then(x => x.delete({timeout: 5000 })).catch(() => {});

await member.setNickname(`${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : ayarlar.utag} ${isim} ${sembol} ${yaş}`)

const embed = new Discord.MessageEmbed()
.setDescription(`${member} Üyesinin İsmi \`${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : ayarlar.utag} ${isim} ${sembol} ${yaş}\` Olarak Değişti`)
.setAuthor(client.user.username, client.user.avatarURL())
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()

message.lineReply(embed).then(x => x.delete({timeout: 6000 })).catch(() => {});

const embed1 = new Discord.MessageEmbed()
.setDescription(`\`\`\`fix
❯ Üye: ${member.user.tag} (${member.id}) \n❯ Yetkili: ${message.author.tag} (${message.author.id}) \n❯ İsim: (${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : ayarlar.utag} ${isim} ${sembol} ${yaş})\`\`\``)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
client.channels.cache.get(ayarlar.isimlog).send(embed1);

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["isim"]
};
exports.help = {
  name: "isim",
  description: "Belirtilen Kişinin İsmini Değiştirir",
  usage: ".isim [ @üye ]"
}