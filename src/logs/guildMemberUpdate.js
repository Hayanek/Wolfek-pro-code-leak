const { Collection, Permissions: { FLAGS }, Permissions, MessageEmbed, Util } = require("discord.js")
const colors = require('../config/kolorki.json')
const names = require('../config/polishRolesNames.json')
const logi = require(`../databaseModel/logs`)
const chalk = require(`chalk`)
module.exports = {
    name: "guildMemberUpdate",
    async run(oldMember, newMember) {
        logi.sync()

        const istnienie = await logi.findOne({ where: { guildId: oldMember.guild.id } })

        if(!istnienie) return

        if(oldMember.guild.id !== istnienie.guildId) return

        const embedEdit = new MessageEmbed()
        .setColor(colors["White"])
        .setTitle(`<:Edit1:875378943593697312> Edytowano nick użytkownika!`)
        .setThumbnail(oldMember.user.avatarURL({ dynamic: true }))
        .setTimestamp()

        if(newMember.nickname !== oldMember.nickname){
            embedEdit.addField(`<:Upublicznij:875324526458708009> Nick przed`, `\`\`\`${oldMember.nickname}\`\`\``, false)
            embedEdit.addField(`<:lel:921857907014909962> Nick po`, `\`\`\`${newMember.nickname}\`\`\``, false)
            newMember.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedEdit] });
        }

        return 
    }
}