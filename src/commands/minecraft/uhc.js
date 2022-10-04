const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const colors = require('../../config/kolorki.json');
const hypixel = require('../../config/hypixel');

module.exports = {
    name: "uhc",
    description: "Statystki wybranego gracza serwera hypixel.net",
    args: true,
    usage: "<nick>",
    async run(msg, args, blad) {
        hypixel.getPlayer(args[0]).then(async (player) => {

            let game = player.stats.uhc

            const nazwa = {
                solo: "Solo",
                team: "Team",
            }
            const tryb = {
                solo: game.solo,
                team: game.team,
            }

            const overall = new MessageEmbed()
            .setAuthor({name: `UHC Stats`, iconURL: "https://images-ext-2.discordapp.net/external/mi46lbnGSwiWKpSwU35vlzyMcP1El1A4BW-cPbFRxk0/%3Fcb%3D20200521041809/https/static.wikia.nocookie.net/minecraft_gamepedia/images/5/54/Golden_Apple_JE2_BE2.png/revision/latest/scale-to-width-down/160"})
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Monety: \`${game.coins.toLocaleString('en-EN')}\` \n \`•\` Poziom: \`${game.starLevel}\` \n \`•\` Punkty: \`${game.score}\` \n \`•\` Głowki: \`${game.headsEaten}\`\n \`•\` Wygrane: \`${game.wins}\` \n \`•\` Zabójstwa: \`${game.kills}\` \n\`•\` Śmierci: \`${game.deaths}\` \n\`•\` KDR \`${game.KDRatio}\`**`, true)
            
            const solo = new MessageEmbed()
            .setAuthor({name: `${nazwa["solo"]} UHC Stats`, iconURL: "https://images-ext-2.discordapp.net/external/mi46lbnGSwiWKpSwU35vlzyMcP1El1A4BW-cPbFRxk0/%3Fcb%3D20200521041809/https/static.wikia.nocookie.net/minecraft_gamepedia/images/5/54/Golden_Apple_JE2_BE2.png/revision/latest/scale-to-width-down/160"})
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Monety: \`${game.coins.toLocaleString('en-EN')}\` \n \`•\` Poziom: \`${game.starLevel}\` \n \`•\` Punkty: \`${game.score}\` \n \`•\` Głowki: \`${game["solo"].headsEaten}\`\n \`•\` Wygrane: \`${game["solo"].wins}\` \n \`•\` Zabójstwa: \`${game["solo"].kills}\` \n\`•\` Śmierci: \`${game["solo"].deaths}\` \n\`•\` KDR \`${Math.round((game["solo"].kills / game["solo"].deaths)*100)/100}\`**`, true)
            
            const team = new MessageEmbed()
            .setAuthor({name: `${nazwa["team"]} UHC Stats`, iconURL: "https://images-ext-2.discordapp.net/external/mi46lbnGSwiWKpSwU35vlzyMcP1El1A4BW-cPbFRxk0/%3Fcb%3D20200521041809/https/static.wikia.nocookie.net/minecraft_gamepedia/images/5/54/Golden_Apple_JE2_BE2.png/revision/latest/scale-to-width-down/160"})
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Monety: \`${game.coins.toLocaleString('en-EN')}\` \n \`•\` Poziom: \`${game.starLevel}\` \n \`•\` Punkty: \`${game.score}\` \n \`•\` Głowki: \`${game["team"].headsEaten}\`\n \`•\` Wygrane: \`${game["solo"].wins}\` \n \`•\` Zabójstwa: \`${game["team"].kills}\` \n\`•\` Śmierci: \`${game["team"].deaths}\` \n\`•\` KDR \`${Math.round((game["team"].kills / game["team"].deaths)*100)/100}\`**`, true)

            let buttons = [
                new MessageButton({
                     label: "Overall",
                     style: 'PRIMARY',
                     customId: "overall"
                     }),
                 new MessageButton({
                     label: "Solo",
                     style: 'SECONDARY',
                     customId: "solo"
                     }),
                 new MessageButton({
                     label: "Team",
                     style: 'SECONDARY',
                     customId: "team"
                     })
                 ]

            let button = new MessageActionRow().addComponents(buttons)

            let message = await msg.reply({
                embeds: [overall],
                allowedMentions: {repliedUser: false},
                components: [button]
            })

            const filter = (interaction) => interaction.user.id === msg.author.id;
            const collector = message.createMessageComponentCollector({ filter ,componentType: "BUTTON", idle: 15000 })

            collector.on('collect', async (button) => {   
                let defaultOption = []
                buttons.forEach(w => {
                    if(w.customId === button.customId) w.style = "PRIMARY"
                    else w.style = "SECONDARY"
                    defaultOption.push(w)
                })

                let buttonNew = new MessageActionRow().addComponents(defaultOption)

                //check na wybrane menu
                if (button.customId === "overall"){
                    await button.deferUpdate()
                    message.edit({ embeds: [overall], components: [buttonNew] })
                }

                if (button.customId === "solo") {
                    await button.deferUpdate()
                    message.edit({ embeds: [solo], components: [buttonNew]  });
                }
                
                if (button.customId === "team") {
                    await button.deferUpdate()
                    message.edit({ embeds: [team], components: [buttonNew]}); 
                }
            })
            
            collector.on("end", (menu) => {  message.edit({components: []}) })

        }).catch(e => {return blad("osoba", msg), console.log(e)})
    }
}