const { MessageEmbed } = require("discord.js");
const colors = require('../config/kolorki.json')
const logi = require(`../databaseModel/logs`)
module.exports = {
    name: "channelCreate",
    async run(channel) {
        logi.sync()

        const istnienie = await logi.findOne({ where: { guildId: channel.guild.id } })

        if(!istnienie) return

        if(!channel.guild.id === istnienie.guildId) return

        const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_CREATE"});
        const osoba = AuditLogFetch.entries.first().executor

        global.typ
        if(channel.type === "GUILD_TEXT") typ = "Tekstowy"
        if(channel.type === "GUILD_VOICE") typ = "Głosowy"
        if(channel.type === "GUILD_CATEGORY") typ = "Kategoria"
        if(channel.type === "GUILD_NEWS") typ = "Aktualności"
        if(channel.type === "GUILD_STORE") typ = "Sklep"

        const embedCreateChannel = new MessageEmbed()
        .setColor(colors["Green"])
        .setTitle(`<a:Menu:875324525443711000> Stworzono nowy kanał!`)
        .addField(`<:Osoby:875324526496473138> Użytkownik`,`\`\`\`${osoba.tag}\`\`\`  `,false)
        .addField(`<:Szukanie:875376674059993109> Nazwa kanału`,`\`\`\`${channel.name}\`\`\` `, true)
        .addField(`<a:foldernowy:875324525540171848> typ kanału`,`\`\`\`${typ}\`\`\` `, true)
        .setTimestamp()

        return channel.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedCreateChannel] });
    }
}