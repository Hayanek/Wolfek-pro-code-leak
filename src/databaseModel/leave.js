const Sequelize = require('sequelize');

const db = require("../config/database")

const channelLeave = db.define('channelLeave', {
    guildId: {
      type: Sequelize.STRING,
      unique: true,
    },
    channelId: Sequelize.TEXT,
    message: {
      type: Sequelize.TEXT,
      defaultValue: "> Smutno że opuściłeś/aś {guild}."
    }
  })
module.exports = channelLeave;