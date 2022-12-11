const { MessageEmbed, Permissions } = require('discord.js');
const Discord = require("discord.js");
const cfg = require("../configs/config.json");

module.exports = {
	conf: {
		aliases: ["sil","delete"],
		name: "sil",
		help: "sil",
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
let sayımsı = args[0];
let elchavoaşk = new MessageEmbed().setColor("RANDOM");
if(!sayımsı || isNaN(sayımsı) || parseInt(sayımsı) < 1 ) return message.channel.send({ embeds: [elchavoaşk.setDescription("Lütfen BirSayı belirt!")]})
await message.delete().catch();
const elchavopy = message.mentions.users.first();
let messages = await message.channel.messages.fetch({ limit: 100});
messages = messages
if (elchavopy) {
messages = messages.filter((aptalbotcu) => aptalbotcu.author.id === user.id);
}
if (messages.length > sayımsı) {
    messages.length = parseInt(sayımsı, 10);
}
messages = messages.filter((oçelchavopy) => !oçelchavopy.pinned);
sayımsı++;
message.channel.bulkDelete(messages, true);
if (elchavopy) {
    message.channel.send({ embeds: [elchavoaşk.setDescription(`${elchavopy} kişisinin **${messages.length}** mesajı sildi.`)]})
    } else {
        message.channel.send({ embeds: [elchavoaşk.setDescription(`**${messages.length}** mesaj silindi.`)]})
}

    }
}