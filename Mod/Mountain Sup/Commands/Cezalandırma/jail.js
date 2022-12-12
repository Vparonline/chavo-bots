const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db")
const ms = require('ms');
const sicil = new db.table("tmute");
require("moment-duration-format")

module.exports.run = async (client, message, args) => {

if(![ayarlar.yjail].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yeterli Yetkin Bulunmamakta`).setColor(ayarlar.renk)).then(x => x.delete({timeout: 5000 })).catch(() => {});

let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!user) return message.lineReply("Bir Kişi Belirtmelisin.",).then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.id === message.author.id) return message.lineReply('Kendini Banlayamassın').then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.id === client.user.id) return message.lineReply('Botlara Banlayamassın').then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.id === message.guild.OwnerID) return message.lineReply('Taç Sahibini Banlayamassın').then(x => x.delete({timeout: 5000 })).catch(() => {});
if(message.guild.members.cache.has(user.id) && message.guild.members.cache.get(user.id).hasPermission("ADMINISTRATOR"))  return message.lineReply("Belirttiğiniz Kişi Sizle Aynı Veya Üstün").then(x => x.delete({timeout: 5000 })).catch(() => {});

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

let time = args[1];
if(!time || !ms(time)) return message.lineReply('Jail Süresi Belirtmelisin.'); moment.locale("tr")
let reason = args.slice(2).join(" ") || "Sebeb Belirtilmedi";
let yaziSure = time.replace("d", " Gün").replace("h", "Saat").replace("m", " Dakika").replace("s", " Saniye");

db.add(`jailAlma.${user.id}`, 0) 
db.add(`jailAtma.${message.member.id}`, 0)

db.add(`Cezaİd_`, + 1);

let Cezaİd = db.fetch(`Cezaİd_`) + 0;

const embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
.setDescription(`<a:cvo_greentik:1031169738430234716> ${user} Adlı Üye Sunucuda \`${reason}\` Sebeble Jaillendi [\`#${Cezaİd}\`]`);
message.lineReply(embed)

moment.locale("tr")
let muteBitiş = `${moment(Date.now()+ms(time)).format("LLL")}` 
moment.locale("tr")
let muteAtılma = `${moment(Date.now()).format("LLL")}`

db.set(`jailRoles.${user.id}`, user.roles.cache.map(x => x.id))

db.push(`${user.id}_sicil`, `(${user.user.tag}) Adlı Üye (${message.author.tag}) Tarafından (${muteAtılma}) Tarihinde [JAİL] Cezası Almış`)

sicil.push(`sicil.${user.id}`, { Tip : "Jail", Yetkili : message.author.id, reason : reason, tarih : muteAtılma });
        
db.set(`cezaBilgi_${Cezaİd}`, { sebep: reason, kod: Cezaİd, yetkili: message.author.id, uyes: user.id, bsure: muteAtılma, ssure: muteBitiş, cezatip: "Temp Jail"});

user.roles.set(user.roles.cache.has(ayarlar.booster) ? [ayarlar.jail, ayarlar.booster] : [ayarlar.jail]);

const mutelendi = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()

.setDescription(`
**Jail Atılan Üye**
\`\`\`fix
${user.user.tag} (${user.id})\`\`\`
**Jail Atan Yetkili**
\`\`\`fix
${message.author.tag} (${user.id})\`\`\`
**Sebep**
\`\`\`fix
${reason}\`\`\`
**Ceza ID**
\`\`\`fix
#${Cezaİd}\`\`\``)

.addFields(
{ name: "__**Jail A. Tarih**__",  value: `\`\`\`fix
${muteAtılma}\`\`\``, inline: true },
{ name: "__**Jail B. Tarih**__",  value: `\`\`\`fix
${muteBitiş}\`\`\``, inline: true },)

client.channels.cache.get(ayarlar.jaillog).send(mutelendi)

setTimeout(async () => {
const mutelendi = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
.setDescription(`${user} (\`${user.id}\`) Adlı Üyenin **Jail** Süresi Doldu`)
client.channels.cache.get(ayarlar.jaillog).send(mutelendi)

let eskiRolles = await db.get(`jailRoles.${user.id}`);
user.roles.set(eskiRolles).catch(e => { })}, ms(time));

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["jail"],
    permLevel: 0
};
exports.help = {
    name: "jail",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}