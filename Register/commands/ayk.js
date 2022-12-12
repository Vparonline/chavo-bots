const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../ayarlar.json")
const Discord = require("discord.js");
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

let utag = ayarlar.utag
let sembol = ayarlar.sembol

if(![ayarlar.ykayıt].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission("ADMINISTRATOR")) return message.lineReply(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setDescription(`${message.author} Yetkin Bulunmamakta`).setColor(ayarlar.renk)).then(message.react("<a:cvo_redtik:992429427231313991>")).then(x => x.delete({timeout: 4000 })).catch(() => {});

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.lineReply(`Bir Kişi Belirtmelisin \`.kayıt <Châvo?/ID> <isim/yaş>\``).then(message.react("<a:cvo_redtik:992429427231313991>")).then(x => x.delete({timeout: 5000 })).catch(() => {});
let isim = args[1]
if(!isim) return message.lineReply(`Bir İsim Belirtmelisin \`.kayıt <Châvo?/ID> <isim/yaş>\``).then(message.react("<a:cvo_redtik:992429427231313991>")).then(x => x.delete({timeout: 5000 })).catch(() => {});
let yaş = args[2]
if(!yaş) return message.lineReply(`Bir Yaş Belirtmelisin \`.kayıt <Châvo?/ID> <isim/yaş>\``).then(message.react("<a:cvo_redtik:992429427231313991>")).then(x => x.delete({timeout: 5000 })).catch(() => {});
if(member.roles.highest.position >= message.member.roles.highest.position) return message.lineReply('Belirttiğin Kişi Senle Aynı Veya Üstün').then(message.react("<a:cvo_redtik:992429427231313991>")).then(x => x.delete({timeout: 5000 })).catch(() => {});

await member.setNickname(`${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : ayarlar.utag} ${isim} ${sembol} ${yaş}`)

if(!member.roles.cache.has(ayarlar.man) && !member.roles.cache.has(ayarlar.woman)) {

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

db.push(`isimler.${member.id}`, {
   İsim: isim,
   Yaş: yaş,
   Rol: ["<@&990750596875313202>, <@&990750597810618438>"],
   Yetkili: message.author.id})
   
db.add(`erkek_${message.member.id}`, `1`)
db.add(`toplam_${message.member.id}`, `1`)
await member.roles.add(ayarlar.man)
await member.roles.remove(ayarlar.woman)
await member.roles.remove(ayarlar.kayıtsız)
const erkekmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üye Sunucumuza "Erkek" Olarak Kayıt Oldu`)

const erkeklog = new MessageEmbed()
.setDescription(`\`\`\`❯ Kullanıcı: ${member.user.tag} (${member.id}) \n❯ Yetkili: ${message.author.tag} (${message.author.id}) \n❯ İsim: (${utag} ${isim} ${sembol} ${yaş}) \n❯ Rol: ♂ Eron\`\`\``)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
client.channels.cache.get(ayarlar.manlog).send(erkeklog);

client.channels.cache.get(ayarlar.sohbet).send(`${member} Sunucumuza Hoşgeldin Yakışıklı \`↟\` Tagımızı Alarak Destek Olabilirsin.`).then(x => x.delete({timeout: 10000 })).catch(() => {});
msg.edit({ embed: erkekmesaj, components: []}) }

if (buton.id === "woman") {
await buton.reply.defer()

db.push(`isimler.${member.id}`, {
   İsim: isim,
   Yaş: yaş,
   Rol: ["<@&990750595507966004>, <@&990750595507966004>"],
   Yetkili: message.author.id})
  
db.add(`kadın_${message.member.id}`, `1`)
db.add(`toplam_${message.member.id}`, `1`)
await member.roles.add(ayarlar.woman)
await member.roles.remove(ayarlar.man)
await member.roles.remove(ayarlar.kayıtsız)
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üye Sunucumuza "Kız" Olarak Kayıt Oldu`)

const kızlog = new MessageEmbed()
.setDescription(`\`\`\`❯ Kullanıcı: ${member.user.tag} (${member.id}) \n❯ Yetkili: ${message.author.tag} (${message.author.id}) \n❯ İsim: (${utag} ${isim} ${sembol} ${yaş}) \n❯ Rol: ♀ Aida \`\`\``)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
client.channels.cache.get(ayarlar.womanlog).send(kızlog);
    
client.channels.cache.get(ayarlar.sohbet).send(`${member} Sunucumuza Hoşgeldin Güzellik \`↟\` Tagımızı Alarak Destek Olabilirsin.`).then(x => x.delete({timeout: 10000 })).catch(() => {});
msg.edit({ embed: kızmesaj, components: []}) }

if(buton.id === "iptal") { 
await buton.reply.defer()
await member.setNickname(`${member.user.username.includes(ayarlar.tag) ? ayarlar.tag : ayarlar.utag} İsim | Yaş`)
await member.roles.cache.has(ayarlar.booster) ? member.roles.set([ayarlar.booster, ayarlar.kayıtsız]) : member.roles.set([ayarlar.kayıtsız]);

const kayıtiptal = new MessageEmbed()
.setDescription(`${member} Adlı Üyenin Kayıt İşlemi İptal Okdu`)
msg.edit({ embed: kayıtiptal, components: []}) }})}
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek"],
    permLevel: 0
};
exports.help = {
    name: "kayıt",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}