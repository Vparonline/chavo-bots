const general = (general) => require(`./Events/general/${general}`)
const guard = (guard) => require(`./Events/guards/${guard}`)
const control = (ct) => require(`./Events/control/${ct}`)

module.exports = client => {
client.on("ready", () => general("ready")(client));
client.on('message', general('message'));
client.on('ready', control('check'))
}
