const Sequelize = require('sequelize');

const db = require("../config/database")

const channel_suggestion = db.define('channelSuggestion', {
    guildId: {
      type: Sequelize.STRING(20),
      unique: true,
    },
    channelId: Sequelize.TEXT,
    webhookId: Sequelize.TEXT,
    webhookToken: Sequelize.TEXT,
    comment: Sequelize.BOOLEAN
  })
module.exports = channel_suggestion;