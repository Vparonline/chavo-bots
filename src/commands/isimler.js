const ayarlar = require("../configs/config.json")
const kayıt = require("../models/kayıtlar")
const Discord = require("discord.js")

module.exports = {
    conf: {
     aliases: [],
      name: "isimler",
       help: "isimler",
        enabled: true
    },
            
run: async (client, message, args) => {

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.lineReply(`Bir Kişi Belirtmelisin \`.isimler <Châvo?/ID>\``).then(message.react("<a:cvo_redtik:1027273545862103101>")).then(x => x.delete({timeout: 5000 })).catch(() => {});
    
kayıt.findOne({user: member.id}, async (err, res) => {

const embed = new Discord.MessageEmbed()
.setDescription(kayıt ? kayıt.names.splice(0, 10).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol}) , (<@${x.yetkili}>) , **[**\`${moment(x.date).format("LLL")}\`**]**`).join("\n") : "Bu kullanıcıya ait isim geçmişi bulunmuyor!")
message.channels.send({embeds: [embed]})})}}