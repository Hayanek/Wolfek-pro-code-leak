const { MessageEmbed } = require('discord.js');
const colors = require(`../../config/kolorki.json`)
const { channelbug } = require('../../config/variables')
module.exports = {
    name: "błąd",
    aliases:['blad'],
    description: "Zgłaszanie błędów do staffu bota",
    usage: "<błąd>",
    cooldown: 60,
    args: true,
    async run(msg, args, blad) {
        msg.delete()
        let fullArgs = [...args].slice(0).join(" ")
        const embedBlad = new MessageEmbed()
        .setColor(colors["MainColor"])
        .addField(`<:Gwiazdka:875324526253207574> Dziękujemy za zgłoszenie błedu`,`> Błąd zostanie naprawiony w najbliszym czasie`)
        .setFooter({ text: `Głupie zgłoszenia będą skutkować karą na bota!`})
        .setTimestamp()
        .setThumbnail(`https://cdn.discordapp.com/emojis/875324526253207574.png?size=44`)
        msg.channel.send({ embeds: [embedBlad]}).then((m) => setTimeout(() => m.delete(), 10000))
        
        msg.client.channels.cache.get(channelbug).send(`Zgłoszenie ${msg.author.tag} (${msg.author.id})\n\`\`\` ${fullArgs}\`\`\``);
    }
}