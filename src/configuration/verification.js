const { Permissions : { FLAGS }, MessageEmbed, MessageActionRow, MessageButton  } = require('discord.js');
const colors = require('../config/kolorki.json')
module.exports = {
    name: "verification",
    description: "Wyłącza wybrany kanał z użytku",
    cooldown: 30,
    userPermissions: [FLAGS.BAN_MEMBERS, FLAGS.MANAGE_GUILD],
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
            description: "Wybierz kanał na którym ma być weryfikacja.",
            required: false
        },
        {
            type: "ROLE",
            name: "rola",
            description: "Wybierz role która ma otrzymać zweryfikowany użytkownik.",
            required: false
        }
    ],
    async run(interaction, blad, sukces, verify) {
        verify.sync()

        const mode = interaction.options.getString('mode')
        const kanal = interaction.options.getChannel("kanal")
        const role = interaction.options.getRole('rola')
        const istnienie = await verify.findOne({ where: { guildId: interaction.guild.id } })

        if(mode === "reset"){
            if(!istnienie) return sukces(`Event weryfikacji został zresetowany!`, interaction)
            await verify.destroy({ where: { guildId: interaction.guild.id } })
            return sukces(`Event weryfikacji został zresetowany!`, interaction)
        }


        if(mode === "set" && kanal && role){
            if(kanal.type !== "GUILD_TEXT") return blad("Kanał ten nie jest kanałem tekstowym!", interaction)
            
            if(interaction.guild.me.roles.highest.comparePositionTo(role) <= 0) return blad("Nie mozesz uzyć tej roli bo jest wyżej niż role bota!", interaction);
           
                const row = new MessageActionRow()
			    .addComponents(
				    new MessageButton()
					.setCustomId('verify')
                    .setEmoji("✅")
					.setLabel('Zweryfikuj się!')
					.setStyle('SUCCESS'),
			    );

            let embed = new MessageEmbed()
            .setTitle("Weryfikacja")
            .setDescription("Aby sie zarejestrować, kliknij w przycisk ponizej!")
            .setTimestamp()
            .setColor(colors['Purple'])
        
            if(!istnienie) {
                await verify.create({ guildId: interaction.guild.id, channelId: kanal.id, roleId: role.id })
                interaction.client.channels.cache.get(kanal.id).send({ embeds: [embed], components: [row]})
                
                return sukces(`Kanał został ustawiony na <#${kanal.id}>!\nRola została ustawiona na <@&${role.id}>!`, interaction)
                
            }
            else {
                if(istnienie.channelId === kanal.id) return blad(`Podany kanał jest już ustawiony. Spróbuj innego!`, interaction)
                if(istnienie.roleId === role.id) return blad(`Podana rola jest już ostawiona. Spróbuj innej!`, interaction)
          
                await verify.update({ channelId: kanal.id, roleId: role.id }, { where: { guildId: interaction.guild.id } })
                interaction.client.cache.get(kanal.id).send({ embeds: [embed], components: [row] })
                return sukces(`Kanał został zmieniony na <#${kanal.id}>!\nRola została zmieniona na <@&${role.id}>!`, interaction)
            }
        }
    }
}