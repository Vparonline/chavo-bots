const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js");
const moment = require("moment")
const db = require("quick.db")
require("moment-duration-format")
moment.locale("tr")

module.exports.run = async (client, message, args,) => {

if(![ayarlar.yban].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yeterli Yetkin Bulunmamakta`).setColor(ayarlar.renk)).then(x => x.delete({timeout: 5000 })).catch(() => {});

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!user) return message.lineReply("Bir Kişi Belirtmelisin.",).then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.id === message.author.id) return message.lineReply('Kendini Banlayamassın').then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.id === client.user.id) return message.lineReply('Botlara Banlayamassın').then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.id === message.guild.OwnerID) return message.lineReply('Taç Sahibini Banlayamassın').then(x => x.delete({timeout: 5000 })).catch(() => {});
if(message.guild.members.cache.has(user.id) && message.guild.members.cache.get(user.id).hasPermission("ADMINISTRATOR"))  return message.channel.send("Belirttiğiniz Kişi Sizle Aynı Veya Üstün").then(x => x.delete({timeout: 5000 })).catch(() => {});

let reason = args.slice(1).join(" ") || "Sebeb Yok"

db.add(`Cezaİd_`, + 1);

let Cezaİd = db.fetch(`Cezaİd_`) + 0;

db.set(`cezaBilgi_${Cezaİd}`, { sebep: reason, kod: Cezaİd, yetkili: message.author.id, uyes: user.id, cezatip: "BAN"});

user.send(`${message.author} Tarafından \`${reason}\` Sebebiyle Sunucudan Banlandın.`)

const embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
.setImage(`https://media1.tenor.com/images/ed33599ac8db8867ee23bae29b20b0ec/tenor.gif?itemid=14760307`)
.setDescription(`<a:cvo_greentik:1031169738430234716> ${user} Adlı Üye \`${reason}\` Sebeble [\`#${Cezaİd}\`]`);
message.channel.send(embed)

const banlandı = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()

.setDescription(`
**Ban Atılan Üye**
\`\`\`fix
${user.user.tag} (${user.id})\`\`\`
**Ban Atan Yetkili**
\`\`\`fix
${message.author.tag} (${user.id})\`\`\`
**Sebep**
\`\`\`fix
${reason}\`\`\``)

.addFields(
{ name: "__**Ban A. Tarih**__",  value: `\`\`\`fix
${moment(Date.now()).format("LLL")}\`\`\``, inline: true },)
await client.channels.cache.get(ayarlar.banlog).send(banlandı); user.ban()

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["yargı", "guapo"],
    permLevel: 0
};
exports.help = {
    name: "ban",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}