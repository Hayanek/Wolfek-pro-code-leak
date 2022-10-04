const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const colors = require('../../config/kolorki.json');
const hypixel = require('../../config/hypixel');

module.exports = {
    name: "skywars",
    description: "Statystki wybranego gracza serwera hypixel.net",
    args: true,
    aliases: ['sw'],
    usage: "<nick>",
    async run(msg, args, blad) {
        hypixel.getPlayer(args[0]).then(async (player) => {

        let game = player.stats.skywars
            
        const nazwa = {
            solo: "Solo",
            team: "Team"
        }
        const tryb = {
            solo: game.solo.overall,
            team: game.team.overall,
            solonormal: game.solo.normal,
            soloinsane: game.solo.insane,
            teamnormal: game.team.normal,
            teaminsane: game.team.insane
        }



    //Ogolne statystyki
    const embedsw = new MessageEmbed()
        .setAuthor({name: `SkyWars Stats`, iconURL: `https://www.nicepng.com/png/full/184-1847652_skywars-transparent-hypixel-illustration.png`})
        .setTitle(`[${player.rank}] ${player.nickname}`)
        .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
        .setColor(colors['White'])
        .addField(`<:Sens:875324526588751912> Statystyki ogólne`,`**\`•\` Stars: \`${game.level}\` \n \`•\` Monety: \`${game.coins.toLocaleString('en-EN')}\` \n \`•\` Souls: \`${game.souls}\` \n \`•\` Shards: \`${game.shards}\` \n \`•\` Opals: \`${game.opals}\` \n \`•\` Heads: \`${game.heads}\` \n \`•\` Tokeny: \`${game.tokens}\` \n \`•\` Loot chest: \`${game.lootChests}\`  **`, true)
        .addField(`<a:telewizor:875324525586313236> Gry`,`**\`•\` Winstreak: \`${game.winstreak}\` \n \`•\` Gry: \`${game.playedGames}\` \n \`•\` Wygrane: \`${game.wins}\` \n \`•\` Przegrane: \`${game.losses}\` \n \`•\` WLR: \`${game.WLRatio}\`**`, true)
        .addField(` <:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${game.kills}\` \n \`•\` Śmierci: \`${game.deaths}\` \n \`•\` KDR: \`${game.KDRatio}\`**`, true)

        //ogolnie ale solo
        const embedswsolo = new MessageEmbed()
        .setAuthor({name: `${nazwa["solo"]} SkyWars Stats`, iconURL: `https://www.nicepng.com/png/full/184-1847652_skywars-transparent-hypixel-illustration.png`})
        .setTitle(`[${player.rank}] ${player.nickname}`)
        .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
        .setColor(colors['White'])
        .addField(`<a:telewizor:875324525586313236> Gry`,`**\`•\` Winstreak: \`${tryb["solo"].winstreak}\` \n \`•\` Gry: \`${tryb["solo"].playedGames}\` \n \`•\` Wygrane: \`${tryb["solo"].wins}\` \n \`•\` Przegrane: \`${tryb["solo"].losses}\` \n \`•\` WLR: \`${tryb["solo"].WLRatio}\`**`, true)
        .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["solo"].kills}\` \n \`•\` Śmierci: \`${tryb["solo"].deaths}\` \n \`•\` KDR: \`${tryb["solo"].KDRatio}\`**`, true)
        .addField(`<a:Lisc:875324525854748672> insane`,`**\`•\` Wygrane: \`${tryb["soloinsane"].wins}\` \n \`•\` Przegrane: \`${tryb["soloinsane"].losses}\` \n \`•\` WLR: \`${tryb["soloinsane"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["soloinsane"].kills}\` \n \`•\` Śmierci: \`${tryb["soloinsane"].deaths}\` \n \`•\` KDR: \`${tryb["soloinsane"].KDRatio}\`**`, true)
        .addField(`<:Serwery:875324525821165569> Normal`,`**\`•\` Wygrane: \`${tryb["solonormal"].wins}\` \n \`•\` Przegrane: \`${tryb["solonormal"].losses}\` \n \`•\` WLR: \`${tryb["solonormal"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["solonormal"].kills}\` \n \`•\` Śmierci: \`${tryb["solonormal"].deaths}\` \n \`•\` KDR: \`${tryb["solonormal"].KDRatio}\` **`, true)
            
        // ogolnie ale team
        const embedswteam = new MessageEmbed()
        .setAuthor({name: `${nazwa["team"]} SkyWars Stats`, iconURL:`https://www.nicepng.com/png/full/184-1847652_skywars-transparent-hypixel-illustration.png`})
        .setTitle(`[${player.rank}] ${player.nickname}`)
        .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
        .setColor(colors['White'])
        .addField(`<a:telewizor:875324525586313236> Gry`,`**\`•\` Winstreak: \`${tryb["team"].winstreak}\` \n \`•\` Gry: \`${tryb["team"].playedGames}\` \n \`•\` Wygrane: \`${tryb["team"].wins}\` \n \`•\` Przegrane: \`${tryb["team"].losses}\` \n \`•\` WLR: \`${tryb["team"].WLRatio}\`**`, true)
        .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["team"].kills}\` \n \`•\` Śmierci: \`${tryb["team"].deaths}\` \n \`•\` KDR: \`${tryb["team"].KDRatio}\`**`, true)
        .addField(`<a:Lisc:875324525854748672> insane`,`**\`•\` Wygrane: \`${tryb["teaminsane"].wins}\` \n \`•\` Przegrane: \`${tryb["teaminsane"].losses}\` \n \`•\` WLR: \`${tryb["teaminsane"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["teaminsane"].kills}\` \n \`•\` Śmierci: \`${tryb["teaminsane"].deaths}\` \n \`•\` KDR: \`${tryb["teaminsane"].KDRatio}\`**`, true)
        .addField(`<:Serwery:875324525821165569> Normal`,`**\`•\` Wygrane: \`${tryb["teamnormal"].wins}\` \n \`•\` Przegrane: \`${tryb["teamnormal"].losses}\` \n \`•\` WLR: \`${tryb["teamnormal"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["teamnormal"].kills}\` \n \`•\` Śmierci: \`${tryb["teamnormal"].deaths}\` \n \`•\` KDR: \`${tryb["teamnormal"].KDRatio}\` **`, true)
          

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
                embeds: [embedsw],
                allowedMentions: {repliedUser: false},
                components: [button]
            })
            const filter = (interaction) => interaction.user.id === msg.author.id;
            const collector = message.createMessageComponentCollector({ filter , componentType: 'BUTTON', idle: 15000 })
            collector.on("collect", async (button) => {
            let defaultOption = []
                    buttons.forEach(w => {
                        if(w.customId === button.customId) w.style = "PRIMARY"
                        else w.style = "SECONDARY"
                        defaultOption.push(w)
                    })

                    let buttonNew = new MessageActionRow().addComponents(defaultOption)

                if (button.customId === "overall"){
                    message.edit({
                        embeds: [embedsw],
                        components: [buttonNew]
                        
                    })
                    button.deferUpdate()
                }
                if (button.customId === "solo"){
                    await message.edit({
                        embeds: [embedswsolo],
                        components: [buttonNew]
                    })
                    button.deferUpdate()
                    
                }
                if (button.customId === "team"){
                    message.edit({
                        embeds: [embedswteam],
                        components: [buttonNew]
                    })
                    button.deferUpdate()
                }

            })
            collector.on("end", (button) => { 
                message.edit({components: []})

            })
        



        })
        .catch(e => {return blad("osoba", msg), console.log(e)})
    }
}