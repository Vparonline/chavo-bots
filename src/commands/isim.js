const ayarlar = require("../configs/config.json")
const Discord = require("discord.js")

module.exports = {
    conf: {
     aliases: [],
      name: "isim",
       help: "isim",
        enabled: true
    },
            
run: async (client, message, args) => {

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.channel.send({content: `Bir Kişi Belirtmelisin \`.isim <Châvo?/ID> <isim/yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000))
let isim = args[1]
if(!isim) return message.channel.send({content: `Bir İsim Belirtmelisin \`.isim <Châvo?/ID> <isim/yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000));
let yaş = args[2]
if(!yaş) return message.channel.send({content: `Bir Yaş Belirtmelisin \`.isim <Châvo?/ID> <isim/yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000))
if(member.user.id === message.author.id) return message.channel.send({content: `Kendi İsmini Değiştiremezsin`}).then((e) => setTimeout(() => { e.delete(); }, 5000))
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({content: `Belirttiğin Kişi Senle Aynı Veya Üstün`}).then((e) => setTimeout(() => { e.delete(); }, 5000))

await member.setNickname(`${isim} ${yaş}`)

const embed = new Discord.MessageEmbed()
.setDescription(`${member} Adlı Üyenin İsmi \`${isim} ${yaş}\` Olarak Değişti`)

message.channel.send({embeds: [embed]})

const log = new Discord.MessageEmbed()
.setDescription(`\`\`\`yaml
Üye: ${message.user} (${member.id}) 
Yetkili: ${message.author} (${message.author.id})
İsim: ${isim} ${yaş}`)

client.channels.cache.get(ayarlar.isimlog).send({embeds: [log]})}}