const settings = require("../configs/config.json");
const { MessageEmbed, Permissions} = require("discord.js");
const Discord = require("discord.js");
const client = global.client;
let sent = false;



/**
 * @param {Message} message
 * @returns {Promise<void>}
 */
module.exports = async (message) => {
  let chavoembed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(settings.setFooter).setColor("RANDOM").setTimestamp();
	let prefix = settings.prefix
	if (message.author.bot || !message.guild || !prefix) return;
	let args = message.content.substring(prefix.length).trim().split(" ");
	const commandName = args[0].toLowerCase();

	const elchavo = await client.users.fetch("838931132581281813");
	const embed = new MessageEmbed()
		.setColor(message.member.displayHexColor)

	args = args.splice(1);

	const cmd = client.commands.get(commandName) || client.commands.find((x) => x.conf.aliases && x.conf.aliases.includes(commandName));

if(cmd) {
  if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
	let now = Date.now()
	let süre = now + 5000
	if(client.cooldowns.has(message.author.id)) {
		let kalansüre = client.cooldowns.get(message.author.id)
		if (kalansüre > now){
		let komuta_kalan_süre = (kalansüre - now) / 1000
		return message.channel.send({ embeds: [chavoembed.setDescription("Bu komutu kullanabilmek için **" + komuta_kalan_süre.toFixed(1) + "** saniye beklemelisin!")]}).then(x => x.delete({timeout:5000}));
		}
	}
	client.cooldowns.set(message.author.id, süre)
	setTimeout(() => {
		client.cooldowns.delete(message.author.id)
	}, 5000)
}
} 
try {
  cmd.run(client, message, args); 
}catch{}
}
module.exports.conf = {
	name: "message"
};