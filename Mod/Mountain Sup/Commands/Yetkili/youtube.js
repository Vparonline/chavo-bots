const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch')

module.exports.run = async (client , message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.lineReply("Yeterli Yetkin Bulunmuyor",)

if(!message.member.voice.channel) return message.lineReply('Ses Kanalında Olman Lazım')

fetch(`https://discord.com/api/v8/channels/${message.member.voice.channel.id}/invites`, { method: "POST", body: JSON.stringify({ max_age: 86400, max_uses: 0, target_application_id: "880218394199220334", target_type: 2, temporary: false, validate: null }), headers: { "Authorization": `Bot ${client.token}`, "Content-Type": "application/json"}})
.then(res => res.json())
.then(invite => { 

const embed = new Discord.MessageEmbed()
.setDescription(`**[Youtube İzlemek İçin Tıkla](https://discord.gg/${invite.code})**`)
message.lineReply(embed)})

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["youtube"],
    permLevel: 0
};
exports.help = {
    name: "youtube",
    description: "",
    usage: ""
};