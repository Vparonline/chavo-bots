const Discord = require("discord.js")

module.exports.run = async (client , message, args) => {

let embed = new Discord.MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.lineReply((`Bir Kişi Belirtmelisin`)).then(x => x.delete({timeout: 5000 })).catch(() => {});

let kanal = member.voice.channel
if(!kanal) return message.lineReply((`Belirttiğin Kişi Seste Değil`)).then(x => x.delete({timeout: 5000 })).catch(() => {});
   
let microphone = member.voice.selfMute ? "<a:cvo_redtik:1031169744008659014> Kapalı" : "<a:cvo_greentik:1027273540040392745> Açık";
let headphones = member.voice.selfDeaf ? "<a:cvo_redtik:1031169744008659014> Kapalı" : "<a:cvo_greentik:1027273540040392745> Açık";
let screen = member.voice.streaming ? "<a:cvo_greentik:1027273540040392745> Açık" : "<a:cvo_redtik:1031169744008659014> Kapalı";
let sestekiler = message.guild.channels.cache.get(kanal.id).members.map(x => x.user).join("|")

kanal.createInvite().then(invite =>
message.lineReply(embed.setDescription(`${member} Üyesi \`${kanal.name}\` Kanalında Seste Bulunmakta

\`Kulaklık:\` ${headphones}
\`Mikrofon:\` ${microphone}
\`Yayın:\` ${screen}

\`Odadakiler:\` ${sestekiler}

\`Kanal Link:\` https://discord.gg/${invite.code}`, ))).then(x => x.delete({timeout: 15000 })).catch(() => {})

}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["nerede"],
 permLevel: 0
};
exports.help = {
 name: "nerede",
 description: ".e [ isim yaş ]",
 usage: "erkek"
}