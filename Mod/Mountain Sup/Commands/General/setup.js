const { DiscordAPIError } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (client, message, args) => {

if(message.author.id !== "719596854379282563") return

if(args[0] === 'server' || args[0] === 'serverGuard') {
    const guild = db.fetch(`guildGuard.${message.guild.id}`)
    if (!guild) {
      db.set(`guildGuard.${message.guild.id}`, 'on')
      message.lineReply('Server Koruması Aktif Edildi!')

    } else if (guild) {
      db.delete(`guildGuard.${message.guild.id}`)
      message.lineReply('Server Koruması Devre Dışı Bırakıldı!')

    }
  } else if (args[0] === 'bot' || args[0] === 'botGuard') {
    const bot = db.fetch(`botGuard.${message.guild.id}`)
    if (!bot) {
      db.set(`botGuard.${message.guild.id}`, 'on')
      message.lineReply('Bot Koruması Aktif Edildi!')
    } else if (bot) {
      db.delete(`botGuard.${message.guild.id}`)
      message.lineReply('Bot Koruması Devre Dışı Bırakıldı!')
    }
  } else if (args[0] === 'chatGuard' || args[0] === 'chat') {
    const chat = db.fetch(`chatGuard`)
    if (!chat) {
      db.set(`chatGuard`, 'on')
      message.lineReply('Chat Koruması Aktif Edildi!')
    } else if (chat) {
      db.delete(`chatGuard`)
      message.lineReply('Chat Koruması Devre Dışı Bırakıldı!')
    }
  } else if (args[0] === 'nickGuard' || args[0] === 'nick') {
    const nick = db.fetch(`nickGuard.${message.guild.id}`)
    if (!nick) {
      db.set(`nickGuard.${message.guild.id}`, 'on')
      message.lineReply('Nick Koruması Aktif Edildi!')
    } else if (nick) {
      db.delete(`nickGuard.${message.guild.id}`)
      message.lineReply('Nick Koruması Devre Dışı Bırakıldı!')
    }
  } else if (args[0] === 'channel' || args[0] === 'kanal') {
    const channel = db.fetch(`channelGuard.${message.guild.id}`)
    if (!channel) {
      db.set(`channelGuard.${message.guild.id}`, 'on')
      message.lineReply('Kanal Koruması Aktif Edildi!')
    } else if (channel) {
      db.delete(`channelGuard.${message.guild.id}`)
      message.lineReply('Kanal Koruması Devre Dışı Bırakıldı!')
    }
  } else if (args[0] === 'member' || args[0] === 'üye') {
    const newMember = db.fetch(`newMemberGuard.${message.guild.id}`)
    if (!newMember) {
      db.set(`newMemberGuard.${message.guild.id}`, 'on')
      message.lineReply('Yeni Üye Koruması Aktif Edildi!')
    } else if (newMember) {
      db.delete(`newMemberGuard.${message.guild.id}`)
      message.lineReply('Yeni Üye Koruması Devre Dışı Bırakıldı!')
    }
  } else {
    var chat = db.fetch(`chatGuard`);
    var bot = db.fetch(`botGuard.${message.guild.id}`);
    var nick = db.fetch(`nickGuard.${message.guild.id}`);
    var guild = db.fetch(`guildGuard.${message.guild.id}`);
    var newMember = db.fetch(`newMemberGuard.${message.guild.id}`);
    var channel = db.fetch(`channelGuard.${message.guild.id}`)

    if (chat) chat = 'Aktif'
    if (!chat) chat = 'Devre Dışı'
    if (channel) channel = 'Aktif'
    if (!channel) channel = 'Devre Dışı'
    if (bot) bot = 'Aktif'
    if (!bot) bot = 'Devre Dışı'
    if (nick) nick = 'Aktif'
    if (!nick) nick = 'Devre Dışı'
    if (guild) guild = 'Aktif'
    if (!guild) guild = 'Devre Dışı'
    if (newMember) newMember = 'Aktif'
    if (!newMember) newMember = 'Devre Dışı'
    message.lineReply(new Discord.MessageEmbed().setColor('2F3136')
    .addField('Chat Koruması', chat, true).addField('Bot Koruması', bot, true).addField('Nick Koruması', nick, true).addField('Sunucu Kouruması', guild, true).addField(`Kanal Koruması (Beta)`, channel, true).addField('Yeniüye koruması', newMember, true)
    .setDescription('\`.setup <ayar>\` Komutları İle Kullanabilirsiniz'))
  }
}

exports.conf = {
  aliases: ["setup"],
  permLevel: 0
};

exports.help = {
  name: 'setup',
};