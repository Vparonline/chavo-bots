const { Client, Message,} = require("discord.js");

module.exports = {
	conf: {
		aliases: ["deneme"],
		name: "deneme",
		help: "deneme",
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

message.channel.send({ content: "oç musun çalışıo işte"})

    }
}