const Discord = require("discord.js")

module.exports.run = async (client, message, args,) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Yeterli Yetkin Bulunmuyor",)

let abc = args.slice(0).join(' ');
let argskanal = message.guild.channels.cache.get(abc) || message.guild.channels.cache.find(a => a.name === abc);
let kanallar = message.guild.channels.cache.filter(a => a.type === "voice" && a.permissionsFor(message.author).has('CONNECT'));
let kanalsıra = kanallar.sort((x, y) => x.position-y.position).array();
if(!message.member.voice.channel) return message.channel.send('Ses Kanalında Olman Lazım')

if(args[0] === "tüm") {
try {
  message.guild.members.cache.filter(a => a.voice.channel && !a.user.bot && a.voice.channelID !== message.member.voice.channelID).array().forEach((x, index) => setTimeout(() => { x.voice.setChannel(message.member.voice.channelID ) }, index*1000));
  message.channel.send(`Ses Kanalında Bulunan Herkesi \`${message.member.voice.channel.name}\` Adlı Kanala Taşıyorum`);
} catch (err) {
return message.channel.send('Sorun Oluştu.').then(x => x.delete(5000))}
    
} else if(abc) {
if(argskanal.type !== "voice" || !argskanal.permissionsFor(message.author).has('CONNECT')) return message.channel.send(`Belirtilen Kanala Giriş İznin Yok`).then(x => x.delete({timeout: 5000}));    message.member.voice.channel.members.array().forEach((x, index) => setTimeout(() => { x.voice.setChannel(argskanal.id) }, index*1000))
  message.channel.send(`Belirttiğin Kanaldaki Herkesi \`${argskanal.name}\` Adlı Kanala Taşıyorum`);
} else {
if(!message.member.voice) return message.channel.send('Komutu Kullanmak İçin Seste Olmalısın').then(x => x.delete({timeout: 5000}))
  message.channel.send(kanalsıra.map((x, index) => `${index+1}-) ${x.name}`).join('\n') + '\n\n30 Saniye İçinde Bir Kanal Numarası Belirtmelisin.', {code: "css", split: true})//.then(x => x.delete({timeout: 30000}));
try { let filter = m => m.author.id === message.author.id && Number(m.content) < kanallar.size
  message.channel.awaitMessages(filter, {max: 1, time: 30000, errors: ['time']}).then((collected) => {
if(isNaN(collected.first().content)) return message.channel.send(`Geçerli Bir Ses Kanalı Numarası Belirtmelisin.`).then(x => x.delete({timeout: 5000}));
  message.member.voice.channel.members.array().forEach((x, index) => setTimeout(() => { x.voice.setChannel(kanalsıra[Number(collected.first().content)-1].id) }, index*1000));
  message.channel.send(`Bulunduğun Kanaldaki Herkesi \`${kanalsıra[Number(collected.first().content)-1].name}\` Adlı Kanala Taşıyorum`)});
} catch (err) {
return message.channel.send('30 Saniye Boyunca Bir Numara Belirtmediğiniz İçin İşlem İptal Edilmiştir.')}};

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["toplutaşı"],
    permLevel: 0
};
exports.help = {
    name: "toplutaşı",
    description: ".e [ isim yaş ]",
    usage: "erkek"
}