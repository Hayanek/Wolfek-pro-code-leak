const { MessageEmbed } = require("discord.js");
const colors = require("../../config/kolorki.json");
module.exports = {
    name: "google",
    aliases: ["asystent", "gugle", "wujek", "szukaj", "gugl"],
    description: "Wyszukiwarka Google",
    usage: "<fraza>",
    cooldown: 10,
    args: true,
    async run(msg, args, blad) {
        

        const embedWyszukiwanie = new MessageEmbed()
        .setAuthor({ name: "Google", iconURL: "https://czyscioch.net.pl/wp-content/uploads/2018/07/Google-logo.png"})
        .setDescription("**> <:Upublicznij:875324526458708009> Wyszukiwanie...**")
        .setColor(colors["White"])
        .setTimestamp();

        msg.channel.send({ embeds: [ embedWyszukiwanie ] }).then(m => {
            let fullArgs = [...args].slice(0).join(" ")

            const embedGotowe = new MessageEmbed()
            .setAuthor({ name: "Google", iconURL: "https://czyscioch.net.pl/wp-content/uploads/2018/07/Google-logo.png"})
            .setDescription(`** Sukces! O to wynik: [Klik!](https://www.google.pl/search?q=${fullArgs.replaceAll(` `, `+`)})**`)
            .setColor(colors["White"])
            .setTimestamp();
            setTimeout(() => m.edit({ embeds: [ embedGotowe ] }), 2000)
        })
    }
}