const { MessageEmbed } = require("discord.js");
const colors = require("../../config/kolorki.json");
module.exports = {
    name: "youtube",
    description: "Wyszukiwarka Youtube",
    aliases: ['yt', 'jutub', 'jutube'],
    args: true,
    usage: "<fraza>",
    cooldown: 10,
    async run(msg, args, blad) {
        const embedWyszukiwanie = new MessageEmbed()
        .setAuthor({ name: "Youtube", iconURL:"https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/395_Youtube_logo-512.png" })
        .setDescription("**> <:Upublicznij:875324526458708009> Wyszukiwanie...**")
        .setColor(colors["White"])
        .setTimestamp();

        msg.channel.send({ embeds: [ embedWyszukiwanie ] }).then(m => {
            let fullArgs = [...args].slice(0).join(" ")

            const embedGotowe = new MessageEmbed()
            .setAuthor({ name:"Youtube",  iconURL: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/395_Youtube_logo-512.png" })
            .setDescription(`** Sukces! O to wynik: [Klik!](https://www.youtube.com/search?q=${fullArgs.replaceAll(` `, `+`)})**`)
            .setColor(colors["White"])
            .setTimestamp();
            setTimeout(() => m.edit({ embeds: [ embedGotowe ] }), 2000)
        })
    }
}