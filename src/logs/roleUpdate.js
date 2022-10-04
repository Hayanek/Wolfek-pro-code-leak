const { Collection, Permissions: { FLAGS }, Permissions, MessageEmbed, Util } = require("discord.js")
const colors = require('../config/kolorki.json')
const names = require('../config/polishRolesNames.json')
const logi = require(`../databaseModel/logs`)
const chalk = require(`chalk`)
module.exports = {
    name: "roleUpdate",
    async run(oldRole, newRole) {
        logi.sync()

        const istnienie = await logi.findOne({ where: { guildId: oldRole.guild.id } })

        if(!istnienie) return

        if(oldRole.guild.id !== istnienie.guildId) return

        let pierwsze = oldRole.permissions.missing(newRole.permissions)
        let drugie = newRole.permissions.missing(oldRole.permissions)

        let dodane = []
        let usuniete = []

        pierwsze.forEach(a => {
            const x = a.replace(a, names[a])
            dodane.push(x)
        })

        drugie.forEach(a => {
            const x = a.replace(a, names[a])
            usuniete.push(x)
        })

        if(oldRole.name === newRole.name && oldRole.color === newRole.color && dodane.length === 0 && usuniete.length === 0) return

        const AuditLogFetch = await newRole.guild.fetchAuditLogs({limit: 1, type: "ROLE_UPDATE"});
        const osoba = AuditLogFetch.entries.first().executor

        const embedEdit = new MessageEmbed()
        .setColor(newRole.color)
        .setTitle(`<:Edit1:875378943593697312> Edytowano role!`)
        .setTimestamp()

        if(newRole.name !== oldRole.name){
            embedEdit.addField(`<:Upublicznij:875324526458708009> Nazwa przed`, `\`\`\`${oldRole.name}\`\`\`` , false)
            embedEdit.addField(`<:lel:921857907014909962> Nazwa po`, `\`\`\`${newRole.name}\`\`\`` , false)
        }
        else embedEdit.addField(`<:Szukanie:875376674059993109> Nazwa`, `\`\`\`${oldRole.name}\`\`\`` , false)

        if(newRole.color !== oldRole.color){
            embedEdit.addField(`<:Upublicznij:875324526458708009> Kolor przed`, `\`\`\`${oldRole.hexColor}\`\`\`` , false)
            embedEdit.addField(`<:lel:921857907014909962> Kolor po`, `\`\`\`${newRole.hexColor}\`\`\`` , false)
        }

        if(dodane.length !== 0) embedEdit.addField(`<a:Flagaplus:875324526550986763> Dodane permisje`, `\`\`\`${dodane.join(`\n`)}\`\`\`` , false)
        if(usuniete.length !== 0) embedEdit.addField(`<a:Flagaminus:882610821899911168> Usunięte permisje`, `\`\`\`${usuniete.join(`\n`)}\`\`\`` , false)

        embedEdit.addField(`<:Osoby:875324526496473138> Użytkownik`,`\`\`\`${osoba.tag}\`\`\`  `,false)

        return newRole.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedEdit] });
    }
}