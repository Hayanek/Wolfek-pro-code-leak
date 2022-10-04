const Sequelize = require('sequelize');

const db = require("../config/database")

const logs = db.define('logs', { 
    guildId: {
        type: Sequelize.STRING(20),
        unique: true,
    },  
    channelId: Sequelize.TEXT,  
})

module.exports = logs;