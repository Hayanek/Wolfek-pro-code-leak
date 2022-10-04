const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const colors = require('../../config/kolorki.json');
const hypixel = require('../../config/hypixel');
module.exports = {
    name: "bedwars",
    description: "Statystki bedwars wybranego gracza serwera hypixel.net",
    args: true,
    aliases: ['bw'],
    usage: "<nick>",
    async run(msg, args, blad) {
        hypixel.getPlayer(args[0]).then(async (player) => {

            let game = player.stats.bedwars

            //overall 
            const overall = new MessageEmbed()
            .setAuthor({name: `Bedwars Stats`, iconURL: "https://static.wikia.nocookie.net/minecraft/images/c/c5/Bed.png/revision/latest/scale-to-width-down/300?cb=20191103220226"})
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors['White'])
            .addField(`<:Sens:875324526588751912> Statystyki ogólne`, `**\`•\` Level: \`${game.level}\` \n \`•\` Coins: \`${game.coins.toLocaleString('en-EN')}\`**`, true)
            .addField(`<a:telewizor:875324525586313236> Gry`, `**\`•\` Winstreak: \`${game.winstreak}\` \n \`•\` Wygrane: \`${game.wins}\` \n \`•\` Przegrane: \`${game.losses}\` \n\`•\` KDR: \`${game.WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${game.kills}\` \n \`•\` Śmierci: \`${game.deaths}\` \n \`•\` KDR: \`${game.KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> Finalne`,`**\`•\` Zabójstwa: \`${game.finalKills}\` \n \`•\` Śmierci: \`${game.finalDeaths}\` \n \`•\` KDR: \`${game.finalKDRatio}\`**`, true)
            .addField(`<:Serwery:875324525821165569> Łóżka`,`**\`•\` Stracone: \`${game.beds.lost}\` \n \`•\` Zniszczone: \`${game.beds.broken}\` \n \`•\` BBLR: \`${game.beds.BLRatio}\`**`, true)
            .addField(`<:Pliki:875324526513242122> Średnia`, `**\`•\` Zabójstwa: \`${game.avg.kills}\` \n \`•\` Finalne zabójstwa: \`${game.avg.finalKills}\` \n \`•\` Zniszczone łóżka: \`${game.avg.bedsBroken}\`**`, true)
            .addField(`<a:Plecak:875324526148354068> Surowce`,`**\`•\` Gold: \`${game.collectedItemsTotal.gold}\` \n \`•\` Iron: \`${game.collectedItemsTotal.iron}\` \n \`•\` Diamonds: \`${game.collectedItemsTotal.diamond}\` \n \`•\` Emeralds: \`${game.collectedItemsTotal.emerald}\` **`, true)

            //solo
            const solo = new MessageEmbed()
            .setAuthor({name: `Bedwars Stats`,iconURL: "https://static.wikia.nocookie.net/minecraft/images/c/c5/Bed.png/revision/latest/scale-to-width-down/300?cb=20191103220226"})
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors['White'])
            .addField(`<a:telewizor:875324525586313236> Gry`, `**\`•\` Winstreak: \`${game.solo.winstreak}\` \n \`•\` Wygrane: \`${game.solo.wins}\` \n \`•\` przegrane: \`${game.solo.losses}\` \n\`•\` KDR: \`${game.solo.WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${game.solo.kills}\` \n \`•\` Śmierci: \`${game.solo.deaths}\` \n \`•\` KDR: \`${game.solo.KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> Finalne`,`**\`•\` Zabójstwa: \`${game.solo.finalKills}\` \n \`•\` Śmierci: \`${game.solo.finalDeaths}\` \n \`•\` KDR: \`${game.solo.finalKDRatio}\`**`, true)
            .addField(`<:Serwery:875324525821165569> Łóżka`,`**\`•\` Stracone: \`${game.solo.beds.lost}\` \n \`•\` Zniszczone: \`${game.solo.beds.broken}\` \n \`•\` BBLR: \`${game.solo.beds.BLRatio}\`**`, true)
            .addField(`<:Pliki:875324526513242122> Średnia`, `**\`•\` Zabójstwa: \`${game.solo.avg.kills}\` \n \`•\` Finalne zabójstwa: \`${game.solo.avg.finalKills}\` \n \`•\` Zniszczone łóżka: \`${game.solo.avg.bedsBroken}\`**`, true)

            // dwójki
            const dwojki = new MessageEmbed()
            .setAuthor({name: `Bedwars Stats`, iconURL: "https://static.wikia.nocookie.net/minecraft/images/c/c5/Bed.png/revision/latest/scale-to-width-down/300?cb=20191103220226"})
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors['White'])
            .addField(`<a:telewizor:875324525586313236> Gry`, `**\`•\` Winstreak: \`${game.doubles.winstreak}\` \n \`•\` Wygrane: \`${game.doubles.wins}\` \n \`•\` Przegrane: \`${game.doubles.losses}\` \n\`•\` KDR: \`${game.doubles.WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${game.doubles.kills}\` \n \`•\` Śmierci: \`${game.doubles.deaths}\` \n \`•\` KDR: \`${game.doubles.KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> Finalne`,`**\`•\` Zabójstwa: \`${game.doubles.finalKills}\` \n \`•\` Śmierci: \`${game.doubles.finalDeaths}\` \n \`•\` KDR: \`${game.doubles.finalKDRatio}\`**`, true)
            .addField(`<:Serwery:875324525821165569> Łóżka`,`**\`•\` Stracone: \`${game.doubles.beds.lost}\` \n \`•\` Zniszczone: \`${game.doubles.beds.broken}\` \n \`•\` BBLR: \`${game.doubles.beds.BLRatio}\`**`, true)
            .addField(`<:Pliki:875324526513242122> Średnia`, `**\`•\` Zabójstwa: \`${game.doubles.avg.kills}\` \n \`•\` Finalne zabójstwa: \`${game.doubles.avg.finalKills}\` \n \`•\` Zniszczone łóżka: \`${game.doubles.avg.bedsBroken}\`**`, true)

            // trójki
            const trojki = new MessageEmbed()
            .setAuthor({name: `Bedwars Stats`, iconURL: "https://static.wikia.nocookie.net/minecraft/images/c/c5/Bed.png/revision/latest/scale-to-width-down/300?cb=20191103220226"})
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors['White'])
            .addField(`<a:telewizor:875324525586313236> Gry`, `**\`•\` Winstreak: \`${game.threes.winstreak}\` \n \`•\` Wygrane: \`${game.threes.wins}\` \n \`•\` Przegrane: \`${game.threes.losses}\` \n\`•\` KDR: \`${game.threes.WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${game.threes.kills}\` \n \`•\` Śmierci: \`${game.threes.deaths}\` \n \`•\` KDR: \`${game.threes.KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> Finalne`,`**\`•\` Zabójstwa: \`${game.threes.finalKills}\` \n \`•\` Śmierci: \`${game.threes.finalDeaths}\` \n \`•\` KDR: \`${game.threes.finalKDRatio}\`**`, true)
            .addField(`<:Serwery:875324525821165569> Łóżka`,`**\`•\` Stracone: \`${game.threes.beds.lost}\` \n \`•\` Zniszczone: \`${game.threes.beds.broken}\` \n \`•\` BBLR: \`${game.threes.beds.BLRatio}\`**`, true)
            .addField(`<:Pliki:875324526513242122> Średnia`, `**\`•\` Zabójstwa: \`${game.threes.avg.kills}\` \n \`•\` Finalne zabójstwa: \`${game.threes.avg.finalKills}\` \n \`•\` Zniszczone łóżka: \`${game.threes.avg.bedsBroken}\`**`, true)

            //czwórki
            const czworki = new MessageEmbed()
            .setAuthor({name: `Bedwars Stats`, iconURL: "https://static.wikia.nocookie.net/minecraft/images/c/c5/Bed.png/revision/latest/scale-to-width-down/300?cb=20191103220226"})
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors['White'])
            .addField(`<a:telewizor:875324525586313236> Gry`, `**\`•\` Winstreak: \`${game.fours.winstreak}\` \n \`•\` Wygrane: \`${game.fours.wins}\` \n \`•\` Przegrane: \`${game.fours.losses}\` \n\`•\` KDR: \`${game.fours.WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${game.fours.kills}\` \n \`•\` Śmierci: \`${game.fours.deaths}\` \n \`•\` KDR: \`${game.fours.KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> Finalne`,`**\`•\` Zabójstwa: \`${game.fours.finalKills}\` \n \`•\` Śmierci: \`${game.fours.finalDeaths}\` \n \`•\` KDR: \`${game.fours.finalKDRatio}\`**`, true)
            .addField(`<:Serwery:875324525821165569> Łóżka`,`**\`•\` Stracone: \`${game.fours.beds.lost}\` \n \`•\` Zniszczone: \`${game.fours.beds.broken}\` \n \`•\` BBLR: \`${game.fours.beds.BLRatio}\`**`, true)
            .addField(`<:Pliki:875324526513242122> Średnia`, `**\`•\` Zabójstwa: \`${game.fours.avg.kills}\` \n \`•\` Finalne zabójstwa: \`${game.fours.avg.finalKills}\` \n \`•\` Zniszczone łóżka: \`${game.fours.avg.bedsBroken}\`**`, true)

            //4vs4
            const fourvsfour = new MessageEmbed()
            .setAuthor({name: `Bedwars Stats`, iconURL: "https://static.wikia.nocookie.net/minecraft/images/c/c5/Bed.png/revision/latest/scale-to-width-down/300?cb=20191103220226"})
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors['White'])
            .addField(`<a:telewizor:875324525586313236> Gry`, `**\`•\` Winstreak: \`${game["4v4"].winstreak}\` \n \`•\` Wygrane: \`${game["4v4"].wins}\` \n \`•\` Przegrane: \`${game["4v4"].losses}\` \n\`•\` KDR: \`${game["4v4"].WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${game["4v4"].kills}\` \n \`•\` Śmierci: \`${game["4v4"].deaths}\` \n \`•\` KDR: \`${game["4v4"].KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> Finalne`,`**\`•\` Zabójstwa: \`${game["4v4"].finalKills}\` \n \`•\` Śmierci: \`${game["4v4"].finalDeaths}\` \n \`•\` KDR: \`${game["4v4"].finalKDRatio}\`**`, true)
            .addField(`<:Serwery:875324525821165569> Łóżka`,`**\`•\` Stracone: \`${game["4v4"].beds.lost}\` \n \`•\` Zniszczone: \`${game["4v4"].beds.broken}\` \n \`•\` BBLR: \`${game["4v4"].beds.BLRatio}\`**`, true)
            .addField(`<:Pliki:875324526513242122> Średnia`, `**\`•\` Zabójstwa: \`${game["4v4"].avg.kills}\` \n \`•\` Finalne zabójstwa: \`${game["4v4"].avg.finalKills}\` \n \`•\` Zniszczone łóżka: \`${game["4v4"].avg.bedsBroken}\`**`, true)

            let options = [
                {
                    label: "Overall (Ogólne)",
                    value: "overall",
                    default: true
                },
                {
                    label: "Solo",
                    value: "solo",
                    default: false
                },
                {
                    label: "Doubles (Dwójki)",
                    value: "doubles",
                    default: false
                },
                {
                    label: "Threes (Twójki)",
                    value: "threes",
                    default: false
                },
                {
                    label: "Fours (Czwórki)",
                    value: "fours",
                    default: false
                },
                {
                    label: "4vs4",
                    value: "4vs4",
                    default: false
                    
                }
            ]

            let menu = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("bedwars")
                .setPlaceholder("WYBIERZ")
                .addOptions(options)
            )

            let message = await msg.reply({
                embeds: [overall],
                components: [menu],
                allowedMentions: { repliedUser: false }
            })

            const filter = (interaction) => interaction.user.id === msg.author.id;
            const collector = message.createMessageComponentCollector({ filter ,componentType: "SELECT_MENU", idle: 30000 })

            collector.on('collect', async (menu) => {   
                
                let defaultOption = []

                options.forEach(w => {
                    if(w.value === menu.values[0]) w.default = true
                    else w.default = false
                    defaultOption.push(w)
                })

                const newMenu = new MessageActionRow().addComponents(new MessageSelectMenu()
                    .setCustomId('select-personality-disabled')
                    .addOptions(defaultOption)
                );

                if (menu.values[0] === "overall"){
                    await menu.deferUpdate()
                    menu.message.edit({ embeds: [overall], components: [newMenu] })
                }

                if (menu.values[0] === "solo") {
                    await menu.deferUpdate()
                    message.edit({ embeds: [solo], components: [newMenu] });
                }
                
                if (menu.values[0] === "doubles") {
                    await menu.deferUpdate()
                    message.edit({ embeds: [dwojki], components: [newMenu] });  
                }

                if (menu.values[0] === "threes") {
                    await menu.deferUpdate()
                    message.edit({ embeds: [trojki], components: [newMenu] });
                }

                if (menu.values[0] === "fours") {
                    await menu.deferUpdate()
                    message.edit({ embeds: [czworki], components: [newMenu] });
                }

                if (menu.values[0] === "4vs4") { 
                    await menu.deferUpdate() 
                    message.edit({ embeds: [fourvsfour], components: [newMenu] });
                }
            })

            collector.on("end", (menu) => {message.edit({ components: [] })})

        }).catch(e => { return blad("osoba", msg), console.log(e) })
    }
}