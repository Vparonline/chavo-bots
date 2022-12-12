const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js");
const db = require('quick.db');
const kayıt = require("../../models/kayıtlar")
const Database = require("../../models/regData.js");

module.exports.run = async (client, message, args) => {

let utag = ayarlar.utag
let sembol = ayarlar.sembol

if(![ayarlar.ykayıt].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yeterli Yetkin Bulunmamakta`).setColor(ayarlar.renk)).then(message.react("<a:cvo_redtik:1027273545862103101>")).then(x => x.delete({timeout: 5000 })).catch(() => {});

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.lineReply(`Bir Kişi Belirtmelisin \`.kayıt <Châvo?/ID> <isim/yaş>\``).then(message.react("<a:cvo_redtik:1031169744008659014>")).then(x => x.delete({timeout: 5000 })).catch(() => {});
let isim = args[1]
if(!isim) return message.lineReply(`Bir İsim Belirtmelisin \`.kayıt <Châvo?/ID> <isim/yaş>\``).then(message.react("<a:cvo_redtik:1031169744008659014>")).then(x => x.delete({timeout: 5000 })).catch(() => {});
let yaş = args[2]
if(!yaş) return message.lineReply(`Bir Yaş Belirtmelisin \`.kayıt <Châvo?/ID> <isim/yaş>\``).then(message.react("<a:cvo_redtik:1031169744008659014>")).then(x => x.delete({timeout: 5000 })).catch(() => {});
if(member.roles.highest.position >= message.member.roles.highest.position) return message.lineReply('Belirttiğin Kişi Senle Aynı Veya Üstün').then(message.react("<a:cvo_redtik:1031169744008659014>")).then(x => x.delete({timeout: 5000 })).catch(() => {});
if(member.roles.cache.get(ayarlar.erkek)) return message.lineReply(`Belirtiğin Üye Sunucuya Kayıtlı \`.kayıtsız <Châvo?/ID>\``).then(message.react("<a:cvo_redtik:1031169744008659014>")).then(x => x.delete({timeout: 5000 })).catch(() => {});
if(member.roles.cache.get(ayarlar.kız)) return message.lineReply(`Belirtiğin Üye Sunucuya Kayıtlı \`.kayıtsız <Châvo?/ID>\``).then(message.react("<a:cvo_redtik:1031169744008659014>")).then(x => x.delete({timeout: 5000 })).catch(() => {});

if(db.fetch(`taglıAlım.${message.guild.id}`)) {
if(!member.user.username.includes(ayarlar.tag)  && !member.roles.cache.has(ayarlar.family) && !member.roles.cache.has(ayarlar.booster)) return message.lineReply(new MessageEmbed().setColor("#010101").setDescription(`<a:cvo_redtik:1031169744008659014> ${member}, Adlı Üye \`(.tag)\` Tag Alıp Tekrar Kayıt Olabilirsiniz.`))}

await member.setNickname(`${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : ayarlar.utag} ${isim} ${sembol} ${yaş}`)

if(!member.roles.cache.has(ayarlar.erkek) && !member.roles.cache.has(ayarlar.kız)) {

let erkek = new MessageButton()
.setStyle("blurple")
.setLabel("Erkek")
.setID("man")
.setEmoji('993516995163213875')

let kız = new MessageButton()
.setStyle("red")
.setLabel("Kadın")
.setID("woman")
.setEmoji('993517014389887020')

let iptal = new MessageButton()
.setID("iptal")
.setStyle("green")
.setLabel("İptal")
.setEmoji('992429411343278080')

const row = new MessageActionRow()
.addComponent(erkek)
.addComponent(kız)
.addComponent(iptal)

const chavo = new MessageEmbed()
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
.setAuthor(client.user.username, client.user.avatarURL())
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
.setDescription(`\`❯\` ${member} Adlı Üye \`${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : ayarlar.utag} ${isim} ${sembol} ${yaş}\` Olarak Değişti.

\`❯\` Belirtilen Üyenin İşlemini Seçmeniz İçin 30 Saniyeniz Var.

\`\`\`Not: İsimlere Bakmak için .isimler <@Châvo?/ID>\`\`\``)

let msg = await message.channel.send({ components: [row], embed: chavo})
var filter = (buton) => buton.clicker.member.id === message.author.id;
let collector = await msg.createButtonCollector(filter, { time: 30000 })
collector.on("collect", async (buton) => {

if (buton.id === "man") { 
await buton.reply.defer()

const Databasex = new kayıt({
    user: member.id,
    isim: `${isim} | ${yaş}`,
    rol: ayarlar.erkek,
    yetkili: message.author.id,
}).save().catch(e => console.error(e))
await member.roles.add(ayarlar.erkek)
await member.roles.remove(ayarlar.kız)
await member.roles.remove(ayarlar.kayıtsız)
const erkekmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üye Sunucumuza "Erkek" Olarak Kayıt Oldu`)

const erkeklog = new MessageEmbed()
.setDescription(`\`\`\`fix
❯ Üye: ${member.user.tag} (${member.id}) \n❯ Yetkili: ${message.author.tag} (${message.author.id}) \n❯ İsim: (${utag} ${isim} ${sembol} ${yaş}) \n❯ Rol: ♂ Eron\`\`\``)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
client.channels.cache.get(ayarlar.erkeklog).send(erkeklog);
await Database.findByIdAndUpdate(message.author.id, { $inc: { erkek: 1, toplam: 1} }, { upsert: true });
client.channels.cache.get(ayarlar.sohbet).send(`${member} Sunucumuza Hoşgeldin Yakışıklı \`${ayarlar.tag}\` Tagımızı Alarak Destek Olabilirsin.`).then(x => x.delete({timeout: 10000 })).catch(() => {});
msg.edit({ embed: erkekmesaj, components: []})}

if (buton.id === "woman") {
await buton.reply.defer()

const Databasex = new kayıt({
    user: member.id,
    isim: `${isim} | ${yaş}`,
    rol: ayarlar.kız,
    yetkili: message.author.id,
}).save().catch(e => console.error(e))
await member.roles.add(ayarlar.kız)
await member.roles.remove(ayarlar.erkek)
await member.roles.remove(ayarlar.kayıtsız)
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üye Sunucumuza "Kız" Olarak Kayıt Oldu`)

const kızlog = new MessageEmbed()
.setDescription(`\`\`\`fix
❯ Üye: ${member.user.tag} (${member.id}) \n❯ Yetkili: ${message.author.tag} (${message.author.id}) \n❯ İsim: (${utag} ${isim} ${sembol} ${yaş}) \n❯ Rol: ♀ Aida \`\`\``)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
client.channels.cache.get(ayarlar.kızlog).send(kızlog);
await Database.findByIdAndUpdate(message.author.id, { $inc: { kadın: 1, toplam: 1} }, { upsert: true });
client.channels.cache.get(ayarlar.sohbet).send(`${member} Sunucumuza Hoşgeldin Güzellik \`${ayarlar.tag}\` Tagımızı Alarak Destek Olabilirsin.`).then(x => x.delete({timeout: 10000 })).catch(() => {});
msg.edit({ embed: kızmesaj, components: []})}

if(buton.id === "iptal") {
await buton.reply.defer()
await member.setNickname(`${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : ayarlar.utag} İsim | Yaş`)
await member.roles.cache.has(ayarlar.booster) ? member.roles.set([ayarlar.booster, ayarlar.kayıtsız]) : member.roles.set([ayarlar.kayıtsız]);

const kayıtiptal = new MessageEmbed()
.setDescription(`${member} Adlı Üyenin Kayıt İşlemi İptal Okdu`)
msg.edit({ embed: kayıtiptal, components: []})}})}

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["k"],
    permLevel: 0
};
exports.help = {
    name: "k",
    description: ".e [ isim yaş ]",
    usage: "k"
}