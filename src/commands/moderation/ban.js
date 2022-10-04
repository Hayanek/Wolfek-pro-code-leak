const { MessageEmbed, Permissions : { FLAGS } } = require('discord.js');
const colors = require("../../config/kolorki.json")

module.exports = {
    name: "ban",
    description: "Banowanie członka serwera.",
    usage: "<user/id> [powód]",
    args: true,
    cooldown: 30,
    userPermissions: [FLAGS.BAN_MEMBERS],
    async run(msg, args, blad, sukces){
        let reason = [...args].slice(1).join(" ");

        try {
            let userBan;
            if(msg.mentions.users.first()){
            userBan = msg.guild.members.cache.get(msg.mentions.users.first().id);
            
            if(userBan.id === msg.author.id) return blad("Nie mozesz sam siebie zbanować!", msg);
            if (!userBan.kickable) return blad("Nie mozesz zbanować użytkownika wyzej odemnie!", msg);  
            if(msg.member.roles.highest.comparePositionTo(userBan.roles.highest) <= 0) return blad("Nie mozesz zbanować użytkownika który jest wyżej od ciebie!", msg);
            if(reason.length > 60) return blad("Podany powód jest za długi max to 60 znaków.", msg);

            userBan.ban({reason: `${reason ? reason : "Nie podano powodu."}`})

            let embed = new MessageEmbed()
            .setAuthor({ name: `${userBan.tag} został zbanowany`, iconURL: userBan.avatarURL({ dynamic: true }) })
            .setDescription(`**Powód:** \`\`\`${reason ? reason : "Nie podano powodu."}\`\`\``)
            .setColor(colors["Green"])
            .setFooter({ text: `Moderator: ${msg.author.tag}` })
            msg.channel.send({ embeds: [embed] })
            }else {
                await msg.guild.bans.fetch().then(bans => {
                    const user = bans.find(m => m.user.id === args[0]); 
                    if(user) return blad("Użytkownik którego chcesz zbanować jest zbanowany", msg)
                

                msg.guild.bans.create(args[0], {reason: `${reason ? reason : "Nie podano powodu."}`})
                .then(async banInfo => {
                    let userbans = await msg.guild.bans.fetch(banInfo)
                    let embed = new MessageEmbed()
                    .setAuthor({ name: `${userbans.user.tag} został zbanowany`, iconURL: userbans.user.avatarURL({ dynamic: true }) })
                    .setDescription(`**Powód:** \`\`\`${reason ? reason : "Nie podano powodu."}\`\`\``)
                    .setColor(colors["Green"])
                    .setFooter({ text: `Moderator: ${msg.author.tag}` })
                    msg.channel.send({ embeds: [embed] })
                })
                .catch(a => blad("osoba", msg))
            })
            }

        }catch(error) {
            console.log(error);
            return blad("osoba", msg);
        }

        



    }
}