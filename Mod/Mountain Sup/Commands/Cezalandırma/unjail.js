const Discord = require("discord.js");
const db = require("quick.db")
const sicil = new db.table("tmute");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format")
const ayarlar = require("../../ayarlar.json")

module.exports.run = async (client, message, args) => {

if(![ayarlar.yjail].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yeterli Yetkin Bulunmamakta`).setColor(ayarlar.renk)).then(x => x.delete({timeout: 5000 })).catch(() => {});
            
let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!user) return message.lineReply("Bir Kişi Belirtmelisin.",)
if(user.id === message.author.id) return message.lineReply('Kendini Banlayamassın')
if(user.id === client.user.id) return message.lineReply('Botlara Banlayamassın')
if(user.id === message.guild.OwnerID) return message.lineReply('Taç Sahibini Banlayamassın')
if(message.guild.members.cache.has(user.id) && message.guild.members.cache.get(user.id).hasPermission("ADMINISTRATOR"))  return message.lineReply("Belirttiğiniz Kişi Sizle Aynı Veya Üstün")
    
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

message.channel.send(embed.setDescription(`<a:cvo_greentik:1031169738430234716> ${user} Adlı Üyenin **Jail** Yasağı Kalktı`))

db.add(`jailKaldırma.${message.member.id}`, 1)
   
const voicemutekalktı = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
.setDescription(`${user} Adlı Üyenin **Jail** Yasağı Kalktı

\`❯\` Üye: (\`${user.user.tag}\` - \`${user.id}\`)
\`❯\` Yetkili: (\`${message.author.tag}\` - \`${message.author.id}\`)`)

await client.channels.cache.get(ayarlar.jaillog).send(voicemutekalktı)

db.delete(`jaill.${user.id}`) 
let eskiRolles = await db.get(`jailRoles.${user.id}`);
await user.roles.set(eskiRolles).catch(e => { });

}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["unjail"],
 permLevel: 0
}
exports.help = {
 name: "unjail",
 description: ".unjail <Châvo?/ID>",
 usage: "unjail"
}