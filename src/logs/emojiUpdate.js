const { MessageEmbed } = require("discord.js");
const colors = require('../config/kolorki.json')
const logi = require(`../databaseModel/logs`)
module.exports = {
    name: "emojiUpdate",
    async run(oldEmoji, newEmoji) {
        logi.sync()

        const istnienie = await logi.findOne({ where: { guildId: oldEmoji.guild.id } })

        if(!istnienie) return

        const AuditLogFetch = await newEmoji.guild.fetchAuditLogs({limit: 1, type: "EMOJI_UPDATE"});
        const osoba = AuditLogFetch.entries.first().executor

        const embedEdit = new MessageEmbed()
        .setColor(colors["White"])
        .setTitle(`<:Edit1:875378943593697312> Edytowano Emoji!`)
        .addField(`<:Upublicznij:875324526458708009> Nazwa przed`, `\`\`\`${oldEmoji.name}\`\`\``, false)
        .addField(`<:lel:921857907014909962> Nazwa po`, `\`\`\`${newEmoji.name}\`\`\``, false)
        .addField(`<:Osoby:875324526496473138> Użytkownik`,`\`\`\`${osoba.tag}\`\`\``, false)
        .setThumbnail(`https://cdn.discordapp.com/emojis/${oldEmoji.id}.png`)
        .setTimestamp()

        return newEmoji.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedEdit] });
    }
}