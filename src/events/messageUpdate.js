const { Permissions } = require('discord.js');
module.exports = {
    name: "messageUpdate",
    async run(oldMessage, newMessage) {

        //Zabezpieczenie na Kanał Liczenia do Niespończoności 
        const counts = require('../databaseModel/counts')
        const kanalCount = await counts.findOne({ where: { channelId: newMessage.channel.id }})
        if (kanalCount) newMessage.delete()
    }
}