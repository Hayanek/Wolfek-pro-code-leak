const { MessageEmbed } = require("discord.js")
const { sukcesEmoji } = require("../config/variables.js")
const colors = require('../config/kolorki.json')

module.exports = {
    sukces: function(txt, msg){
        let embedAuthor = [`${msg.author.tag}`, msg.author.avatarURL({ dynamic: true })]
        
        const embedSukces = new MessageEmbed()
            .setColor(colors["Green"])
            .setAuthor({name: embedAuthor[0], iconURL: embedAuthor[1]})
            .setDescription(`<:tak2:875324525192036372> ${txt}`)
            msg.reply({ embeds: [embedSukces], allowedMentions: {repliedUser: false}})
    },
    sukces_interaction: function(txt, interaction){
        let embedAuthor = [`${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true })]
        
        const embedSukces = new MessageEmbed()
            .setColor(colors["Green"])
            .setAuthor({name: embedAuthor[0], iconURL: embedAuthor[1]})
            .setDescription(`<:tak2:875324525192036372> ${txt}`)
            interaction.reply({ embeds: [embedSukces], allowedMentions: {repliedUser: false}})
    }
}