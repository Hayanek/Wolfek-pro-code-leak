const { Permissions : { FLAGS }, MessageEmbed } = require("discord.js")
const colors = require('../../config/kolorki.json');
module.exports = {
    name:"uptime",
    description:"Pokazuję aktualny czas działania bota.",
    cooldown: 10,
    botPermissions: [FLAGS.SEND_MESSAGES],
    async run(msg, args) {
        let days = Math.floor(msg.client.uptime / 86400000);
        let hours = Math.floor(msg.client.uptime / 3600000) % 24;
        let minutes = Math.floor(msg.client.uptime / 60000) % 60;

        const embed = new MessageEmbed()
        .setTitle("⏰ Uptime")
        .addField("Czas działania bota",`\`\`\`DNI: ${days}\nGODZINY: ${hours}\nMINUTY: ${minutes}\`\`\``)
        .setColor(colors["Purple"])
        return msg.channel.send({embeds: [embed]})
    }
}