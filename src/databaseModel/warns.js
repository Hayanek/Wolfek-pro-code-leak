const Sequelize = require('sequelize');

const db = require("../config/database")

const warns = db.define('warns', {
    idWarn: {
        type: Sequelize.INTEGER,
    },
    guildId: {
        type: Sequelize.STRING(20),
      },
    userId: {
        type: Sequelize.STRING(20),
    },
    modsId: {
        type: Sequelize.STRING(20),
    },
    reson: {
        type: Sequelize.STRING(60),
    },
    date: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
    }
    
  })
module.exports = warns;