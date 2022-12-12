const { Client, Util } = require('discord.js');
const ayarlar = require('./ayarlar.json');
const chavo = require('discord-buttons')
const snekfetch = require('snekfetch');
const Discord = require("discord.js")
const client = new Discord.Client()
const express = require('express');
const moment = require('moment');
const chalk = require('chalk');
const db = require('quick.db');
const path = require('path');
const fs = require('fs');
const ms = require('ms');
require('./util/eventLoader.js')(client)
chavo(client)
require("discord-reply")

const log = message => { console.log(`${message}`)};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
if(err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
   files.forEach(f => {
    let props = require(`./commands/${f}`);
     log(`Yüklenen komut: ${props.help.name}.`);
      client.commands.set(props.help.name, props);})});

client.reload = command => { return new Promise((resolve, reject) => { try { delete require.cache[require.resolve(`./commands/${command}`)];
 let cmd = require(`./commands/${command}`);
  client.commands.delete(command);
   client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias)});
     client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
       client.aliases.set(alias, cmd.help.name)});
         resolve()} catch (e) { reject(e)}})};

client.load = command => {
 return new Promise((resolve, reject) => {
  try {
   let cmd = require(`./commands/${command}`);
    client.commands.set(command, cmd);
     cmd.conf.aliases.forEach(alias => {
      client.aliases.set(alias, cmd.help.name)});
       resolve()} catch (e) { reject(e)}})}

client.unload = command => {
 return new Promise((resolve, reject) => {
  try {
   delete require.cache[require.resolve(`./commands/${command}`)];
    let cmd = require(`./commands/${command}`);
     client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
       if (cmd === command) client.aliases.delete(alias)}); 
        resolve()} catch (e) { reject(e)}})}

client.elevation = message => {
 if(!message.guild) {
    return; } let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => { console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')))});

client.on('error', e => { console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')))});

const invites = {};
const wait = require("util").promisify(setTimeout);
client.on("ready", () => { wait(1000);
client.guilds.cache.forEach(g => { g.fetchInvites().then(guildInvites => { invites[g.id] = guildInvites; })})})

//----------------------- MAİN-HAZIR -----------------------\\

client.login(ayarlar.token);

//----------------------- TOKEN-AYAR -----------------------\\

client.on('ready', () => { client.user.setPresence({ activity: { name: "©️ Made By Châvo?" }, status: "dnd" })
client.channels.cache.get('991004542411886592').join(); 
console.log(`Discord Botu ${client.user.tag} Adı İle Giriş Yaptı`)});

client.on('voiceStateUpdate', async (___, newState) => {
if(newState.member.user.bot && newState.channelID && newState.member.user.id == client.user.id && !newState.selfDeaf ) { newState.setSelfDeaf(true); //newState.setSelfMute(true);
}});

//----------------------- SES-AYAR -----------------------\\