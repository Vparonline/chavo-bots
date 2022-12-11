const Discord = require('discord.js')

module.exports = {
	conf: {
		aliases: ["ysay","ysay"],
		name: "",
		help: "",
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

        let sesteolmayan = message.guild.members.cache.filter(s => s.roles.cache.has("984183605465083984")).filter(s => !s.voice.channel).map(s => s).join('\n')

        message.channel.send({content: `\`\`\`yaml
        ♧ Phêdra Ses Aktifliğini Arttırmak İçin Müsaitseniz Ses Odalarına Değilseniz Alone Odalarına Geçebilirsiniz.\`\`\` ${sesteolmayan}`})
        

    
    
    }}