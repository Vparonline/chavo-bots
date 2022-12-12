const { MessageEmbed, } = require('discord.js');
const ayarlar = require("../ayarlar.json")
const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {

if (![ayarlar.ykayıt].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yetkin Bulunmamakta`).setColor(ayarlar.renk)).then(x => x.delete({timeout: 4000 })).catch(() => {});

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!member) return message.lineReply(`Bir Kişi Belirtmelisin \`.isimler <Châvo?/ID>\``).then(message.react("<a:cvo_redtik:992429427231313991>")).then(x => x.delete({timeout: 5000 })).catch(() => {});

const embed = new Discord.MessageEmbed()
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()

let isimler = db.get(`isimler.${member.id}`) || [];
isimler = isimler.reverse() 
let isimler2 = isimler.length > 0 ? isimler.map((value) => `\`${ayarlar.tag} ${value.İsim} ${ayarlar.sembol} ${value.Yaş}\` ( ${value.Rol} ) ( <@!${value.Yetkili}> )`).join("\n") : "";

message.lineReply(embed.setAuthor(client.user.username, client.user.avatarURL()).setDescription(`${member} Kişisinin Toplamda \`${isimler.length || 0}\` Kaydı Var \n\n ${isimler2}`)).then(message.react("<a:cvo_greentik:992429411343278080>")).then(x => x.delete({timeout: 15000 })).catch(() => {});
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