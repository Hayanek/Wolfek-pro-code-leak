const { MessageEmbed } = require("discord.js")
const colors = require('../../config/kolorki.json')
module.exports = {
    name:"avatar",
    aliases:['av','avk','pfp', 'icon'],
    description:"Pokazuje avatar osoby którą oznaczymy albo podamy id, jeżeli nie zostaną przekazane argumenty pokaże sie twój avatar",
    usage:"[@user/id]",
    async run(msg, args, blad) {
    try{
         let Target

         if(msg.mentions.users.first()) Target = msg.guild.members.cache.get(msg.mentions.users.first().id)
         else Target = await msg.guild.members.fetch({ user: args[0] })

         if(!args[0]){   
            const embed = new MessageEmbed()
            .setTitle("Twój Avatar")
            .setDescription(`[Link](${msg.author.avatarURL({ format: 'png', dynamic: true })})`)
            .setColor(colors["MainColor"])
            .setImage(msg.author.displayAvatarURL({size: 2048, dynamic: true}))
            return msg.channel.send({ embeds: [embed], allowedMentions: { repliedUser: false } })
         }

         if(Target){
            const embed = new MessageEmbed()
            .setTitle(`Avatar ${Target.user.tag}`)
            .setDescription(`[Link](${Target.user.avatarURL({ format: 'png', dynamic: true })})`)
            .setColor(colors["MainColor"])
            .setImage(Target.user.displayAvatarURL({size: 2048, dynamic: true}))
            return msg.channel.send({ embeds: [embed], allowedMentions: { repliedUser: false } })
         }

      }catch{ return blad('osoba', msg) }
   }  
}