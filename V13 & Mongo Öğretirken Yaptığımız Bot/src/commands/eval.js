const { Client, Message, MessageEmbed, Guild } = require("discord.js");

module.exports = {
	conf: {
		aliases: ["modeval"],
		name: "modeval",
		help: "modeval",
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
		
      if(message.author.id !== "838931132581281813") return  message.channel.send("yarramı yersin ezik orospu evladı").then(x => x.delete({timeout:5000}));
    if (args.join(" ").toLowerCase().includes('token')) return message.channel.send("yarramı yersin ezik orospu evladı")
    const clean = text => {
      if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
    try {
      const code = args.join(" ");
      let evaled = await eval(code);
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      await message.channel.send(clean(evaled), {
        code: "xl"
      });
    } catch (err) {
      await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
	}
};