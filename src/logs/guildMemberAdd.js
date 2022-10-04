const { MessageEmbed } = require("discord.js");
const colors = require('../config/kolorki.json')
const logi = require(`../databaseModel/logs`)
const moment = require(`moment`);
module.exports = {
    name: "guildMemberAdd",
    async run(member){
        logi.sync()
        moment.locale("pl")
        const istnienie = await logi.findOne({ where: { guildId: member.guild.id } })
        if(!istnienie) return

        const embedJoin = new MessageEmbed()
        .setColor(colors["Green"])
        .setTitle(`<:Edit1:875378943593697312> Nowy użytkownik dołączył na serwer!`)
        .addField(`<:Szukanie:875376674059993109> Osoba`, `\`\`\`${member.user.tag} (${member.user.id})\`\`\``, false)
        .addField(`<a:Rertyosoby:875324526848778260> Data dołaczenia na serwer`, `\`\`${moment(member.joinedTimestamp).format('LL')}\`\``, true)
        .addField(`<a:Join1:875806819023486996> Data stworzenia konta`, `\`\`${moment(member.user.createdTimestamp).format('LL')}\`\` **|** \`\`${moment(member.user.createdTimestamp).fromNow()}\`\``, true)
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setTimestamp()

        return member.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedJoin] });
    }
}