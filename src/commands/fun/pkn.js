const { Permissions: { FLAGS } } = require("discord.js")
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const colors = require(`../../config/kolorki.json`);
module.exports = {
  name: "pkn",
  description: "Gra z botem w papier kamien nozyce",
  cooldown: 5,
  botPermissions: [FLAGS.SEND_MESSAGES],
  async run(msg) {

        const Wybieranie = new MessageEmbed()
        .setColor(colors["embed"])
        .setTitle(`Wybieranie!`)
        .setDescription(`Wybierz twoją odpowiedź!`)
        .setTimestamp()

        const embedkamienlose = new MessageEmbed()
        .setColor(colors["embed"])
        .setTitle(`Przegrałes!`) 
        .setDescription(`Wolfek: 🧻 \n${msg.author.username}: :rock:`)
        .setTimestamp()

        const embedkamienwin = new MessageEmbed()
        .setColor(colors["embed"])
        .setTitle(`Wygrałeś!`)
        .setDescription(`Wolfek: :scissors: \n${msg.author.username}: :rock:`)
        .setTimestamp()

        const embedpapierlose = new MessageEmbed()
        .setColor(colors["embed"])
        .setTitle(`Przegrałeś!`)
        .setDescription(`Wolfek: :scissors: \n${msg.author.username}: 🧻`)
        .setTimestamp()

        const embedpapierwin = new MessageEmbed()
        .setColor(colors["embed"])
        .setTitle(`Wygrałeś!`)
        .setDescription(`Wolfek: :rock: \n${msg.author.username}: 🧻`)
        .setTimestamp()

        const embednozyczkilose = new MessageEmbed()
        .setColor(colors["embed"])
        .setTitle(`Przegrałeś!`)
        .setDescription(`Wolfek: :rock: \n${msg.author.username}: :scissors:`)
        .setTimestamp()

        const embednozyczkinwin = new MessageEmbed()
        .setColor(colors["embed"])
        .setTitle(`Wygrałeś!`)
        .setDescription(`Wolfek: 🧻 \n${msg.author.username}: :scissors:`)
        .setTimestamp()

        const embedremis = new MessageEmbed()
        .setColor(colors["embed"])
        .setTitle(`Remis!`)
        .setDescription(`Daliście to samo`)
        .setTimestamp()
        
        let buttons = [
            new MessageButton({
                 style: 'SECONDARY',
                 customId: "kamien",
                 emoji: '🪨'
                 }),
             new MessageButton({
                 style: 'SECONDARY',
                 customId: "nozyczki",
                 emoji: "✂️"
                 }),
             new MessageButton({
                 style: 'SECONDARY',
                 customId: "papier",
                 emoji: "🧻"
                 })
             ]
    

        let button = new MessageActionRow().addComponents(buttons)
        
        let message = await msg.reply({
            embeds: [Wybieranie],
            components: [button],
            allowedMentions: { repliedUser: false }
        })

        let bot = ["kamien", "papier", "nozyczki"]

        const random = Math.floor((Math.random() * bot.length));
        const result = bot[random];
console.log(result)
        const filter = (interaction) => interaction.user.id === msg.author.id;
        const collector = message.createMessageComponentCollector({ filter ,componentType: "BUTTON", time: 15000,  max: 1 })

        collector.on('collect', async (button) => {   
        switch (button.customId) {
            case 'kamien': {
                if (result === 'papier') return message.edit({embeds: [embedkamienlose]});
                else if(result === "kamien") return message.edit({embeds: [embedremis]});
                else return message.edit({embeds: [embedkamienwin]});
            }
            case 'papier': {
                if (result === 'nozyczki') return message.edit({embeds: [embedpapierlose]});
                else if (result === "papier") return message.edit({embeds: [embedremis]});
                return message.edit({embeds: [embedpapierwin]})       
            }
            case 'nozyczki': {
                if (result === 'kamien') return message.edit({embeds: [embednozyczkilose]}) ;
                else if(result === "nozyczki") return message.edit({embeds: [embedremis]});
                return message.edit({embeds: [embednozyczkinwin]}) ;
            }
        }

          
        })
        collector.on("end", (button) => {  message.edit({components: []}) })
        
    }
}