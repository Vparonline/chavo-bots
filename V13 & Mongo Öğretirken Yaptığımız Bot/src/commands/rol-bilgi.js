const Discord = require("discord.js")

module.exports = {
conf: {
 aliases: [],
  name: "rolbilgi",
   help: "kyt",
    enabled: true
},
run: async (client, message, args) => {

let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
if(!args[0]) return message.channel.send({content: `Bir Rol Belirtmelisin`})
if(!role) return message.channel.send({content: `Belirtmiş Olduğun Rol Geçersiz`})

let msayı = role.members.size
if(msayı > 200) return message.channel.send({content: `${role} Adlı Rolde ${msayı} Kişi Olduğu İçin Bilgi Yollayamıyorum`})
let üyeler = role.members.map(x => `<@${x.id}> (\`${x.id}\`)`)

message.channel.send({content: `
- ${role} Adlı Rol Bilgileri
- Rol: ${role}
- Rol ID: (\`${role.id}\`)
- Rol Rengi: ${role.hexColor}
- Rol Kişi Sayı: \`${msayı}\`

- Rolde Bulunanlar
${üyeler.join("\n")}`})}}