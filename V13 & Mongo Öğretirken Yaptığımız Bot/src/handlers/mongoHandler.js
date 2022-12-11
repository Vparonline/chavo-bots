const mongoose = require("mongoose");
const cfg = require("../configs/config.json");

mongoose.connect(cfg.mongoURL, {

useUnifiedTopology: true,
useNewUrlParser: true,
useFindAndModify: false,
}),

mongoose.connection.on("connected", () => {
console.log("Database Connected");
});
mongoose.connection.on("error", () => {
console.error("Database Errored!");    
});

