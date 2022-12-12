const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js");

module.exports.run= async (client, message, args) => {

if(![ayarlar.ykayıt].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yetkin Bulunmamakta`).setColor(ayarlar.renk)).then(message.react("<a:cvo_redtik:992429427231313991>")).then(x => x.delete({timeout: 4000 })).catch(() => {});

let tag = (ayarlar.tag)
let Level = message.guild.premiumTier
let Member = message.guild.memberCount
let Boost = message.guild.premiumSubscriptionCount;
let Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
let Taglı = message.guild.members.cache.filter(u => u.user.username.includes(tag)).size;

const embed = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL({dynamic:true}))
.setFooter(ayarlar.footer, message.guild.iconURL({ dynamic: true }))
.setColor(ayarlar.renk)
.setTimestamp()
.setDescription(`
\`❯\` Sunucumuzda Toplam \`${Member}\` Üye Bulunmakta. 
\`❯\` Sunucumuzda Toplam \`${message.guild.members.cache.filter(member => member.presence.status !== "offline").size}\` Aktif Bulunmakta.
\`❯\` Tagımızda Toplam \`${Taglı}\` Üye Bulunmakta.
\`❯\` Seslerde Toplam \`${Voice}\` Üye Bulunmakta.
\`❯\` Toplam \`${Boost}\` Takviyeye Sahip (\`${Level}.\`) Seviye`)
message.lineReply(embed).then(x => x.delete({timeout: 15000 })).catch(() => {})

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["say"],
    permLevel: 0
};
exports.help = {
    name: "say",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}