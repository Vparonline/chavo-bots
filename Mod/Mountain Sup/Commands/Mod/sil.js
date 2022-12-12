const ayarlar = require("../../ayarlar.json")
const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply("Yeterli Yetkin Bulunmuyor",)
if(!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.lineReply("1-100 Arası Miktar Belirtmelisin").then(x => x.delete({timeout: 5000 })).catch(() => {});

let adet = args[0];
message.channel.bulkDelete(adet).then(mesajlar => message.channel.send(`<a:cvo_greentik:1031169738430234716> Başarıyla <#${message.channel.id}> Adlı Kanalda \`${mesajlar.size}\` Adet Mesaj Sildim`).then(x => x.delete({timeout: 5000 })).catch(() => {}))
.catch(err => { console.error(err.message)})

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sil"],
    permLevel: 0
};
exports.help = {
    name: "sil",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}