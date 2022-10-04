const Sequelize = require('sequelize');

const db = require("../config/database")

const counts = db.define('counts', {
    guildId: {
        type: Sequelize.STRING(20),
        unique: true,
    },
    channelId: {
        type: Sequelize.STRING(20),
        unique: true,
    },
    number: Sequelize.INTEGER,
    repeat: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
})

module.exports = counts;