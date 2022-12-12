const ayarlar = require('../../ayarlar.json')
const Discord = require('discord.js');
const db = require("quick.db")

module.exports.run = async (client, message, args) => {

if(![ayarlar.sahip].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yeterli Yetkin Bulunmamakta`).setColor(ayarlar.renk)).then(x => x.delete({timeout: 5000 })).catch(() => {});

if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
.setDescription(`${message.author} Küfür Sistemi Filtrelemek İçin \`aç\` Veya \`kapat\` Yazmalısın`) // Shréwd
.setColor("0x800d0d")
.setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
.setTimestamp())
.then(x => x.delete({ timeout: 5000 }));

if(args[0] == "aç") {
if(db.has(`kufurcum_${message.guild.id}`))
return message.channel.send(`<a:cvo_redtik:1031169744008659014> ${message.author} Komut Önceden Açılmış \`.küfür kapat\``).then(x => x.delete({ timeout: 3500 }));

db.set(`kufurcum_${message.guild.id}`, "acik");
message.channel.send(new Discord.MessageEmbed()
.setDescription(`<a:cvo_greentik:1031169738430234716> ${message.author} Küfür Filtresi \`Açık\``)).then(x => x.delete({ timeout: 3000 }));

} else if(args[0] == "kapat") {

if(!db.has(`kufurcum_${message.guild.id}`))
return message.channel.send(`<a:cvo_redtik:1031169744008659014> ${message.author} Komut Önceden Kapatılmış \`.küfür aç\``).then(x => x.delete({ timeout: 3500 }));

db.delete(`kufurcum_${message.guild.id}`);
message.channel.send(new Discord.MessageEmbed()
.setDescription(`<a:cvo_greentik:1031169738430234716> ${message.author} Küfür Filtresi \`Kapalı\``)).then(x => x.delete({ timeout: 3000 }))}

}
exports.conf = {
 name: "ban",
 aliases: ["küfür"],
 enabled: true,
 guildOnly: true
};
exports.help = { 
 name: 'küfür', 
 description: 'Boost basanlar isim sag tiksiz degise bilcek.',
 usage: 'rich <isim>',
 kategori: 'kullanıcı'
};