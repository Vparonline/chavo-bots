const mongoose = require("mongoose")

const kayıts = new mongoose.Schema({
    _id : String,
    guildID: { type: String},
    userID: { type: String},
    erkek: { type: Number, default: 0},
    kadın: { type: Number, default: 0},
    toplam: { type: Number}
})

module.exports = mongoose.model("register", kayıts)