const { MessageEmbed } = require("discord.js")
const { errorEmoji } = require("../config/variables.js")
const colors = require('../config/kolorki.json')

module.exports = {
    blad: function(txt, msg){
        let x
        let embedAuthor = [`${msg.author.tag}`, msg.author.avatarURL({ dynamic: true })]

        const embedBlad = new MessageEmbed()
        .setColor(colors["ErrorColor"])
        .setAuthor({name: embedAuthor[0], iconURL: embedAuthor[1]})
        
        if(txt.toLowerCase() === "id") x = `Podane ID jest błędne lub nie zostało podane! Upewnij się że jest one prawidłowe i spróbuj jeszcze raz!`
  
        if(txt.toLowerCase() === "osoba") x = `Podana Osoba jest błędna lub nie została podana! Upewnij się że jest ona prawidłowa i spróbuj jeszcze raz!`
  
        if(txt.toLowerCase() === "error") x = `Wystąpił błąd podczas wykonywania tego polecenia! Spróbuj ponownie później lub skontaktuj się z jakimś programistą!`

        if(txt.toLowerCase() === "kanal") x = `Podany kanal jest błędny lub nie został podany! Upewnij się że jest on prawidłowy i spróbuj jeszcze raz!`

        if(txt.toLowerCase() === "rola") x = `Podana rola jest błędna lub nie została podana! Upewnij się że jest ona prawidłowa i spróbuj jeszcze raz!`

        if(txt.toLowerCase() === "dane") x = `Wprowadzone dane są nie prawidłowe! Zapoznaj się z poprawnym użyciem komendy i spróbuj jeszcze raz!` 

        if(!x) x = txt

        embedBlad.setDescription(`<:nie3:875324525624053820> ${x}`)
        return msg.reply({ embeds: [embedBlad], allowedMentions: {repliedUser: false} })
    },
    blad_interaction: function(txt, interaction){
        let x
        let embedAuthor = [`${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true })]

        const embedBlad = new MessageEmbed()
        .setColor(colors["ErrorColor"])
        .setAuthor({name: embedAuthor[0], iconURL: embedAuthor[1] })
        
        if(txt.toLowerCase() === "id") x = `Podane ID jest błędne lub nie zostało podane! Upewnij się że jest one prawidłowe i spróbuj jeszcze raz!`
  
        if(txt.toLowerCase() === "osoba") x = `Podana Osoba jest błędna lub nie została podana! Upewnij się że jest ona prawidłowa i spróbuj jeszcze raz!`
  
        if(txt.toLowerCase() === "error") x = `Wystąpił błąd podczas wykonywania tego polecenia! Spróbuj ponownie później lub skontaktuj się z jakimś programistą!`

        if(txt.toLowerCase() === "kanal") x = `Podany kanal jest błędny lub nie został podany! Upewnij się że jest on prawidłowy i spróbuj jeszcze raz!`

        if(txt.toLowerCase() === "rola") x = `Podana rola jest błędna lub nie została podana! Upewnij się że jest ona prawidłowa i spróbuj jeszcze raz!`

        if(txt.toLowerCase() === "dane") x = `Wprowadzone dane są nie prawidłowe! Zapoznaj się z poprawnym użyciem komendy i spróbuj jeszcze raz!` 

        if(!x) x = txt

        embedBlad.setDescription(`<:nie3:875324525624053820> ${x}`)
        return interaction.reply({ embeds: [embedBlad], allowedMentions: {repliedUser: false} })
    }
}