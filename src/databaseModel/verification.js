const Sequelize = require('sequelize');

const db = require("../config/database")

const verification = db.define('verification', {
    guildId: {
      type: Sequelize.STRING(20),
      unique: true,
    },
    channelId: {
        type: Sequelize.STRING(20),
    },
    roleId: {
        type: Sequelize.STRING(20),
    }
  })
module.exports = verification;