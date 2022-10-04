const { MessageEmbed } = require("discord.js")
const colors = require("../config/kolorki.json")
const channelWelcome = require("../databaseModel/welcome")
module.exports = {
    name: "guildMemberAdd",
    async run(member) {
        //Kanał przywitań
        channelWelcome.sync()
        const welcome = await channelWelcome.findOne({ where: {  guildId: member.guild.id } })
        if(welcome){
            const messageChannel = await member.guild.channels.cache.get(welcome.get('channelId'))

            if(!messageChannel) return leave.destroy({ where: { guildId: member.guild.id, channelId: welcome.get('channelId') } })

            const message = welcome.get('message')

            let text = message.replace('{member}', `<@${member.user.id}>`).replace('{guild}', member.guild.name)
            const embed = new MessageEmbed()
            .setTitle(`Witaj ${member.user.tag}!`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(text)
            .setFooter({text: `Jesteś ${member.guild.memberCount} osobą na tym serwerze!`, iconURL: `https://cdn.discordapp.com/avatars/761566285913260064/04bcdb0f22691512edd0f75425574795.webp?size=2048`})
            .setColor(colors["Green"])
            .setTimestamp()
            return messageChannel.send({embeds: [embed]})
            }




    }
}