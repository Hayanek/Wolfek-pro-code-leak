require('dotenv').config();
const HypixelAPIReborn = require('hypixel-api-reborn');
const hypixel = new HypixelAPIReborn.Client(process.env.API_HYPIXEL, { cache: true });
module.exports = hypixel;