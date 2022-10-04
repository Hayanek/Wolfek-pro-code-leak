const { Permissions : { FLAGS } } = require('discord.js');
module.exports = {
    name: "counts",
    description: "Ustawia kanał do zabawy w pisanie liczb do nieskończoności",
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
            description: "Wybierz kanal który ma być ustawiony.",
            required: false
        },
        {
            type: "STRINGCHOICES",
            name: "repeat",
            description: "Czy chcesz żeby kolejna osoba musiała być inna niż osoba co napisała wyżej?.",
            required: false,
            options: [ { name: "Tak", value: "yes" }, { name: "Nie", value: "no" } ]
        }
    ],
    userPermissions: [FLAGS.BAN_MEMBERS, FLAGS.MANAGE_GUILD],
    async run(interaction, blad, sukces, counts) {
        try{
        counts.sync()
        const mode = interaction.options.getString('mode')
        const kanal = interaction.options.getChannel('kanal')
        const repeat = interaction.options.getString('repeat')

        const kanalCount = await counts.findOne({where: { guildId: interaction.guild.id }})

        if(mode === `reset`){
            if(!kanalCount) return sukces(`Event liczenia został zresetowany!`, interaction)
            await counts.destroy({ where: { guildId: interaction.guild.id } })
            return sukces(`Event liczenia został zresetowany!`, interaction)
        }

        if(mode === `set` && repeat && !kanal){

            if(interaction.options.getString('repeat') === "yes"){
                if(kanalCount.repeat !== true) return await kanalCount.update({repeat: true}), sukces("Pomyslnie zablokowano powtarzanie osoby w liczeniu!", interaction)
                else return blad("Powtarzanie przez inne osoby jest właczone!", interaction)

            }else if (interaction.options.getString('repeat') === "no"){
                if(kanalCount.repeat !== false) return await kanalCount.update({repeat: false}), sukces("Pomyslnie odblokowano powtarzanie osoby w liczeniu!", interaction)
                else return blad("Powtarzanie przez inne osoby jest wyłaczone!", interaction)
            }
        }

        if(mode === `set` && kanal && !repeat){

            if(kanal.type !== "GUILD_TEXT") return blad("Kanał ten nie jest kanałem tekstowym!", interaction)

            if(!kanalCount){
                await counts.create({ guildId: interaction.guild.id, channelId: kanal.id })
                return sukces(`Kanał został ustawiony na <#${kanal.id}>!`, interaction)
            }
            else{
                if(kanalCount.channelId === kanal.id) return blad(`Podany kanał jest już ustawiony takowy!`, interaction)
                await kanalCount.update({ channelId: kanal.id })
                return sukces(`Kanał został ustawiony na <#${kanal.id}>!`, interaction)
            }
        }

        if(mode === `set` && kanal && repeat){

            if(kanal.type !== "GUILD_TEXT") return blad("Kanał ten nie jest kanałem tekstowym!", interaction)

            if(!kanalCount){
                if(repeat === "no") await counts.create({ guildId: interaction.guild.id, channelId: kanal.id, repeat: false })
                if(repeat === "yes") await counts.create({ guildId: interaction.guild.id, channelId: kanal.id, repeat: true })

                return sukces(`Kanał został ustawiony na <#${kanal.id}>!`, interaction)
            }
            else{
                if(kanalCount.channelId === kanal.id) return blad(`Podany kanał jest już ustawiony takowy!`, interaction)
                 
                if(repeat === "no") await kanalCount.update({ channelId: kanal.id, repeat: false })
                if(repeat === "yes") await kanalCount.update({ channelId: kanal.id, repeat: true })

                return sukces(`Kanał został ustawiony na <#${kanal.id}>!`, interaction)
            }
        }

        return blad(`Embed helpa :P`, interaction)
        } catch(err) { 
            console.log(err)
        }
    }
}