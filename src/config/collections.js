const { Collection } = require("discord.js")
module.exports = async (client) => {
    
        client.commands = new Collection()

        global.cooldowns = new Collection()

        client.configuration = new Collection()

        client.slashCommands = new Collection()

}
