const { MessageEmbed } = require("discord.js");
const ayarlar = require('../../ayarlar.json');
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
if(!message.member.roles.cache.get(ayarlar.yban) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("hahahaha")

const embed = new Discord.MessageEmbed()

if(!args[0] || isNaN(args[0])) return message.channel.send(embed.setDescription("Geçerli bir kişi ID'si belirtmelisin!")).then(x => x.delete({timeout: 5000}));

let kisi = await client.users.fetch(args[0]);
if(kisi) { message.guild.members.unban(kisi.id).catch(err => message.channel.send(embed.setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")))}

message.channel.send(embed.setDescription(`<a:cvo_greentik:1031169738430234716> ${kisi} Adlı Üyenin **Ban** Yasağı Kalktı`))

const blog = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
.setDescription(`${kisi} Adlı Üyenin **Ban** Yasağı Kalktı

\`❯\` Üye: (${kisi} - \`${kisi.id}\`)
\`❯\` Yetkili: (${message.author} - \`${message.author.id}\`)`)
client.channels.cache.get(ayarlar.banlog).send(blog)

}
exports.conf = {
 enabled: true,
 guildOnly: true,
 aliases: ["unban"],
 permLvl: 0,
}
exports.help = {
 name: 'unban'
}