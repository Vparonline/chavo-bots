const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db")
const ms = require('ms');
const sicil = new db.table("tmute");
require("moment-duration-format")

module.exports.run = async (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply("Yeterli Yetkin Bulunmuyor",)

let embed = new Discord.MessageEmbed()
.setColor(ayarlar.renk)

if(!args[0]) { message.lineReply(embed.setDescription(`<a:cvo_redtik:1031169744008659014> Taglı Alım Sistemini Kullanmak için (\`.taglıalım aç/kapat\`)`)); return;}

if(args[0] === "aç") {
if(db.fetch(`taglıAlım.${message.guild.id}`)) return message.lineReply(embed.setDescription(`<a:cvo_redtik:1031169744008659014> Taglı Alım Sistemi Zaten Aktif (\`.taglıalım kapat\`)`))
db.set(`taglıAlım.${message.guild.id}`, "taglıAlım"); message.lineReply(embed.setDescription(`<a:cvo_greentik:1031169738430234716> Başarıyla Taglı Alım Açıldı.`)); return;    

} else 

if(args[0] === "kapat") {
if(!db.fetch(`taglıAlım.${message.guild.id}`)) return message.lineReply(embed.setDescription(`<a:cvo_redtik:1031169744008659014> Taglı Alım Sistemi Zaten Devre Dışı (\`.taglıalım aç\`)`));
db.delete(`taglıAlım.${message.guild.id}`); message.lineReply(embed.setDescription(`<a:cvo_greentik:1031169738430234716> Başarıyla Taglı Alım Kapatıldı.`)); return;}

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["taglıalım"],
    permLevel: 0
};
exports.help = {
    name: "taglıalım",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}