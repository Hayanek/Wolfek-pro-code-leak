const { MessageEmbed } = require('discord.js');
const colors = require('../../config/kolorki.json');
module.exports = {
    name: "ping",
    description: "Ping bota",
    async run(msg, args) {
        const ping = Date.now() - await msg.createdTimestamp
        const embedPing = new MessageEmbed()
        .setTitle(`Ping Bota! 🏓`)
        .addField(`Ping:`, `\`\`\`${ping}ms\`\`\``, true)
        .addField(`Api ping:`, `\`\`\`${msg.client.ws.ping}ms\`\`\``, true)
        .setColor('RANDOM')
        return msg.channel.send({ embeds: [embedPing]})
    }
}