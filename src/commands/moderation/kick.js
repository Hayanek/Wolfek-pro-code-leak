const { MessageEmbed, Permissions : { FLAGS } } = require('discord.js');
const colors = require("../../config/kolorki.json")

module.exports = {
    name: "kick",
    description: "Wywalanie uzytkownika z serwera.",
    usage: "<user/id> [powód]",
    args: true,
    cooldown: 10,
    userPermissions: [FLAGS.KICK_MEMBERS],
    async run(msg, args, blad, sukces){
        let reason = [...args].slice(1).join(" ");

        try {
            let userKick
            if(msg.mentions.users.first()) userKick = msg.guild.members.cache.get(msg.mentions.users.first().id)
            else userKick = await msg.guild.members.fetch({ user: args[0] })

            if(userKick.id === msg.author.id) return blad("Nie mozesz sam siebie wyrzucić!", msg)
            if (!userKick.kickable) return blad("Nie mozesz wyrzucić użytkownika wyzej odemnie!", msg)     
            if(msg.member.roles.highest.comparePositionTo(userKick.roles.highest) <= 0) return blad("Nie mozesz wyrzucić użytkownika który jest wyżej od ciebie!", msg)
            if(reason.length > 60) return blad("Podany powód jest za długi max to 60 znaków.", msg)

            userKick.kick({reason: `${reason ? reason : "Nie podano powodu."}`})


            let embed = new MessageEmbed()
            .setAuthor({ name: `${userKick.tag} został wyrzucony`, iconURL: userKick.avatarURL({ dynamic: true }) })
            .setDescription(`**Powód:** \`\`\`${reason ? reason : "Nie podano powodu."}\`\`\``)
            .setColor(colors["Green"])
            .setFooter({ text: `Moderator: ${msg.author.tag}` })
            msg.channel.send({ embeds: [embed] })

        }catch(error) {
            console.log(error);
            return blad("osoba", msg);
        }

        



    }
}