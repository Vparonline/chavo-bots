const { MessageEmbed, } = require('discord.js');
const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js")
const kayıt = require("../../models/kayıtlar")

module.exports.run = async (client, message, args) => {

if(![ayarlar.ykayıt].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yetkin Bulunmamakta`).setColor(ayarlar.renk)).then(message.react("<a:cvo_redtik:992429427231313991>")).then(x => x.delete({timeout: 4000 })).catch(() => {});

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!member) return message.lineReply(`Bir Kişi Belirtmelisin \`.isimler <Châvo?/ID>\``).then(message.react("<a:cvo_redtik:1031169744008659014>")).then(x => x.delete({timeout: 5000 })).catch(() => {});

const embed = new Discord.MessageEmbed()
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()

kayıt.find({user: member.id}, async (err, res) => {
let listed = res.reverse();
let History = listed.map((x, index) => `\`${index + 1}.\` \`${x.isim}\` ( <@&${x.rol}> ) ( <@${x.yetkili}> )`).join("\n");
      
message.lineReply(embed.setDescription(`${member} Kişisinin Toplamda \`${listed.length || 0}\` Kaydı Var \n\n ${History}`))})

}
exports.conf = {
    aliases: ["isimler"],
    permLevel: 0,
    guildOnly: true,
};
exports.help = {
    name: "isimler",
    description: '.isimler [ isimler ]',
    aliases: ["isimler"]
}