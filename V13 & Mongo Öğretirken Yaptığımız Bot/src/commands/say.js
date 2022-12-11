const { MessageEmbed, Permissions } = require('discord.js');
const Discord = require("discord.js");
const cfg = require("../configs/config.json");

module.exports = {
	conf: {
		aliases: ["say"],
		name: "say",
		help: "say",
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
const ses = message.guild.channels.cache.filter(oç => oç.type === "voice");
let count = 0
let babasızengin = cfg.booster;
let gay = cfg.erkek;
let lez = cfg.kadın;
let dominictoretto = cfg.familyroles
for (const [id, sess] of ses)
        count += sess.members.size;
let boost = message.guild.members.cache.filter(boostluoç => boostluoç.roles.cache.has(babasızengin)).size;
let erkekcik = message.guild.members.cache.filter(adam => adam.roles.cache.has(gay)).size;
let kadıncik = message.guild.members.cache.filter(karı => karı.roles.cache.has(lez)).size;
let aile = message.guild.members.cache.filter(ailem => ailem.roles.cache.has(dominictoretto)).size;

let tag = message.guild.members.cache.filter(member => member.user.username.includes(cfg.isimbaşıtag)).size;
let toplamdominictoretto = tag;

const dominictorettoailesinibüyütüyor = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`
\`•\` Sunucumuzda toplam \`${message.guild.memberCount}\` Üye var
\`•\` Seste \`${message.guild.channels.cache.filter(channel => channel.type == "GUILD_VOICE").map(channel => channel.members.size).reduce((oç, oçç) => oç + oçç)}\` Kullanıcı Var
\`•\` Toplam \`${aile}\` Kişi Tagımızda Bulunyor.
\`•\` Toplam \`${message.guild.premiumSubscriptionCount}\` Adet Boost Basılmış
`)
message.channel.send({ embeds: [dominictorettoailesinibüyütüyor]})
message.react(cfg.yeşiltik)
}
}