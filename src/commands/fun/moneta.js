const { MessageEmbed } = require("discord.js");
const colors = require("../../config/kolorki.json")
module.exports = {
    name: "moneta",
    description: "losowanie orzeł lub reszka",
    cooldown: 10,
    async run(msg, args) {

        function losuj(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min }

        const l = losuj(1, 2)

        if(l === 1){
            const embed1 = new MessageEmbed()
            .setAuthor({name: "Orzeł!"})
            .setColor(colors["White"])
            .setTimestamp()
            .setImage('https://imgur.com/ZUUakiK.png');
            msg.channel.send({ 
                embeds: [embed1],
                allowedMentions: {repliedUser: false}
            })
        }

        if(l === 2){
            const embed2 = new MessageEmbed()
            .setAuthor({name: "Reszka!"})
            .setColor(colors["White"])
            .setTimestamp()
            .setImage('https://i.imgur.com/0MI9cHF.png');
            msg.channel.send({ 
                embeds: [embed2],
                allowedMentions: {repliedUser: false}
            })
        }  
    }
}