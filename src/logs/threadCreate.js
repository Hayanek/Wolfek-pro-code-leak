const { MessageEmbed } = require("discord.js");
const colors = require('../config/kolorki.json')
const logi = require(`../databaseModel/logs`)
module.exports = {
    name: "threadCreate",
    async run(thread) {
        logi.sync()

        const istnienie = await logi.findOne({ where: { guildId: thread.guild.id } })

        if(!istnienie) return

        if(!thread.guild.id === istnienie.guildId) return

        const AuditLogFetch = await thread.guild.fetchAuditLogs({limit: 1, type: "THREAD_CREATE"});
        const osoba = AuditLogFetch.entries.first().executor

        const embedCreateChannel = new MessageEmbed()
        .setColor(colors["Green"])
        .setTitle(`<a:Menu:875324525443711000> Stworzono nowy Wątek!`)
        .addField(`<:Osoby:875324526496473138> Użytkownik`,`\`\`\`${osoba.tag}\`\`\`  `,false)
        .addField(`<:Szukanie:875376674059993109> Nazwa wątku`,`\`\`\`${thread.name}\`\`\` `, true)
        .setTimestamp()

        return thread.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedCreateChannel] });
    }
}