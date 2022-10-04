const { MessageEmbed, Permissions : { FLAGS }, Client } = require('discord.js');
const colors = require('../../config/kolorki.json');
const warns = require(`../../databaseModel/warns`)
module.exports = {
    name: "warn",
    description: "Warnowanie użytkownika (prosze niech ktoś lepszy opis da xDD..)",
    args: true,
    usage: "<user/id> <powód>",
    cooldown: 10,
    userPermissions: [FLAGS.KICK_MEMBERS],
    async run(msg, args, blad, sukces) {

    const reasonArg = [...args].slice(1).join(" ");
    await warns.sync()
    try {
        let userWarn
        if(msg.mentions.users.first()) userWarn = msg.guild.members.cache.get(msg.mentions.users.first().id)
        else userWarn = await msg.guild.members.fetch({ user: args[0] })

        if(userWarn.id === msg.author.id) return blad("Nie mozesz sam siebie zwarnować!", msg)
        if (!userWarn.kickable) return blad("Nie mozesz zwarnować użytkownika wyzej odemnie!", msg)     
        if(msg.member.roles.highest.comparePositionTo(userWarn.roles.highest) <= 0) return blad("Nie mozesz zwarnować użytkownika który jest wyżej od ciebie!", msg)
        if(reasonArg.length === 0) return blad("Nie podano powodu warna.", msg)
        if(reasonArg.length > 60) return blad("Podany powód jest za długi max to 60 znaków.", msg)
        let id = await warns.count({ where: { guildId: msg.guild.id } })

        await warns.create({ 
            guildId: msg.guild.id,
            idWarn: Number(id+1),
            userId: userWarn.id,
            reson: reasonArg,
            modsId: msg.author.id,
        })

        let embed = new MessageEmbed()
            .setAuthor({ name: `${userWarn.user.tag} został zwarnowany`, iconURL: userWarn.user.avatarURL({ dynamic: true }) })
            .setDescription(`**Powód:** \`\`\`${reasonArg}\`\`\``)
            .setColor(colors["Green"])
            .setFooter({ text: `ID: ${Number(id+1)} | Moderator: ${msg.author.tag}` })
            msg.channel.send({ embeds: [embed] })


        
        
             
            
    }catch(error){ 
        return blad("osoba", msg), console.log(error) 
        
    }
    
    
    
    }
}
