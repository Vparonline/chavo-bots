const { MessageEmbed } = require("discord.js");
const ayarlar = require("../../ayarlar.json")
const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db");
require('moment-duration-format');

module.exports.run = async (client, message, args, guild) => {

const embed = new MessageEmbed().setFooter(ayarlar.footer).setTimestamp()

let data = db.get(`snipe.${message.guild.id}`);
if(!data) return message.lineReply(embed.setFooter(ayarlar.footer).setTimestamp().setDescription(`Daha Önce Mesaj Silinmemiş`)).catch(e => { });

message.lineReply(embed.setDescription(`\`\`\`fix
Mesaj Sahibi\`\`\` \`•\` Üye: <@${data.mesajyazan}> \n\`\`\`fix
Mesaj İçeriği\`\`\` \`•\` Mesaj: ${data.mesaj}`)).then(x => x.delete({timeout: 10000 })).catch(() => {})
};
exports.conf = {
 aliases: ["snipe"],
 permLevel: 0,
}  
exports.help = {
 name: "snipe",
 enabled: true,
 guildOnly: true
};