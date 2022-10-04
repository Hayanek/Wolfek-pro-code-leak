const Sequelize = require('sequelize');

const db = require("../config/database")

const prefix = db.define('prefix', {
    guildId: {
      type: Sequelize.STRING(20),
      unique: true,
    },
    prefix: Sequelize.TEXT,
  })
module.exports = prefix;