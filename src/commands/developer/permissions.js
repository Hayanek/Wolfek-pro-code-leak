const { MessageEmbed } = require('discord.js');
const colors = require('../../config/kolorki.json');
module.exports = {
    name:"permy",
    aliases: ['permisje'],
    description: "Pokazuje permisje bota",
    usage: "[id serwera]",
    dev: true,
    async run(msg, args, blad, sukces) {
        try{

        let guild = msg.guild

        if(args[0]) guild = msg.client.guilds.cache.get(args[0])

        const embedPermy = new MessageEmbed()
        .setAuthor(embedAuthor[0], embedAuthor[1])
        .setTitle(`> Permisje bota na serwerze *${guild.name}*(\`${guild.id}\`)\n`)
        .setDescription (`\`\`\`js\n${eval(guild.me.permissions.toArray())}\n\`\`\``)
        .setColor(colors["MainColor"])
        .setTimestamp()
        .setFooter(embedFooter[0], embedFooter[1])
        msg.reply({ 
            embeds: [embedPermy],
            allowedMentions: {repliedUser: false}
        })

        }catch{
            blad("id", msg)
        }
    }
}