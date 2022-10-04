const { Client, Intents } = require('discord.js');
const { readdirSync } = require("fs");
let client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS] });

const collections = require("./src/config/collections.js")

collections(client)

let handlers = readdirSync( __dirname + `/src/handlers`).filter((file) => file.endsWith(".js"));
handlers.forEach(handler => require(`./src/handlers/${handler}`)(client));

require('dotenv').config(); 
client.login(process.env.TOKEN);

client.on("debug", () => {})
client.on("error", () => {})
client.on("warn", () => {});

process.on("unhandledRejection", error => console.error("Promise rejection:", error))