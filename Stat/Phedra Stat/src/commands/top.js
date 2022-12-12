const { MessageButton, MessageActionRow } = require("discord-buttons");
const messageGuildChannel = require("../schemas/messageGuildChannel");
const voiceGuildChannel = require("../schemas/voiceGuildChannel");
const messageGuild = require("../schemas/messageGuild");
const messageUser = require("../schemas/messageUser");
const voiceGuild = require("../schemas/voiceGuild");
const voiceUser = require("../schemas/voiceUser");
const Discord = require("discord.js")
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  conf: {
    aliases: [],
    name: "top",
    help: "top"
  },
  
  run: async (client, message, args, embed) => {
    const messageChannelData = await messageGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const voiceChannelData = await voiceGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
    const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });

    const messageChannels = messageChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join(`\n`);
    const voiceChannels = voiceChannelData.splice(0, 5).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join(`\n`);
    const messageUsers = messageUsersData.splice(0, 5).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join(`\n`);
    const voiceUsers = voiceUsersData.splice(0, 5).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``).join(`\n`);

let button1 = new MessageButton()
.setStyle('grey')
.setLabel('Top Ses')
.setID('ses')
.setEmoji('1026582691371548732')

let button2 = new MessageButton()
.setStyle('grey')
.setLabel('Top Mesaj')
.setID('mesaj')
.setEmoji('1026582731385217084')

let row = new MessageActionRow()
.addComponents(button1, button2,)

embed.setFooter("Châvo? ❤️ Phêdra")
embed.setColor("#ba7635")
embed.setTimestamp()
embed.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
embed.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
embed.setDescription(`\`${message.guild.name}\` Toplam İstatistik Bilgileri

\`❯\` \`Top Ses\` & \`Top Mesaj\` Bilgileri İçin Butonları Kullanabilirsiniz.`)

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
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`\`${message.guild.name}\` Toplam Ses İstatistikleri

\`❯\` **Ses Bilgileri:** (\`Toplam ${moment.duration(voiceGuildData ? voiceGuildData.topStat : 0).format("H [saat], m [dakika]")}\`)
${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}

\`❯\` **Ses Kanal Bilgi:**
${voiceChannels.length > 0 ? voiceChannels : "Veri Bulunmuyor."}`)

msg.edit({ embed: ses, components: [row]}) }

if(buton.id === "mesaj") { 
await buton.reply.defer()

const erkekmesaj = new Discord.MessageEmbed()
.setFooter("Châvo? ❤️ Phêdra")
.setColor("#ba7635")
.setTimestamp()
.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, size: 2048 }))
.setDescription(`\`${message.guild.name}\` Toplam Mesaj İstatistikleri

\`❯\` **Mesaj Bilgileri:** (\`Toplam ${Number(messageGuildData ? messageGuildData.topStat : 0).toLocaleString()} mesaj\`)
${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}

\`❯\` **Mesaj Kanal Bilgi:**
${messageChannels.length > 0 ? messageChannels : "Veri Bulunmuyor."}
`)

msg.edit({ embed: erkekmesaj, components: [row]}) }})}}