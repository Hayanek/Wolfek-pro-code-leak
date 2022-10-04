const { MessageEmbed, Permissions : { FLAGS }, MessageActionRow, MessageButton } = require('discord.js');
const colors = require('../../config/kolorki.json');
const warns = require(`../../databaseModel/warns`)
module.exports = {
    name: "warns",
    description: "Warnowanie użytkownika (prosze niech ktoś lepszy opis da xDD..)",
    args: true,
    usage: "<user/id> [idwarn]",
    cooldown: 10,
    userPermissions: [FLAGS.MANAGE_MESSAGES],
    async run(msg, args, blad, sukces) {

    await warns.sync()
    try{
        let userWarn
        if(msg.mentions.users.first()) userWarn = msg.guild.members.cache.get(msg.mentions.users.first().id)
        else userWarn = await msg.guild.members.fetch({ user: args[0] })

        if(args[1]){
            let id = await warns.findOne({ where: { guildId: msg.guild.id, userId: userWarn.id, idWarn: args[1]}})

            if(id){
                return sukces(`Warn Powód: ${id.reson}\nModerator: <@!${id.modsId}>`,msg)
            }
        }
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
        let id = await warns.findAll({ where: { guildId: msg.guild.id, userId: userWarn.id}})

        if(!id.length) return blad("Brak warnów!", msg) 
       
        const guilds = [...id]

        let generateEmbed = async start => {
            const current = guilds.slice(start, start + 10)
            
            return new MessageEmbed({
                color: colors["Aqua"],
                author: { name: `${userWarn.user.tag} - Lista Warnów `, iconURL: userWarn.user.avatarURL({ dynamic: true})},
                fields: await Promise.all(
                    current.map(async w => ({
                        name: `ID: ${w.idWarn} - ${(msg.guild.members.cache.get(await w.modsId)).user.tag ? (msg.guild.members.cache.get(await w.modsId)).user.tag : (await w.modsId) }`,
                        value: `Powód: \`\`${(await w.reson)}\`\``
                    })
                ))
            })
        } 

        const canFitOnOnePage = guilds.length <= 10

        const embedMessage = await msg.channel.send({
            embeds: [await generateEmbed(0)],
            components: canFitOnOnePage ? [] : [new MessageActionRow({components: [forwardButton]})],
            allowedMentions: {repliedUser: false}
        })

        if (canFitOnOnePage) return

        const collector = embedMessage.createMessageComponentCollector({
            filter: ({user}) => user.id === msg.author.id,
            idle: 20000
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
    }catch(error){ 
        return blad('osoba', msg)
    }
    
    
    
    }
}
