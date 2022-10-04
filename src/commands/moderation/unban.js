const { MessageEmbed, Permissions : { FLAGS } } = require('discord.js');
const colors = require("../../config/kolorki.json")

module.exports = {
    name: "unban",
    description: "Odbanowanie uzytkownika.",
    usage: "<id>",
    args: true,
    cooldown: 20,
    userPermissions: [FLAGS.BAN_MEMBERS],
    async run(msg, args, blad, sukces){
        let reason = [...args].slice(1).join(" ");

        try {
            await msg.guild.bans.fetch().then(bans => {
                const user = bans.find(m => m.user.id === args[0]); 
                if(!user) return blad("Podanego uzytkownika nie ma na liscie banów.", msg)

            msg.guild.bans.remove(args[0], { reason: `${reason ? reason : "Nie podano powodu."}`})
            .then(user => {
                let embed = new MessageEmbed()
                .setAuthor({ name: `${user.tag} został odbanowany`, iconURL: user.avatarURL({ dynamic: true }) })
                .setDescription(`**Powód:** \`\`\`${reason ? reason : "Nie podano powodu."}\`\`\``)
                .setColor(colors["Green"])
                .setFooter({ text: `Moderator: ${msg.author.tag}` })
                msg.channel.send({ embeds: [embed] })
            })
            })


        }catch(error) {
            console.log(error);
            return blad("osoba", msg);
        }
    }
}