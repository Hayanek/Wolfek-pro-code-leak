const { Permissions : { FLAGS } } = require('discord.js');
module.exports = {
    name: "leave",
    description: "System Powitań",
    options: [
        {
            type: "STRINGCHOICES",
            name: "mode",
            description: "Wybierz co chcesz zrobić",
            required: true,
            options: [ { name: "Set", value: "set" }, { name: "Reset", value: "reset" } ]
        },
        {
            type: "CHANNEL",
            name: "kanal",
            description: "Wybierz kanał na którym bedą przychodzić powiadomienia o nowych użytkownika.",
            required: false,
        },
        {
            type: "STRING",
            name: "wiadomosc",
            description: "Jaki opis ma mieć embed żegnań. Zmienne {member}, {guild}",
            required: false,
        }
    ],
    userPermissions: [FLAGS.MANAGE_GUILD],
    async run(interaction, blad, sukces, db) {
        try{
            db.sync()

            const mode = interaction.options.getString('mode')
            const kanal = interaction.options.getChannel("kanal")
            const wiadomosc = interaction.options.getString('wiadomosc')
            const istnienie = await db.findOne({ where: { guildId: interaction.guild.id } })

            if(mode === `reset`){
                if(!istnienie) return sukces(`System żegnań nie był właczony`, interaction)
                await db.destroy({ where: { guildId: interaction.guild.id } })
                return sukces(`System żegnań został wyłączony!`, interaction)
            }
            if(mode === 'set' && kanal && wiadomosc){

                if(kanal.type !== "GUILD_TEXT") return blad("Kanał ten nie jest kanałem tekstowym!", interaction)
                if(!wiadomosc) return blad("W wiadomości nie wykorzystałeś zmiennych {member} lub {guild}", interaction)
    
                if(!istnienie) {
                    await db.create({ guildId: interaction.guild.id, channelId: kanal.id, message: wiadomosc })
                    return sukces(`Kanał został ustawiony na <#${kanal.id}> a wiadomość ${wiadomosc}!`, interaction)
                }
                else {
                    if(istnienie.channelId === kanal.id) return blad(`Wybrany kanał jest już ustawiony spróbuj inny!`, interaction)
                    if(istnienie.message === wiadomosc) return blad('Wybrana wiadomość jest już ustawiona spróbuj inną!)', interaction)
                    await db.update({ channelId: kanal.id, message: wiadomosc }, { where: { guildId: interaction.guild.id } })
                    return sukces(`Kanał został zmieniony na <#${kanal.id}>!\nWiadomość została zmieniona na \`\`${wiadomosc}\`\``, interaction)
                }
            }
                       
            if(mode === 'set' && kanal && !wiadomosc){
                
                if(kanal.type !== "GUILD_TEXT") return blad("Kanał nie jest kanałem tekstowym!", interaction)

                if(!istnienie) {
                    await db.create({ guildId: interaction.guild.id, channelId: kanal.id })
                    return sukces(`Kanał został ustawiony na <#${kanal.id}>!`, interaction)
                }
                else {
                    if(istnienie.channelId === kanal.id) return blad(`Podany kanał jest już ustawiony!`, interaction)
                    await db.update({ channelId: kanal.id }, { where: { guildId: interaction.guild.id } })
                    return sukces(`Kanał został ustawiony na <#${kanal.id}>!`, interaction)
                }
            }

            if(mode === 'set' && wiadomosc && !kanal){
                
                if(wiadomosc) return blad("W wiadomości nie wykorzystałeś zmiennych {member} lub {guild}", interaction)
    
                if(!istnienie){
                    await db.create({ guildId: interaction.guild.id, message: wiadomosc })
                    return sukces(`Opis żegnań ustawiono na \`\`${wiadomosc}>\`\`!`, interaction)
                }
                else{
                    if(istnienie.message === wiadomosc) return blad(`Podany kanał jest już ustawiony!`, interaction)
                    await db.update({ message: wiadomosc }, { where: { guildId: interaction.guild.id } })
                    return sukces(`Opis żegnań zmieniono na \`\`${wiadomosc}>\`\`!`, interaction)
                }
            }

           
        } catch(e) { console.log(e) }
    }
}