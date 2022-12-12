const Discord = require('discord.js');
const client = global.client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chavo = require('discord-buttons')
const snekfetch = require('snekfetch');
const mongoose = require("mongoose")
const express = require('express');
const db = require('quick.db')
const path = require('path');
const http = require('http');
const Jimp = require('jimp');
const fs = require('fs');
const ms = require('ms');
const moment = require("moment");
moment.locale("tr")
const AsciiTable = require('ascii-table');
require('./eventHandler.js')(client);
var table = new AsciiTable('Aello Command Table');
chavo(client)
require('discord-reply');

mongoose.connect(ayarlar.mongo, { useNewUrlParser: true, useUnifiedTopology: true });

client.on('message', async (message) => { if(message.content === '.tag') { message.lineReply(`➹`)}})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdirSync('./Commands').forEach(dir => {
const commandFiles = fs.readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith('.js'));
 for( const file of commandFiles) { 
const komutcuklar = require(`./Commands/${dir}/${file}`);
 table.setHeading("Command", 'Status', "Aliases")
if(komutcuklar.help.name) { client.commands.set(komutcuklar.help.name, komutcuklar);
 table.addRow(komutcuklar.help.name, "Başarılı!", komutcuklar.conf.aliases)
} else {
 table.addRow(komutcuklar.help.name, "Başarısız!")
continue;}
 komutcuklar.conf.aliases.forEach(alias => {
 client.aliases.set(alias, komutcuklar.help.name)});
console.log(table.toString())}})

let prefix = ayarlar.prefix;

client.login(ayarlar.token);

Date.prototype.toTurkishFormatDate = function (format) { let date = this,
  day = date.getDate(),
  weekDay = date.getDay(),
  month = date.getMonth(),
  year = date.getFullYear(),
  hours = date.getHours(),
  minutes = date.getMinutes(),
  seconds = date.getSeconds();

let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

if(!format) { format = "dd MM yyyy | hh:ii:ss";};
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
if(format.indexOf("yyyy") > -1) {
  format = format.replace("yyyy", year.toString());
} else if (format.indexOf("yy") > -1) {
  format = format.replace("yy", year.toString().substr(2, 2))};
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

if(format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
if(format.indexOf("hh") > -1) {
if(hours > 24) hours -= 24;
if(hours === 0) hours = 24;
  format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'))};

if(format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
if(format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;};

const invites = {};
const wait = require("util").promisify(setTimeout);
client.on('ready', () => { wait(1000);
client.guilds.cache.forEach(g => { g.fetchInvites().then(guildInvites => { invites[g.id] = guildInvites;})})})

client.on('voiceStateUpdate', async (___, newState) => {
if(newState.member.user.bot && newState.channelID && newState.member.user.id == client.user.id && !newState.selfDeaf ) { newState.setSelfDeaf(true);}});
  
//---------------------------------------- EMOJİ ----------------------------------------\\

const numbers = {
  '0': `<a:0_:1027276671453253734>`,
  '1': `<a:1_:1027276683100815451>`,
  '2': `<a:2_:1027276692223438858>`,
  '3': `<a:3_:1027276700918239242>`,
  '4': `<a:4_:1027276709193584761>`,
  '5': `<a:5_:1027276717401854003>`,
  '6': `<a:6_:1027276725480067102>`,
  '7': `<a:7_:1027276733835128963>`,
  '8': `<a:8_:1027276741888200786>`,
  '9': `<a:9_:1027276749836398682>`}
        
client.emojili = function(sayi) {
var qwe = "";
var arr = Array.from(sayi);
for (var x = 0; x < arr.length; x++) { qwe += (numbers[arr[x]] === "" ? arr[x] : numbers[arr[x]])}
return qwe;};
        
client.on('ready', () => { 
client.user.setPresence({ activity: { name: ayarlar.bdurum }, status: "dnd" }) 
client.channels.cache.get(ayarlar.ses).join();  
console.log(`Discord Botu ${client.user.tag} Adı İle Giriş Yaptı`)});

process.on('uncaughtException', function(err) { console.log(err)});

//---------------------------------------- TAG-GİRİŞ-LOG ----------------------------------------\\

client.on("guildMemberAdd", member => {

let tag = (ayarlar.tag);
let rol = (ayarlar.family); 
  
if(member.user.username.includes(tag)) { 

member.roles.add(rol)
  
const tagl = new Discord.MessageEmbed()
.setAuthor(member.displayName, member.user.avatarURL({ dynamic: true }))
.setFooter("Châvo? ❤️ Mountain")
.setColor("AQUA")
.setTimestamp()
.setDescription(`${member} (\`${member.id}\`) Adlı Üye \`♧\` Tagıyla Aramıza Katıldı.`)
  
client.channels.cache.get("1031163699630706750").send(tagl)}})

//---------------------------------------- TAG-GİRİŞ-LOG ----------------------------------------\\

client.on("guildMemberAdd", async member => {
      
let memberGün = moment(member.user.createdAt).format("DD");
let memberTarih = moment(member.user.createdAt).format("YYYY | HH:mm:ss");
let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık"); 
let user = client.users.cache.get(member.id);
let zaman = (Date.now() - member.user.createdTimestamp);

const kurulus = new Date().getTime() - user.createdAt.getTime();
require("moment-duration-format")
moment.locale("tr");
var üyesayısı = member.guild.memberCount.toString().replace(/ /g, "    ")
var üs = üyesayısı.match(/([0-9])/g)
üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs) { üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
return {
  '0': `<a:0_:1029708724593508362>`,
  '1': `<a:1_:1029708732831125534>`,
  '2': `<a:2_:1029708741077123112>`,
  '3': `<a:3_:1029708749725773854>`,
  '4': `<a:4_:1029708757950791700>`,
  '5': `<a:5_:1029708765924175903>`,
  '6': `<a:6_:1029708774220501072>`,
  '7': `<a:7_:1029708782655258636>`,
  '8': `<a:8_:1029708790695743560>`,
  '9': `<a:9_:1029708799784779886>`}[d]})}

var kontrol;
if(kurulus < 1296000000) kontrol = '[Şüpheli <a:cvo_redtik:1031169744008659014>]'
if(kurulus > 1296000000) kontrol = '[Güvenli <a:cvo_greentik:1031169738430234716>]'      
if(member.user.bot) { member.roles.set([ayarlar.botrol]);

} else {

let durum = Date.now()-member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 14
client.channels.cache.get("1030944085663563865").send(`Sunucumuza Hoşgeldin. ${member} Seninle Birlikte ${üyesayısı} Kişiye Ulaştık

\`❯\` Hesabın (<t:${Math.floor(member.user.createdTimestamp / 1000)}>) Tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) Oluşturulmuş. ${kontrol} 

\`❯\` Sunucuya Erişebilmek İçin Teyit Kanallarında Teyit Vermen Gerekiyor Yetkililerimiz Seninle İlgilenecektir. <@&${ayarlar.sword}>

\`\`\`yaml
Kayıt İşleminiz Bittikten Sonra Kuralları Okuduğunuz Kabul Edilecek Ve İçeride Yapılacak Olan Ceza-i İşlemler Kurallar Baz Alınarak Yapılacaktır.\`\`\``);

if(durum) {

const steyit = new Discord.MessageEmbed()
.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true, size: 512 }))
.setDescription(`${member} Adlı Üye Sunucuya \`"Şüpheli"\` Olarak Girdi

**Hesap Bilgileri**
\`❯\` Üye: ${member} (\`${member.user.tag}, ${member.id}\`)
\`❯\` Kuruluş Tarihi: (<t:${Math.floor(member.user.createdTimestamp / 1000)}>) Tarihinde (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`)
.setFooter(ayarlar.footer)
.setColor(ayarlar.renk)
.setTimestamp()
client.channels.cache.get("1031164069782233188").send(steyit);
client.channels.cache.get("1031287600675291188").send(`<a:cvo_redtik:1027273545862103101> ${member} Adlı Üye Hesabın \`14 Gün Ve Öncesinde\` Oluşturulduğu İçin. \`"Şüpheli"\` Olarak İşaretlendin.`)      
member.roles.set([ayarlar.süpheli])
member.setNickname("• Şüpheli Hesap")

}else{ 
            
member.setNickname("• İsim | Yaş")}}})

//---------------------------------------- HOŞGELDİN-MESAJ ----------------------------------------\\

client.on("message", async (msg) => { if (msg.author.bot == true) return;
if(msg.content.toLowerCase() === "sa") { msg.lineReply("Aleyküm Selam Hoş Geldin Dostum"); }
if(msg.content.toLowerCase() === "slm") { msg.lineReply("Aleyküm Selam Hoş Geldin Dostum"); } 
if(msg.content.toLowerCase() === "sea") { msg.lineReply("Aleyküm Selam Hoş Geldin Dostum"); }
if(msg.content.toLowerCase() === "selam") { msg.lineReply("Aleyküm Selam Hoş Geldin Dostum"); } 
if(msg.content.toLowerCase() === "selamun aleyküm") { msg.lineReply("Aleyküm Selam Hoş Geldin Dostum")}})

//---------------------------------------- SA-AS ----------------------------------------\\

client.on("messageDelete", async(message) => { if(message.channel.type === "dm" || !message.guild || message.author.bot) return; 
let snipe = { mesaj: message.content, mesajyazan: message.author.id, ytarihi: message.createdTimestamp, starihi: Date.now(), kanal: message.channel.id }
await db.set(`snipe.${message.guild.id}`, snipe)}); 

//---------------------------------------- SNİPE-KOMUT ----------------------------------------\\

client.on("message", async (message) => {
if(message.author.id === "719596854379282563") return;
if(message.author.id === "173303630433091584") return;
if(message.author.id === "716322273904164924") return;
if(message.author.id === "962440145221599282") return;

const reklam = ["discord.app", "discord.gg", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
  
if(reklam.some(word => message.content.includes(word))) {
if(message.deletable) message.delete({timeout: 0030 }).catch(console.error); return message.reply(':link: Sunucuda Reklam Yasak').then(a => a.delete({timeout: 4000 }))}})
  
client.on("messageUpdate", async(oldMessage, newMessage) => { if(newMessage.author.bot || !newMessage.guild) return;
  if(oldMessage.author.id === "719596854379282563") return;
  if(oldMessage.author.id === "173303630433091584") return;
  if(oldMessage.author.id === "716322273904164924") return;
  if(oldMessage.author.id === "962440145221599282") return;


const reklam = ["discord.app", "discord.gg", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
      
if(reklam.some(word => newMessage.content.includes(word))) {
if(newMessage.deletable) newMessage.delete({timeout: 0030 }).catch(console.error); return newMessage.reply(':link: Sunucuda Reklam Yasak').then(a => a.delete({timeout: 4000 }))}})

//---------------------------------------- SNİPE-KOMUT ----------------------------------------\\

const usersMap = new Map();
const LIMIT = 5;
const TIME = 10000;
const DIFF = 2000;
  
client.on("message", async (message) => {

if(message.author.bot) return;
if(message.member.hasPermission("ADMINISTRATOR")) return;
if(message.member.roles.cache.get(ayarlar.mute)) return;
if(usersMap.has(message.author.id)) {
  
const userData = usersMap.get(message.author.id);
const { lastMessage, timer } = userData;
const difference = message.createdTimestamp - lastMessage.createdTimestamp;
let msgCount = userData.msgCount;
  
if(difference > DIFF) { clearTimeout(timer); userData.msgCount = 1; userData.lastMessage = message; userData.timer = setTimeout(() => { usersMap.delete(message.author.id); }, TIME); usersMap.set(message.author.id, userData)}
else { msgCount++;
if (parseInt(msgCount) === LIMIT) {
  
const mute = message.guild.roles.cache.get(ayarlar.mute)
message.member.roles.add(mute);
message.reply(`Spam Yaptığın İçin 15 Dakika Susturuldun`).then(chavo => chavo.delete({ timeout: 5000 }))
setTimeout(() => {
  
if(!message.member.roles.cache.get(ayarlar.mute)) return;
message.member.roles.remove(mute);
message.reply(`Muten Açıldı Tekrar Spam Yapma`).then(chavo => chavo.delete({ timeout: 5000 }))}, 900000)
} else { userData.msgCount = msgCount; usersMap.set(message.author.id, userData)}} 
} else {
let fn = setTimeout(() => { usersMap.delete(message.author.id)}, TIME); usersMap.set(message.author.id, { msgCount: 1, lastMessage: message, timer: fn })}})

//---------------------------------------- SNİPE-KOMUT ----------------------------------------\\

client.on("message", message => {
let sunucu = "1026942698181103751"
if(!db.has(`kufurcum_${sunucu}`)) return;

const undefined = ["aw", "sg", "skm","aq","orospu","amık","Oç","0ç","yavşak","y3a3rram","a.m.k","A.M.K","or1spu","anan1 s1k1m","orospu evladı","ananı sikim","anneni sikim","anneni sikeyim","ananı sikeyim","ağzına sıçim","ağzına sıçayım","ağzına s","ambiti","amını","amını s","amcık","amcik","amcığını","amciğini","amcığını","amcığını s","amck","amckskm","amcuk","amına","amına k","amınakoyim","amına s","amunu","amını","amın oğlu","amın o","amınoğlu","amnskm","anaskm","ananskm","amkafa","amk çocuğu","amk oç","piç","amk ç","amcıklar","amq","amındaki","amnskm","ananı","ananın am","ananızın","aneni","aneni s","annen","anen","ananın dölü","sperm","döl","anasının am","anası orospu","orospu","orosp,","kahpe","kahbe","kahße","ayklarmalrmsikerim","ananı avradını","avrat","avradını","avradını s","babanı","babanı s","babanın amk","annenin amk","ananın amk","bacını s","babası pezevenk","pezevenk","pezeveng","kaşar","bitch","yarrak","cibiliyetini","bokbok","bombok","dallama","götünü s","ebenin","ebeni","ecdadını","gavat","gavad","ebeni","fahişe","sürtük","fuck","gotten","götten","göt","gtveren","gttn","gtnde","gtn","hassiktir","hasiktir","hsktr","haysiyetsiz","ibne","ibine","ipne","kaltık","kancık","kevaşe","kevase","kodumun","orosbu","fucker","penis","porno","sikiş","s1kerim","puşt","sakso","skcm","siktir","sktr","skecem","skeym","slaleni","sokam","sokuş","sokarım","sokarm","sokaym","şerefsiz","şrfsz","sürtük","taşak","taşşak","tasak","tipini s", "yarak", "yarrak","yarram","yararmorospunun","yarramın başı","yarramınbaşı","yarraminbasi","yrrk","zikeyim","zikik","zkym","amk","mk","oç"];
         
if(undefined.some(kelimeğ => message.content.toLowerCase().includes(kelimeğ))) { try {
      
if(!message.member.hasPermission("ADMINISTRATOR")) { message.delete();
  
message.reply(`Sunucuda Küfür Etmek Yasak.`).then(x => x.delete({ timeout: 5000 }))}} catch (err) { console.log(err)}}});

//---------------------------------------- SNİPE-KOMUT ----------------------------------------\\

client.on("messageUpdate", async(oldMessage, newMessage, message) => {
if(newMessage.author.bot || !newMessage.guild) return;

if(oldMessage.author.id === "719596854379282563") return;
if(oldMessage.author.id === "173303630433091584") return;
if(oldMessage.author.id === "716322273904164924") return;
if(oldMessage.author.id === "962440145221599282") return;
    
const reklam = ["aw", "sg", "skm","aq","orospu","amık","Oç","0ç","yavşak","y3a3rram","a.m.k","A.M.K","or1spu","anan1 s1k1m","orospu evladı","ananı sikim","anneni sikim","anneni sikeyim","ananı sikeyim","ağzına sıçim","ağzına sıçayım","ağzına s","ambiti","amını","amını s","amcık","amcik","amcığını","amciğini","amcığını","amcığını s","amck","amckskm","amcuk","amına","amına k","amınakoyim","amına s","amunu","amını","amın oğlu","amın o","amınoğlu","amnskm","anaskm","ananskm","amkafa","amk çocuğu","amk oç","piç","amk ç","amcıklar","amq","amındaki","amnskm","ananı","ananın am","ananızın","aneni","aneni s","annen","anen","ananın dölü","sperm","döl","anasının am","anası orospu","orospu","orosp,","kahpe","kahbe","kahße","ayklarmalrmsikerim","ananı avradını","avrat","avradını","avradını s","babanı","babanı s","babanın amk","annenin amk","ananın amk","bacını s","babası pezevenk","pezevenk","pezeveng","kaşar","bitch","yarrak","cibiliyetini","bokbok","bombok","dallama","götünü s","ebenin","ebeni","ecdadını","gavat","gavad","ebeni","fahişe","sürtük","fuck","gotten","götten","göt","gtveren","gttn","gtnde","gtn","hassiktir","hasiktir","hsktr","haysiyetsiz","ibne","ibine","ipne","kaltık","kancık","kevaşe","kevase","kodumun","orosbu","fucker","penis","porno","sikiş","s1kerim","puşt","sakso","skcm","siktir","sktr","skecem","skeym","slaleni","sokam","sokuş","sokarım","sokarm","sokaym","şerefsiz","şrfsz","sürtük","taşak","taşşak","tasak","tipini s", "yarak", "yarrak","yarram","yararmorospunun","yarramın başı","yarramınbaşı","yarraminbasi","yrrk","zikeyim","zikik","zkym","amk","mk","oç"];
  
if(reklam.some(word => newMessage.content.includes(word))) {
if(newMessage.deletable) newMessage.delete({timeout: 0030 }).catch(console.error); return newMessage.reply('Sunucuda Küfür Etmek Yasak.').then(a => a.delete({timeout: 4000 }))}})
  
//---------------------------------------- SNİPE-KOMUT ----------------------------------------\\

client.on('message', async message => {

let sunucu = "1030944081901273139"
let prefix = await db.fetch(`prefix_${sunucu}`) || ayarlar.prefix
let kullanıcı = message.mentions.users.first() || message.author
let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`)
let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`)
let sebep = afkkullanıcı
  
const embed = new Discord.MessageEmbed()
  
if(message.author.bot) return;
if(message.content.includes(`${prefix}afk`)) return;
if(message.member.displayName.includes("[AFK]") && message.member.manageable) await message.member.setNickname(message.member.displayName.replace("[AFK]", ""));
if(message.content.includes(`<@${kullanıcı.id}>`)) {
  
if(afkkullanıcı) return message.lineReply(embed.setDescription(`${kullanıcı} Adlı Üye  \`${sebep}\` Sebebiyle AFK`)).then(x => x.delete({timeout: 5000 })).catch(() => {})}
if(!message.content.includes(`<@${kullanıcı.id}>`)) {
  
if(afkdkullanıcı) { message.lineReply(embed.setDescription(`${message.author} Adlı Kullanıcı AFK Modundan Çıktı`)).then(x => x.delete({timeout: 5000 })).catch(() => {});
db.delete(`afk_${message.author.id}`)}}});