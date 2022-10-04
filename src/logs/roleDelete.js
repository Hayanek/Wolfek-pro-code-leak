const { Collection, Permissions: { FLAGS }, Permissions, MessageEmbed, Util } = require("discord.js")
const colors = require('../config/kolorki.json')
const names = require('../config/polishRolesNames.json')
const logi = require(`../databaseModel/logs`)
const chalk = require(`chalk`)
module.exports = {
    name: "roleDelete",
    async run(role) {
        logi.sync()

        const istnienie = await logi.findOne({ where: { guildId: role.guild.id } })

        if(!istnienie) return

        if(role.guild.id !== istnienie.guildId) return

        const AuditLogFetch = await role.guild.fetchAuditLogs({limit: 1, type: "ROLE_DELETE"});
        const osoba = AuditLogFetch.entries.first().executor

        const embedDelete = new MessageEmbed()
        .setColor(colors["Red"])
        .setTitle(`<:Edit1:875378943593697312> Usunięto role!`)
        .addField(`<:Szukanie:875376674059993109> Nazwa`, `\`\`\`${role.name}\`\`\`` , false)
        .addField(`<:Osoby:875324526496473138> Użytkownik`,`\`\`\`${osoba.tag}\`\`\`  `,false)
        .setTimestamp()

        return role.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedDelete] });
    }
}