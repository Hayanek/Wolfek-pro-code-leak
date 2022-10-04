const { MessageEmbed } = require("discord.js");
const colors = require('../config/kolorki.json')
const logi = require(`../databaseModel/logs`)
module.exports = {
    name: "emojiDelete",
    async run(emoji){
        logi.sync()

        const istnienie = await logi.findOne({ where: { guildId: emoji.guild.id } })
        
        if(!istnienie) return


        const AuditLogFetch = await emoji.guild.fetchAuditLogs({limit: 1, type: "EMOJI_DELETE"});
        const osoba = AuditLogFetch.entries.first().executor

        const embedDelete = new MessageEmbed()
        .setColor(colors["Red"])
        .setTitle(`<:Edit1:875378943593697312> Usunięto Emoji!`)
        .addField(`<:Szukanie:875376674059993109> Nazwa`, `\`\`\`${emoji.name}\`\`\``, false)
        .addField(`<:Osoby:875324526496473138> Użytkownik`,`\`\`\`${osoba.tag}\`\`\``, false)
        .setThumbnail(`https://cdn.discordapp.com/emojis/${emoji.id}.png`)
        .setTimestamp()

        return emoji.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedDelete] });
    }
}