const { MessageButton, MessageActionRow } = require("discord-buttons");
const messageUserChannel = require("../schemas/messageUserChannel");
const voiceUserChannel = require("../schemas/voiceUserChannel");
const voiceUserParent = require("../schemas/voiceUserParent");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const conf = require("../configs/config.json");
const Discord = require("discord.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
conf: {
 aliases: [],
  name: 'stat',
   help: "stat"},

run: async (client, message, args, embed) => {
const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
const category = async (parentsArray) => {
const data = await voiceUserParent.find({ guildID: message.guild.id, userID: message.author.id });
const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
let voiceStat = 0;
for (var i = 0; i <= voiceUserParentData.length; i++) { voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;}
return moment.duration(voiceStat).format("H [saat], m [dakika]")};
    
const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: message.author.id }).sort({ channelData: -1 });
const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: message.author.id }).sort({ channelData: -1 });
const voiceLength = Active2 ? Active2.length : 0;
let voiceTop;
let messageTop;
Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."
Active2.length > 0 ? voiceTop = Active2.splice(0, 5).map(x => `<#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : voiceTop = "Veri bulunmuyor."
    
const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: message.author.id });
const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: message.author.id });
const messageDaily = messageData ? messageData.dailyStat : 0;
const messageWeekly = messageData ? messageData.weeklyStat : 0;
const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");

const filteredParents = message.guild.channels.cache.filter((x) => x.type === "category" &&
!conf.publicParents.includes(x.id) &&
!conf.registerParents.includes(x.id) &&
!conf.solvingParents.includes(x.id) &&
!conf.privateParents.includes(x.id) &&
!conf.aloneParents.includes(x.id) &&
!conf.funParents.includes(x.id));

let button1 = new MessageButton()
.setStyle('grey')
.setLabel('Ses Bilgi')
.setID('ses')
.setEmoji('1026582691371548732')

let button2 = new MessageButton()
.setStyle('grey')
.setLabel('Mesaj Bilgi')
.setID('mesaj')
.setEmoji('1026582731385217084')

let row = new MessageActionRow()
.addComponents(button1, button2,)

embed.setFooter("Châvo? ❤️ Phêdra")
embed.setColor("#ba7635")
embed.setTimestamp()
embed.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
embed.setAuthor(message.member.user.tag, message.author.avatarURL({dynamic: true}))
embed.setDescription(`${message.author} (\`${message.author.id}\`) Adlı Üyenin İstatistik Bilgileri

**Hesap Bilgi**
\`❯\` Üye: ${message.author}
\`❯\` Üye ID: (\`${message.author.id}\`)
\`❯\` Hesap Tarih: \`${moment(user.createdAt).format('DD')}/${moment(user.createdAt).format('MM')}/${moment(user.createdAt).format('YY HH:mm:ss')}\`

\`❯\` \`Ses\` & \`Mesaj\` Bilgileri İçin Butonları Kullanabilirsiniz.`)

let msg = await message.channel.send({ components: [row], embed: embed})
var filter = (buton) => buton.clicker.member.id === message.author.id;
let collector = await msg.createButtonCollector(filter, { time: 100000 })
collector.on("collect", async (buton) => {

if(buton.id === "ses") { 
await buton.reply.defer()
      
const ses = new Discord.MessageEmbed()
.setFooter("Châvo? ❤️ Phêdra")
.setColor("#ba7635")
.setTimestamp()
.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
.setAuthor(message.member.user.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`${message.author} (\`${message.author.id}\`) Adlı Üyenin Ses Bilgileri

\`❯\` Ses Bilgi (Toplam \`${voiceLength}\` Kanalda Bulunmuş)
${voiceTop}`)

.addFields(
{ name: "__**Toplam**__",  value: `\`\`\`fix
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`\`\``, inline: true },
{ name: "__**Public**__",  value: `\`\`\`fix
${await category(conf.publicParents)}\`\`\``, inline: true },
{ name: "__**Kayıt**__",  value: `\`\`\`fix
${await category(conf.registerParents)}\`\`\``, inline: true })
   
.addFields(
{ name: "__**Secret**__",  value: `\`\`\`fix
${await category(conf.privateParents)}\`\`\``, inline: true },
{ name: "__**Alone**__",  value: `\`\`\`fix
${await category(conf.aloneParents)}\`\`\``, inline: true },
{ name: "__**Diğer**__",  value: `\`\`\`fix
${await category(filteredParents.map(x => x.id))}\`\`\``, inline: true },)
msg.edit({ embed: ses, components: [row]}) }

if(buton.id === "mesaj") { 
await buton.reply.defer()

const erkekmesaj = new Discord.MessageEmbed()
.setFooter("Châvo? ❤️ Phêdra")
.setColor("#ba7635")
.setTimestamp()
.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
.setAuthor(message.member.user.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`${message.author} (\`${message.author.id}\`) Adlı Üyenin Mesaj Bilgileri

\`❯\` Mesaj Bilgi (Toplam \`${messageData ? messageData.topStat : 0}\` Adet Mesaj Yazmış)
${messageTop}`)

msg.edit({ embed: erkekmesaj, components: [row]}) }})}}
