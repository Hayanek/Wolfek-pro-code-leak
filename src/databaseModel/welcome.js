const Sequelize = require('sequelize');

const db = require("../config/database")

const channelWelcome = db.define('channelWelcome', {
    guildId: {
      type: Sequelize.STRING,
      unique: true,
    },
    channelId: Sequelize.TEXT,
    message: {
      type: Sequelize.TEXT,
      defaultValue: "> Cieszymy się że dołączyłeś/aś do {guild}."
    }
  })
module.exports = channelWelcome;