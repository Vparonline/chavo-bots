const { MessageEmbed, Permissions } = require('discord.js');
const Discord = require("discord.js");
const cfg = require("../configs/config.json");

module.exports = {
	conf: {
		aliases: ["n","nerede"],
		name: "nerede",
		help: "nerede",
		enabled: true
	},

	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {Array<string>} args
	 * @param {MessageEmbed} embed
	 * @returns {Promise<void>}
	 */
	run: async (client, message, args) => {
if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
let kontrol = new MessageEmbed().setColor("RANDOM");
let kontroledilecek = message.mentions.members.first || message.guild.members.cache.get(args[0]);
if(!kontroledilecek) return;
if(!kontroledilecek.voice.channel) return message.channel.send({embeds: [kontrol.setDescription(`${kontroledilecek} - \`${kontroledilecek.id}\` Ses kanalına bağlı değil!`)]})
let mute = kontroledilecek.voice.selfMute ? "Mikrofonu Kapalı" : "Mikrofonu Açık";
let unmuted = kontroledilecek.voice.selfDeaf ? "Kulaklık Kapalı": "Kulaklık Açık";
let zaman = client.channelTime.get(kontroledilecek.id)

let embedullah = kontrol.setDescription(`
${kontroledilecek} <#` + kontroledilecek.voice.channel + `> : ${mute} ${unmuted}
Mevcut Süre: ${zaman ? `\`\`\ Aktif Süre: \`\`\`
<#${kontroledilecek.voice.channel.id}> Kanalında \`${await Date.now() - zaman.time}\` Öncesi Giriş Yapmış.` : ""
}) 

`)
message.channel.send({ embeds: [embedullah]});
    }
}