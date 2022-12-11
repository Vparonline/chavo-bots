const { MessageEmbed, Permissions, MessageButton } = require('discord.js');
const Discord = require("discord.js");
const cfg = require("../configs/config.json");

module.exports = {
conf: {
 aliases: ["tagtara"],
  name: "tagtara",
   help: "tagtara",
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

	


}}