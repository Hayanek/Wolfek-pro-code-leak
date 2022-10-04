const { Collection, Permissions: { FLAGS }, Permissions, MessageEmbed, Util } = require("discord.js")
const colors = require('../config/kolorki.json')
const names = require('../config/polishRolesNames.json')
const logi = require(`../databaseModel/logs`)
const chalk = require(`chalk`)
module.exports = {
    name: "channelUpdate",
    async run(oldChannel, newChannel) {
        logi.sync()

        if(oldChannel.name === newChannel.name && oldChannel.topic === newChannel.topic && oldChannel.nsfw === newChannel.nsfw && oldChannel.rateLimitPerUser === newChannel.rateLimitPerUser && oldChannel.bitrate === newChannel.bitrate && oldChannel.userLimit === newChannel.userLimit && oldChannel.rtcRegion === newChannel.rtcRegion) return

        const istnienie = await logi.findOne({ where: { guildId: oldChannel.guild.id } })

        if(!istnienie) return

        if(oldChannel.guild.id !== istnienie.guildId) return

        global.typ
        if(oldChannel.type === "GUILD_TEXT") typ = "Tekstowy"
        if(oldChannel.type === "GUILD_VOICE") typ = "Głosowy"
        if(oldChannel.type === "GUILD_CATEGORY") typ = "Kategoria"
        if(oldChannel.type === "GUILD_NEWS") typ = "Aktualności"
        if(oldChannel.type === "GUILD_STORE") typ = "Sklep"

        const AuditLogFetch = await newChannel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_UPDATE"});
        const osoba = AuditLogFetch.entries.first().executor

        const embedEdit = new MessageEmbed()
        .setColor(colors["White"])
        .setTitle(`<:Edit1:875378943593697312> Edytowano Kanał!`)
        .setTimestamp()

        if(newChannel.name !== oldChannel.name){
            embedEdit.addField(`<:Upublicznij:875324526458708009> Nazwa przed`, `\`\`\`${oldChannel.name}\`\`\``, false)
            embedEdit.addField(`<:lel:921857907014909962> Nazwa po`, `\`\`\`${newChannel.name}\`\`\``, false)
        }
        else embedEdit.addField(`<:Szukanie:875376674059993109> Nazwa`, `\`\`\`${oldChannel.name}\`\`\``, false)

        embedEdit.addField(`<a:foldernowy:875324525540171848> typ kanału`,`\`\`\`${typ}\`\`\` `, true)

        if(newChannel.topic !== oldChannel.topic){
            if(oldChannel.topic === null) embedEdit.addField(`<:Upublicznij:875324526458708009> Temat przed`, `\`\`\`Brak\`\`\``, false)
            else embedEdit.addField(`<:Upublicznij:875324526458708009> Temat przed`, `\`\`\`${oldChannel.topic}\`\`\``, false)

            if(newChannel.topic === null) embedEdit.addField(`<:lel:921857907014909962> Temat po`, `\`\`\`Brak\`\`\``, false)
            else embedEdit.addField(`<:lel:921857907014909962> Temat po`, `\`\`\`${newChannel.topic}\`\`\``, false)
        }

        if(newChannel.nsfw !== oldChannel.nsfw){
            embedEdit.addField(`<:Upublicznij:875324526458708009> Nsfw przed`, `\`\`\`${oldChannel.nsfw}\`\`\``, false)
            embedEdit.addField(`<:lel:921857907014909962> Nsfw po`, `\`\`\`${newChannel.nsfw}\`\`\``, false)
        }

        if(newChannel.rateLimitPerUser !== oldChannel.rateLimitPerUser){
            embedEdit.addField(`<:Upublicznij:875324526458708009> Slowmode przed`, `\`\`\`${oldChannel.rateLimitPerUser}\`\`\``, false)
            embedEdit.addField(`<:lel:921857907014909962> Slowmode po`, `\`\`\`${newChannel.rateLimitPerUser}\`\`\``, false)
        }

        if(newChannel.bitrate !== oldChannel.bitrate){
            embedEdit.addField(`<:Upublicznij:875324526458708009> Bitrate przed`, `\`\`\`${oldChannel.bitrate / 1000}\`\`\``, false)
            embedEdit.addField(`<:lel:921857907014909962> Bitrate po`, `\`\`\`${newChannel.bitrate / 1000}\`\`\``, false)
        }

        if(newChannel.rtcRegion !== oldChannel.rtcRegion){
            if(newChannel.rtcRegion)
            embedEdit.addField(`<:Upublicznij:875324526458708009> Region przed`, `\`\`\`${oldChannel.rtcRegion}\`\`\``, false)
            embedEdit.addField(`<:lel:921857907014909962> Region po`, `\`\`\`${newChannel.rtcRegion}\`\`\``, false)
        }

        if(newChannel.userLimit !== oldChannel.userLimit){
            if(oldChannel.topic === null) embedEdit.addField(`<:Upublicznij:875324526458708009> Temat przed`, `\`\`\`Automatyczny\`\`\``, false)
            else embedEdit.addField(`<:Upublicznij:875324526458708009> Temat przed`, `\`\`\`${oldChannel.userLimit}\`\`\``, false)

            if(newChannel.topic === null) embedEdit.addField(`<:lel:921857907014909962> Temat po`, `\`\`\`Automatyczny\`\`\``, false)
            else embedEdit.addField(`<:lel:921857907014909962> Temat po`, `\`\`\`${newChannel.userLimit}\`\`\``, false)
        }

        embedEdit.addField(`<:Osoby:875324526496473138> Użytkownik`,`\`\`\`${osoba.tag}\`\`\``, false)

        return newChannel.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedEdit] });
    }
}