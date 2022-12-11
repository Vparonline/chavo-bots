const cfg = require("../configs/config.json");
const client = global.client;
const moment = require("moment")
/**
 * @param {Message} message
 * @returns {Promise<void>}
 */

module.exports = async (member) => {
let guild = client.guilds.cache.get(cfg.guildID);
let logkanal = guild.channels.cache.get(cfg.welcomeID);
let yetkili = guild.roles.cache.get(cfg.registerperms);

let günümeaçangüneş = moment(member.user.createdAt).format("DD");
let Atatürk = moment(member.user.createdAt).format("YYYY HH:mm:ss");
let aylık = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
    
const dünyayageldibebek = new Date().getTime() - member.user.createdAt.getTime(); 

var hesapkontrol;
if (dünyayageldibebek < 1296000000)
if (dünyayageldibebek > 1296000000);

let durum = Date.now()-member.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7

if(durum) {
    await member.roles.set(cfg.yenihesap)
    if(logkanal) logkanal.send({ content: `${member} Adlı kullanıcı sunucumuza katıldı fakat hesabı yeni açıldığı için şüpheli olarak bildirildi!`})
}else{
    await member.roles.add(cfg.Unregisteroles)
if(logkanal) logkanal.send({ content: `${member}, **${cfg.GuildName}** Sunucumuza Hoş Geldin
    Seninle beraber sunucumuz **${member.guild.memberCount}** Üye Sayısına Ulaştı. :tada:

    Hesabın _${günümeaçangüneş}_ _${Atatürk}_ _${aylık}_ Tarihinde Oluşturulmuş!
    Kayıt İşleminden Sonra <#${cfg.Kurallar}> Kanalına Göz Atmayı Unutmayın.

<#${cfg.voiceConfirmedChannelID}> Kanalına Katılarak **${cfg.welcomeNickName}** Vererek Kayıt Olabilirsin
\`\`\`fix
Şuanda Sunucumuzda Taglı Alım ${cfg.taglıalım} Durumda.
\`\`\``})
}
member.setNickname(cfg.welcomeNickName)
};
module.exports.conf = {
    name: "guildMemberAdd"
}