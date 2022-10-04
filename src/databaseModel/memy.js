const Sequelize = require('sequelize');

const db = require("../config/database")

const meme = db.define('meme', { 
    guildId: {
        type: Sequelize.STRING(20),
        unique: true,
    },  
    channelId: Sequelize.TEXT,  
})

module.exports = meme;