const { MessageEmbed, DiscordAPIError } = require("discord.js");
const ayarlar = require('../../ayarlar.json')
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply("Yeterli Yetkin Bulunmuyor",)

const embed = new MessageEmbed()
let miktar = Number (args[0]);

message.channel.setRateLimitPerUser(miktar).catch(err => {})
message.lineReply(embed.setDescription(`<a:cvo_greentik:1031169738430234716> Başarıyla \`${miktar ? miktar : "Kapalı" }\` Olarak Ayarlandı.`)).then(m => m.delete({timeout: 5000}))

}
exports.conf= {
    enabled: true,
    guildOnly: false,
    aliases: ["slow-mode"],
    permLevel: 0
};
exports.help = {
    name: "slow-mod",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}