const { MessageEmbed, ThreadManager } = require("discord.js")
const colors = require('../../config/kolorki.json')
module.exports = {
    name:"banner",
    description:"Pokazuje banner osoby którą oznaczymy albo podamy id, jeżeli nie zostaną przekazane argumenty pokaże sie twój banner",
    usage:"[@user/id]",
    async run(msg, args, blad) {
    try{
         let Target

         if(msg.mentions.users.first()) Target = msg.guild.members.cache.get(msg.mentions.users.first().id)
         else Target = await msg.guild.members.fetch(args[0], { force: true })

         if(!args[0]){   
            return msg.client.users.fetch(msg.author.id, { force: true }).then((u) => {
                if(u.banner === null) return blad("Nie posiadasz bannera", msg)
             
            const embed = new MessageEmbed()
            .setTitle("Twój Banner")
            .setDescription(`[Link](${u.bannerURL({ format: 'png', dynamic: true })})`)
            .setColor(colors["MainColor"])
            .setImage(u.bannerURL({size: 2048, dynamic: true}))
            return msg.channel.send({ embeds: [embed], allowedMentions: { repliedUser: false } })

            }).catch(r => { return blad('osoba', msg)})
            

         }
         if(Target){
             msg.client.users.fetch(Target.user.id, { force: true }).then((u) => {
                if(u.banner === null) return blad("Uzytkownik nie posiada bannera", msg)
                const embed = new MessageEmbed()
                .setTitle(`Banner ${u.tag}`)
                .setDescription(`[Link](${u.bannerURL({ size: 2048, format: 'png', dynamic: true })})`)
                .setColor(colors["MainColor"])
                .setImage(u.bannerURL({size: 2048, dynamic: true}))
                return msg.channel.send({ embeds: [embed], allowedMentions: { repliedUser: false } })

             }).catch(r => { return blad('osoba', msg) })
          
         }

      }catch(r) { return blad('osoba', msg) }
   }  
}