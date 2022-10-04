const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "dm",
    description: "Wysyłanie dm do danej osoby",
    usage: "<dm>",
    args: true,
    dev: true,
    async run(msg, args, blad, sukces) {
        try{
            let Target
            
            if(msg.mentions.users.first()) Target = msg.guild.members.cache.get(msg.mentions.users.first().id)
            else Target = await msg.guild.members.fetch({ user: args[0] })

            let fullArgs = [...args].slice(1).join(" ")

            if(!args[0]){
                Target.send(`${fullArgs} ~${msg.author.tag}`)
                return sukces(`Poprawinie wysłano wiadomość do osoby!`, msg)
            }
            else if(args[0] && Target){
                Target.send(`"${fullArgs}" ~${msg.author.tag}`)
                return sukces(`Poprawinie wysłano wiadomość do osoby!`, msg)
            }
        }catch{ blad("osoba", msg) }
    }
}
