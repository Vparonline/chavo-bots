const mongoose = require("mongoose")

const kayıts = new mongoose.Schema({
    _id : String,
    guildID: { type: String},
    userID: { type: String},
    erkek: { type: Number},
    kadın: { type: Number},
    toplam: { type: Number}
})

module.exports = mongoose.model("register", kayıts)