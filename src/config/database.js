require('dotenv').config();
const { YoleqBot } = require('./variables')

let namebase = process.env.basename
const user = process.env.baseuser
const password = process.env.basepassword
const hostbase = process.env.basehost

const Sequelize = require('sequelize');

module.exports = new Sequelize(namebase, user, password, {
    host: `${hostbase}`,
    dialect: 'mariadb',
    logging: false,
    port: 3306,
    define: { timestamps: false },
    dialectOptions: {
        decimalNumbers: true,
        maxPreparedStatements: 20000
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 60000,
    },
})