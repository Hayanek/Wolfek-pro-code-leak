const { MessageEmbed } = require("discord.js");
const colors = require('../config/kolorki.json')
const logi = require(`../databaseModel/logs`)
module.exports = {
    name: "guildBanRemove",
    async run(ban){
        logi.sync()

        const istnienie = await logi.findOne({ where: { guildId: ban.guild.id } })

        if(!istnienie) return

        const AuditLogFetch = await ban.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_REMOVE" });
        const osoba = AuditLogFetch.entries.first().executor

        const embedRemove = new MessageEmbed()
        .setColor(colors["Green"])
        .setTitle(`<:Edit1:875378943593697312> Odbanowano użytkownika!`)
        .addField(`<:Szukanie:875376674059993109> Osoba`, `\`\`\`${ban.user.tag} (${ban.user.id})\`\`\``, false)
        .addField(`<:Osoby:875324526496473138> Moderator`,`\`\`\`${osoba.tag} (${osoba.id})\`\`\``, false)
        .setThumbnail(ban.user.avatarURL({ dynamic: true }))
        .setTimestamp()

        return ban.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedRemove] });
    }
}