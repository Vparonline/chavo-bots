const { MessageEmbed, Permissions } = require('discord.js');
const Discord = require("discord.js");
const cfg = require("../configs/config.json");

module.exports = {
	conf: {
		aliases: ["dağıt","kdağıt"],
		name: "kdağıt",
		help: "kdağıt",
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
let elchavopyoçtur = new MessageEmbed()
if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
await message.channel.send({content: `${message.guild.members.cache.filter(küçükchavodaOÇ => küçükchavodaOÇ.roles.cache.size <= 1).size} Kişiye Kayıtsız Rolü Dağıttım.`});
message.guild.members.cache.filter(acarOÇTUR => acarOÇTUR.roles.cache.size <= 1).forEach(bendeOÇUM => bendeOÇUM.roles.add([cfg.Unregisteroles]))}}