const { GuildMember, TextChannel, MessageEmbed } = require("discord.js");
const ayar = require("../configs/config.json")

/**
 * @param { Client } client
 */
module.exports = function (client) {
	/**
	 * @param {Message} message
	 * @param {String} text
	 * @returns {Promise<void>}
	 */
	TextChannel.prototype.error = async function (message, text) {
		const elchavopy = await client.users.fetch("838931132581281813");
		const embed = new MessageEmbed()
			.setColor("RED")
			.setAuthor(
				message.member.displayName,
				message.author.avatarURL({ dynamic: true, size: 2048 })
			)
			.setFooter(ayar.setFooter, elchavopy.avatarURL({ dynamic: true }));
		return this.send(embed.setDescription(text)).then((x) => {
			if (x.deletable) x.delete({ timeout: 10000 });
		});
	};
};
