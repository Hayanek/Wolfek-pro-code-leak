const { MessageEmbed } = require("discord.js");
const colors = require('../config/kolorki.json')
const logi = require(`../databaseModel/logs`)
const moment = require(`moment`);
module.exports = {
    name: "guildMemberRemove",
    async run(member){
        logi.sync()
        moment.locale("pl")
        const istnienie = await logi.findOne({ where: { guildId: member.guild.id } })
        if(!istnienie) return
        
        const embedRemove = new MessageEmbed()
        .setColor(colors["Red"])
        .setTitle(`<:Edit1:875378943593697312> Użytkownik opuścił serwer!`)
        .addField(`<:Szukanie:875376674059993109> Osoba`, `\`\`\`${member.user.tag} (${member.user.id})\`\`\``, false)
        .addField(`<a:Rertyosoby:875324526848778260> Data dołaczenia na serwer`, `\`\`${moment(member.joinedTimestamp).format('LL')}\`\` **|** \`\`${moment(member.joinedTimestamp).fromNow()}\`\``, true)
        .addField(`<a:Join1:875806819023486996> Data stworzenia konta`, `\`\`${moment(member.user.createdTimestamp).format('LL')}\`\` **|** \`\`${moment(member.user.createdTimestamp).fromNow()}\`\``, true)
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setTimestamp()

        return member.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedRemove] });
    }
}