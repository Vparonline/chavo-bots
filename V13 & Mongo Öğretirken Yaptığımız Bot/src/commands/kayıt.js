const { MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js')
const moment = require("moment")
moment.locale("tr")

module.exports = {
	conf: {
		aliases: ["kayıt"],
		name: "kayıt",
		help: "kayıt",
		enabled: true
	},

    
run: async (client, message, args) => {

const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.channel.send({content: `Bir Kişi Belirtmelisin \`.kayıt <Châvo?/ID> <isim/yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
let isim = args[1]
if(!isim) return message.channel.send({content: `Bir İsim Belirtmelisin \`.kayıt <Châvo?/ID> <isim/yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
let yaş = args[2]
if(!yaş) return message.channel.send({content: `Bir Yaş Belirtmelisin \`.kayıt <Châvo?/ID> <isim/yaş>\``}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send({content: `Belirttiğin Kişi Senle Aynı Veya Üstün`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 

await member.setNickname(`${isim} ${yaş}`)
if(!member.roles.cache.has("984183672225808454") && !member.roles.cache.has("984183670178988052")) {

const row = new MessageActionRow()
.addComponents(

new MessageButton()
.setStyle("DANGER")
.setLabel("Erkek")
.setCustomId("erkek"),

new MessageButton()
.setStyle("DANGER")
.setLabel("Kız")
.setCustomId("kız"),

new MessageButton()
.setStyle("DANGER")
.setLabel("İptal")
.setCustomId("iptal"))

const embed = new MessageEmbed()
.setDescription(`\`❯\` ${member} Adlı Üye \`${isim} ${yaş}\` Olarak Değişti.

\`❯\` Belirtilen Üyenin İşlemini Seçmeniz İçin 30 Saniyeniz Var.

\`\`\`yaml
Not: İsimlere Bakmak için .isimler <@Châvo?/ID>\`\`\``)

let msg = await message.channel.send({ embeds: [embed], components : [row] })
var filter = (buton) => buton.member.id === message.author.id;
let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

collector.on("collect", async (buton) => {

if(buton.customId  === "erkek") {
    
await member.roles.add("984183672225808454")
await member.roles.add("984183675505770496")
await member.roles.remove("984183670178988052")
await member.roles.remove("984183671147860059")
await member.roles.remove("984183676898263150")
const erkekmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üye Sunucumuza "Erkek" Olarak Kayıt Oldu`)
        
const erkeklog = new MessageEmbed()
.setDescription(`\`\`\`yaml
❯ Üye: ${member.user.tag} (${member.id}) \n❯ Yetkili: ${message.author.tag} (${message.author.id}) \n❯ İsim: (${isim}${yaş}) \n❯ Rol: ♂ Eron\`\`\``)

client.channels.cache.get("984198426965213244").send({embeds: [erkeklog]});
client.channels.cache.get("984198426965213244").send({content: `${member} Sunucumuza Hoşgeldin Yakışıklı  Tagımızı Alarak Destek Olabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 15000)); 
buton.reply({ embeds: [erkekmesaj], components: [], ephemeral: true})}

if(buton.customId  === "kız") {
        
await member.roles.add("984183670178988052")
await member.roles.add("984183671147860059")
await member.roles.remove("984183672225808454")
await member.roles.remove("984183675505770496")
await member.roles.remove("984183676898263150")
const kızmesaj = new MessageEmbed()
.setDescription(`${member} Adlı Üye Sunucumuza "Erkek" Olarak Kayıt Oldu`)
            
const kızlog = new MessageEmbed()
.setDescription(`\`\`\`yaml
❯ Üye: ${member.user.tag} (${member.id}) \n❯ Yetkili: ${message.author.tag} (${message.author.id}) \n❯ İsim: (${isim} ${yaş}) \n❯ Rol: ♂ Eron\`\`\``)
    
client.channels.cache.get(ayarlar.kızlog).send({embeds: [kızlog]});
client.channels.cache.get(ayarlar.sohbet).send({content: `${member} Sunucumuza Hoşgeldin Yakışıklı Tagımızı Alarak Destek Olabilirsin.`}).then((e) => setTimeout(() => { e.delete(); }, 15000)); 
buton.reply({ embeds: [kızmesaj], components: [], ephemeral: true})}

if(buton.customId  === "iptal") {
await buton.reply.defer()
await member.setNickname(`İsim | Yaş`)
await member.roles.cache.has(ayarlar.booster) ? member.roles.set([ayarlar.booster, ayarlar.kayıtsız]) : member.roles.set([ayarlar.kayıtsız]);
    
const kayıtiptal = new MessageEmbed()
.setDescription(`${member} Adlı Üyenin Kayıt İşlemi İptal Oldu`)
buton.reply({ embeds: [kayıtiptal], components: [], ephemeral: true})}})}}}