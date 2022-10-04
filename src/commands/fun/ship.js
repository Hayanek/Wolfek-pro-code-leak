const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "ship",
    description: "Jak bardzo wzkazane osoby/rzeczy pasują do siebie!",
    cooldown: 10,
    async run(msg, args, blad) {
        let liczba = Math.floor(Math.random() * (100 - 1)) + 1
        
        if(!args[0] || !args[1]) return blad("Muszisz podać 2 argumenty!", msg)

        if(args[2]) return blad("Podałeś za dużo argumentów!", msg)

        let embed = new MessageEmbed()
        .setTitle("❤ Kalkulator Miłości ❤")
        .setDescription(`\`\`${args[0]}\`\` + \`\`${args[1]}\`\` = ${liczba}`)

        msg.channel.send({ embeds: [embed] })
    }
}