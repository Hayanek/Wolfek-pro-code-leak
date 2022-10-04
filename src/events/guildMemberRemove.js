const { MessageEmbed } = require("discord.js")
const colors = require("../config/kolorki.json")
const channelLeave = require("../databaseModel/leave")
module.exports = {
    name: "guildMemberRemove",
    async run(member) {

    //Kanał żegnań
    const leave = await channelLeave.findOne({ where: { guildId: member.guild.id }})
    if(leave){
      const messageChannel = member.guild.channels.cache.get(leave.get('channelId'))

      if(!messageChannel) return leave.destroy({ where: { guildId: member.guild.id, channelId: leave.get('channelId') } })

      const message = leave.get('message')

      let text = message.replace('{member}', `<@${member.user.id}>`).replace('{guild}', member.guild.name)

      const embed = new MessageEmbed()
      .setTitle(`Żegnaj ${member.user.tag}!`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setDescription(text)
      .setFooter({text: `Byłeś/aś ${member.guild.memberCount} osobą na tym serwerze!`, iconURL: `https://cdn.discordapp.com/avatars/761566285913260064/04bcdb0f22691512edd0f75425574795.webp?size=2048` },)
      .setColor(colors["Red"])
      .setTimestamp()
      return messageChannel.send({ embeds: [embed] })
    }
    }
}