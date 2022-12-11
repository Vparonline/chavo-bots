const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js')
const moment = require("moment")
moment.locale("tr")

module.exports = {
conf: {
 aliases: [],
  name: "kayıtsız",
   help: "kyt",
    enabled: true
},
        
run: async (client, message, args) => {

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.channel.send({content: `Bir Kişi Belirtmelisin \`.kayıtsız <Châvo?/ID> <isim/yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
        
member.roles.set(["984183676898263150"])
member.roles.cache.has(ayarlar.booster) ? member.roles.set([ayarlar.booster, ayarlar.kayıtsız]) : member.roles.set([ayarlar.kayıtsız]);
member.setNickname(`İsim | Yaş`)

const embed = new MessageEmbed()
.setDescription(`${member} Üyesi ${message.author} Tarafından Kayıtsıza Atıldı`)

message.channel.send({embeds: [embed]})

const chavo = new MessageEmbed()
.setDescription(`\`\`\`fix
❯ Kullanıcı: ${member.user.tag} (${member.id}) \n❯ Yetkili: ${message.author.tag} (${message.author.id}) \n❯ Rol: \`\`\``)
client.channels.cache.get("984198426965213244").send({embeds: [chavo]})}}