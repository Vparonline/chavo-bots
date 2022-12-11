const mongoose = require("mongoose")

const kayits = new mongoose.Schema({
    user: { type: String },
    isim: String,
    yetkili: { type: String},
    rol: String

})

module.exports = mongoose.model("isimlerr", kayits)