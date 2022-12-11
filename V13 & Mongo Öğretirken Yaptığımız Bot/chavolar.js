const { Discord, Client, Collection, Intents, Permissions  } = require("discord.js");
const client = (global.client = new Client({ intents: [ 32767 ] }));
const cfg = require("./src/configs/config.json");
const moment = require("moment");
require("discord-reply");

//global.confdb = new Database("./src/configs/globalelchavopy.json");
client.commands = new Collection();
client.cooldown = new Map();
client.cooldowns = new Collection();
client.blockedFromCommand = [];

require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);
  
client
  .login(cfg.Token)
  .then(() => console.log("[BOT] Bot connected!"))
  .catch(() => console.log("[BOT] Bot can't connected!"));
