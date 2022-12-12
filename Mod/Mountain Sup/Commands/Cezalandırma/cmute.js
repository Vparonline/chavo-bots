const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js");
const db = require("quick.db")
const sicil = new db.table("cezalar"); 
const moment = require("moment");
const ms = require('ms');
moment.locale("tr")

module.exports.run = async (client, message, args,) => {

if(![ayarlar.ymute].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yeterli Yetkin Bulunmamakta`).setColor(ayarlar.renk)).then(x => x.delete({timeout: 5000 })).catch(() => {});

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!user) return message.lineReply("Bir Kişi Belirtmelisin.",).then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.id === message.author.id) return message.lineReply('Kendini Banlayamassın').then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.id === client.user.id) return message.lineReply('Botlara Banlayamassın').then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.id === message.guild.OwnerID) return message.lineReply('Taç Sahibini Banlayamassın').then(x => x.delete({timeout: 5000 })).catch(() => {});
if(message.guild.members.cache.has(user.id) && message.guild.members.cache.get(user.id).hasPermission("ADMINISTRATOR"))  return message.lineReply("Belirttiğiniz Kişi Sizle Aynı Veya Üstün").then(x => x.delete({timeout: 5000 })).catch(() => {});
let reason = args.slice(2).join(" ") || "Sebep Belirtilmedi."

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let time = args[1];
if(!time || !ms(time)) return message.channel.send('Susturma süresini belirtmelisin')
let yaziSure = time.replace("d", " Gün").replace("h", " Saat").replace("m", " Dakika").replace("s", " Saniye");    
    
db.add(`muteAlma.${user.id}`, 0)
db.add(`muteAtma.${message.member.id}`, 0)
db.add(`Cezaİd_`, +1);

let Cezaİd = db.fetch(`Cezaİd_`) + 0;

const embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
.setDescription(`<a:cvo_greentik:1031169738430234716> ${user} Adlı Üye Sunucuda \`${reason}\` Sebeble Mutelendi [\`#${Cezaİd}\`]`);
message.lineReply(embed)

moment.locale("tr")
let muteBitiş = `${moment(Date.now()+ms(time)).format("LLL")}` 
moment.locale("tr")
let muteAtılma = `${moment(Date.now()).format("LLL")}`

db.push(`${user.id}_sicil`, `(${user.user.tag}) Adlı Üye (${message.author.tag}) Tarafından (${muteAtılma}) Tarihinde [CHAT-MUTE] Cezası Almış`)

sicil.push(`sicil.${user.id}`, { Tip : "Chat Mute", Yetkili : message.author.id, reason : reason, tarih : muteAtılma });

db.set(`cezaBilgi_${Cezaİd}`, { sebep: reason, kod: Cezaİd, yetkili: message.author.id, uyes: user.id, bsure: muteAtılma, ssure: muteBitiş, cezatip: "Chat Mute"});
 
const mutelendi = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
.setDescription(`
**Mute Atılan Üye**
\`\`\`fix
${user.user.tag} (${user.id})\`\`\`
**Mute Atan Yetkili**
\`\`\`fix
${message.author.tag} (${user.id})\`\`\`
**Sebep**
\`\`\`fix
${reason}\`\`\`
**Ceza ID**
\`\`\`fix
#${Cezaİd}\`\`\``)

.addFields(
{ name: "__**Mute A. Tarih**__",  value: `\`\`\`fix
${muteAtılma}\`\`\``, inline: true },
{ name: "__**Mute B. Tarih**__",  value: `\`\`\`fix
${muteBitiş}\`\`\``, inline: true },)
await client.channels.cache.get(ayarlar.mutelog).send(mutelendi)
await user.roles.add(ayarlar.mute).catch(e => { })

setTimeout(async () => {
const mutekalktı = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
.setDescription(`${user} (\`${user.id}\`) Adlı Üyenin **Mute** Süresi Doldu`)
await client.channels.cache.get(ayarlar.mutelog).send(mutekalktı)
await user.roles.remove(ayarlar.mute).catch(e => { })}, ms(time))

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["mute"],
    permLevel: 0
};
exports.help = {
    name: "mute",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}