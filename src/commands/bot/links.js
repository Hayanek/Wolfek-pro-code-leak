const { MessageEmbed} = require('discord.js');
const colors = require("../../config/kolorki.json")
module.exports = {
    name:"linki",
    description:"Pokazuje przydatne linki do bota.",
    cooldown: 3,
    async run(msg, args, blad) {
        const { botId } = require("../../config/variables.js")

        const embed = new MessageEmbed()
        .setTitle("Przydatne Linki!")
        .setColor(colors["MainColor"])
        .setThumbnail(`https://cdn.discordapp.com/emojis/875712489969578025.png?size=96`)
        .setDescription(`<:Serwery:875324525821165569> [Dodaj bota](https://discord.com/api/oauth2/authorize?client_id=761566285913260064&permissions=8&scope=applications.commands%20bot)
            <:Osoby:875324526496473138> [Serwer support](https://discord.gg/JncRpbyJ72)
            <:swiatblock:875814662992711721> [Strona Internetowa] Chwilowo Brak
            <:Czapka:875712489969578025> [Top.gg bota](https://top.gg/bot/${botId})`)
        .setTimestamp()
        return msg.channel.send({ embeds: [embed]})
    }
}