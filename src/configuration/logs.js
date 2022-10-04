const { Permissions : { FLAGS } } = require('discord.js');
module.exports = {
    name: "logs",
    description: "Ustawia kanał na logi serwera",
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
        }
    ],
    userPermissions: [FLAGS.BAN_MEMBERS, FLAGS.MANAGE_GUILD],
    async run(interaction, blad, sukces, logs) {
        try{
            logs.sync()

            const mode = interaction.options.getString('mode')
            const kanal = interaction.options.getChannel('kanal')
            const istnienie = await logs.findOne({ where: { guildId: interaction.guild.id } })

            if(mode === `reset`){
                if(!istnienie) return sukces(`Event logów został zresetowany!`, interaction)
                await logs.destroy({ where: { guildId: interaction.guild.id } })
                return sukces(`Event logów został zresetowany!`, interaction)
            }

        if(mode === `set` && kanal){
            
            if(kanal.type !== "GUILD_TEXT") return blad("Kanał ten nie jest kanałem tekstowym!", interaction)
            
            if(!istnienie){
                await logs.create({ guildId: interaction.guild.id, channelId: kanal.id })
                return sukces(`Kanał został ustawiony na <#${kanal.id}>!`, interaction)
            }
            else{
                if(istnienie.channelId === kanal.id) return blad(`Podany kanał jest już ustawiony spróbuj innego!`, interaction)

                await logs.update({ channelId: kanal.id }, { where: { guildId: interaction.guild.id } })
                return sukces(`Kanał został ustawiony na <#${kanal.id}>!`, interaction)
            }
        }
            return blad(`Embed helpa :P`, interaction)

        } catch(e) { console.log(e) }
    }
}