const ayarlar = require("../../ayarlar.json")
module.exports = (client) => {
    client.user.setActivity(ayarlar.Bot_Aktivite)
};
