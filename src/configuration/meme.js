const { Permissions : { FLAGS } } = require('discord.js');
module.exports = {
    name: "memy",
    description: "Ustawia kanał na memy",
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
            description: "Wybierz kanał",
            required: false
        }
    ],
    userPermissions: [FLAGS.BAN_MEMBERS, FLAGS.MANAGE_GUILD],
    async run(interaction, blad, sukces, meme) {
        try{
            meme.sync()

            const mode = interaction.options.getString('mode')
            const kanal = interaction.options.getChannel("kanal")
            const istnienie = await meme.findOne({ where: { guildId: interaction.guild.id } })

            if(mode === `reset`){
                if(!istnienie) return sukces(`Event memów został zresetowany!`, interaction)
                await meme.destroy({ where: { guildId: interaction.guild.id } })
                return sukces(`Event memów został zresetowany!`, interaction)
            }
                       
            if(mode === 'set' && kanal){
                
            if(kanal.type !== "GUILD_TEXT") return blad("Kanał ten nie jest kanałem tekstowym!", interaction)

                if(!istnienie) {
                    await meme.create({ guildId: interaction.guild.id, channelId: kanal.id })
                    return sukces(`Kanał został ustawiony na <#${kanal.id}>!`, interaction)
                }
                else {
                    if(istnienie.channelId === kanal.id) return blad(`Podany kanał jest już ustawiony takowy!`, interaction)
                    await meme.update({ channelId: kanal.id }, { where: { guildId: interaction.guild.id } })
                    return sukces(`Kanał został ustawiony na <#${kanal.id}>!`, interaction)
                }
            }

        } catch(error) { console.log(error) }
    }
}