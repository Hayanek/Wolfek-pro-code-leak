const { MessageEmbed } = require('discord.js');
const colors = require("../../config/kolorki.json")
module.exports = {
    name: "8ball",
    aliases: ['przepowiednia'],
    description: "Przepowiednia",
    cooldown: 10,
    usage: "<Przepowiednia>",
    args: true,
    async run(msg, args) {

        const fullArgs = [...args].slice(0).join(" ")

        let przypadki = ['Nie', 'Tak', 'To jest możliwe...', 'Chyba tak', 'Chyba nie', 'Nie wiem', 'Napewno nie', 'Napewno tak', 'To jest niemożliwe']

        let losowa = Math.floor(Math.random() * (przypadki.length - 0)) + 0 
        
        let tekst = przypadki[losowa]
    
        const embedBall = new MessageEmbed()
        .setTitle("🧙‍♂️ Magiczna Kula")
        .setColor(colors['Purple'])
        .addField(`<a:telewizor:875324525586313236> Pytanie`, `\`\`\`${fullArgs}\`\`\``)
        .addField(`<a:Wiadomosc:875324526412574760> Odpowiedź`, `\`\`\`${tekst}\`\`\``)
        .setTimestamp()
        msg.channel.send({ embeds: [embedBall] })
  
    }
} 