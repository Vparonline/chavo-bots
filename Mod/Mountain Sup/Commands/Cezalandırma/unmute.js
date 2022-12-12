const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js");
const db = require("quick.db")
const sicil = new db.table("cezalar");
const moment = require("moment");
const ms = require('ms');
moment.locale("tr")

module.exports.run = async (client, message, args,) => {

if(![ayarlar.ymute].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yeterli Yetkin Bulunmamakta`).setColor(ayarlar.renk)).then(x => x.delete({timeout: 5000 })).catch(() => {});

const embed = new Discord.MessageEmbed()

const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!user) return message.lineReply("Belirttiğiniz kullanıcı geçerli değil.").then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.id === message.author.id) return message.lineReply('Kendi Muteni kaldıramazsın.').then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.id === client.user.id) return message.lineReply('Botun Mutesin kaldıramazsın.').then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.id === message.guild.OwnerID) return message.lineReply('Sunucu sahibinin Mutesini kaldıramazsın.').then(x => x.delete({timeout: 5000 })).catch(() => {});
if(user.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`).then(x => x.delete({timeout: 5000 })).catch(() => {});

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

message.channel.send(embed.setDescription(`<a:cvo_greentik:1031169738430234716> ${user} Adlı Üyenin **Mute** Yasağı Kalktı`))

const cmute = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
.setDescription(`${user} Adlı Üyenin **Mute** Yasağı Kalktı

\`❯\` Üye: (\`${user.user.tag}\` - \`${user.id}\`)
\`❯\` Yetkili: (\`${message.author.tag}\` - \`${message.author.id}\`)`)

await client.channels.cache.get(ayarlar.mutelog).send(cmute)
await user.roles.remove(ayarlar.mute)

    }
    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ["unmute"],
        permLevel: 0
    };
    exports.help = {
        name: "unmute",
        description: ".e [ isim yaş ]",
        usage: "erkek"
    }