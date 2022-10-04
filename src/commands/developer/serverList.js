const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const colors = require('../../config/kolorki.json')
module.exports = {
    name: "server-list",
    aliases: ['list', 'serwery', 'serwer-list', 'servers'],
    description:"Pokazuje liste serwerów na których jest bot!",
    dev: true,
    async run(msg) {
        const backId = 'back'
        const forwardId = 'forward'
        const backButton = new MessageButton({
            style: 'SECONDARY',
            emoji: '⬅️',
            customId: backId
        })

        const forwardButton = new MessageButton({
            style: 'SECONDARY',
            emoji: '➡️',
            customId: forwardId
        })

        const guilds = [...msg.client.guilds.cache.values()]


        let generateEmbed = async start => {
            const current = guilds.slice(start, start + 10)
            
            return new MessageEmbed({
                color: colors["Pink"],
                title: "Lista serwerów",
                fields: await Promise.all(
                    current.map(async g => ({
                        name: `${g.name}(\`${g.id}\`)`,
                        value: `${(await g.fetchOwner()).user.tag} (\`${(await g.fetchOwner()).user.id}\`)`
                    })
                ))
            })
        } 

        const canFitOnOnePage = guilds.length <= 10

        const embedMessage = await msg.reply({
            embeds: [await generateEmbed(0)],
            components: canFitOnOnePage ? [] : [new MessageActionRow({components: [forwardButton]})],
            allowedMentions: {repliedUser: false}
        })

        if (canFitOnOnePage) return

        const collector = embedMessage.createMessageComponentCollector({
            filter: ({user}) => user.id === msg.author.id,
            idle: 10000
        })

        let currentIndex = 0

        collector.on('collect', async interaction => {
            interaction.customId === backId ? (currentIndex -= 10) : (currentIndex += 10)

            await interaction.update({
                embeds: [await generateEmbed(currentIndex)],
                components: [
                    new MessageActionRow({
                        components: [
                            ...(currentIndex ? [backButton] : []),
                            ...(currentIndex + 10 < guilds.length ? [forwardButton] : [])
                        ]
                    })
                ]
            })
        })

      collector.on('end', async interaction => { await embedMessage.edit({components: []}) })
      
    }
}
