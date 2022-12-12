const Discord = require("discord.js"),
client = new Discord.Client();

module.exports.run = async (client, message, args) => {

if(!message.author.id == "719596854379282563") return;

let embed = new Discord.MessageEmbed()
var KanalDurum; if(message.channel.permissionsFor(message.guild.roles.everyone).has("SEND_MESSAGES")) KanalDurum = "Açık"; if(!message.channel.permissionsFor(message.guild.roles.everyone).has("SEND_MESSAGES")) KanalDurum = "Kilitli";
if(!message.member.permissions.has("ADMINISTRATOR")) return;
let secim = args[0];
    
if(!secim) return message.lineReply(embed.setDescription(`Bir argüman girmelisin \`.kilit kapat\` veya \`.kilit aç\` yazmalısınız. `).setFooter(`Kanal Durum: ${KanalDurum}`))
if(secim === "aç") {
message.lineReply(embed.setDescription(`<a:cvo_greentik:1031169738430234716> Başarıyla <#${message.channel.id}> Adlı Kanal Açıldı`))
message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: false })}

if(secim === "kapat") {
message.lineReply(embed.setDescription(`<a:cvo_greentik:1031169738430234716> Başarıyla <#${message.channel.id}> Adlı Kanal Kilitlendi`))
message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true })}

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kilit"],
    permLevel: 0
};
exports.help = {
    name: "kilit",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}