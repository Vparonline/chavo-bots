const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json")

module.exports.run = async (client, message, args,) => {

const embed = new Discord.MessageEmbed()

let rich = ayarlar.booster || undefined; if(!rich) { message.lineReply("Booster Rolünüz Bulunmuyor").then(x => x.delete({timeout: 5000})); return }

if(!message.member.roles.cache.has(rich)) { message.lineReply("Bu Komutu Kullanabilmek İçin Booster Rolüne Sahip Olmalısın").then(x=> x.delete({timeout: 5000})); return }

let uye = message.guild.members.cache.get(message.author.id);
let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('•', "•").toUpperCase()+arg.slice(1)).join(" ");
let yazilacakIsim; if(!isim) { message.lineReply("Bir İsim Belirtmelisin").then(x => x.delete({timeout: 5000})); return }
yazilacakIsim = `${uye.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.utag ? ayarlar.utag : (ayarlar.utag || ""))} ${isim}`;
uye.setNickname(`${yazilacakIsim}`).catch()

message.lineReply(`İsmin Başarıyla \`${yazilacakIsim}\` Olarak Değişti`).then(x => x.delete({timeout: 5000}).catch(err => { console.error(err.message)}));

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["booster"],
    permLevel: 0
};
exports.help = {
    name: "booster",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}