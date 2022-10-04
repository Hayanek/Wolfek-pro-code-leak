const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const colors = require('../../config/kolorki.json');
const hypixel = require('../../config/hypixel');

module.exports = {
    name: "duels",
    description: "Statystki wybranego gracza serwera hypixel.net",
    args: true,
    usage: "<nick>",
    async run(msg, args, blad) {
        hypixel.getPlayer(args[0]).then(async (player) => {

            let game = player.stats.duels

            const nazwa = {
                op: "Blitz",
                blitz: "Blitz",
                bow: "Bow",
                bridge: "Bridge",
                classic: "Classic",
                combo: "Combo",
                megawalls: "Megawalls",
                nodebuff: "Nodebuff",
                skywars: "Skywars",
                sumo: "Sumo",
                uhc: "Uhc"
            }
            const tryb = {
                op: game.op,
                blitz: game.blitz,
                bow: game.bow,
                bridge: game.bridge,
                classic: game.classic,
                combo: game.combo,
                megawalls: game.megawalls,
                nodebuff: game.nodebuff,
                skywars: game.skywars,
                sumo: game.sumo,
                uhc: game.uhc

            }

            if(game.title === null) game.title === ""

            const overall = new MessageEmbed()
            .setAuthor({name: `Overall Duels Stats - ${game.title}`, iconURL: "https://images-ext-1.discordapp.net/external/HWbu_BZw4nDfOWxsVLGRIgPRBik7vw9eumXXm5kxxpU/https/statsify.net/cdn/assets/hypixel/duels.png"})
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Coins: \`${game.coins.toLocaleString('en-EN')}\` \n \`•\` Gry: \`${game.playedGames}\` \n \`•\` Wygrane: \`${game.wins}\` \n \`•\` Przegrane: \`${game.losses}\` \n \`•\` WLR \`${game.WLRatio}\` \n \`•\` Winstreak: \`${game.winstreak}\` \n \`•\` Najlepszy Winstreak: \`${game.bestWinstreak}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${game.kills}\` \n \`•\` Śmierci: \`${game.deaths}\` \n \`•\` KDR \`${game.KDRatio}\`**`, true)

            const op = new MessageEmbed()
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setAuthor({name: `${nazwa["op"]} - ${game.title}`, iconURL: "https://images-ext-1.discordapp.net/external/HWbu_BZw4nDfOWxsVLGRIgPRBik7vw9eumXXm5kxxpU/https/statsify.net/cdn/assets/hypixel/duels.png"})
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Gry: \`${tryb["op"].overall.playedGames}\` \n \`•\` Winstreak: \`${tryb["op"].overall.winstreak}\` \n \`•\` Wygrane: \`${tryb["op"].overall.wins}\` \n \`•\` Przegrane: \`${tryb["op"].overall.losses}\` \n \`•\` WLR \`${tryb["op"].overall.WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["op"].overall.kills}\` \n \`•\` Śmierci: \`${tryb["op"].overall.deaths}\` \n \`•\` KDR \`${tryb["op"].overall.KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> 1v1`,`**\`•\` Winstreak: \`${tryb["op"]["1v1"].winstreak}\` \n \`•\` Wygrane: \`${tryb["op"]["1v1"].wins}\` \n \`•\` Przegrane: \`${tryb["op"]["1v1"].losses}\` \n \`•\` WLR: \`${tryb["op"]["1v1"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["op"]['1v1'].kills}\` \n \`•\` Śmierci \`${tryb["op"]["1v1"].deaths}\` \n \`•\` KDR: \`${tryb["op"]["1v1"].KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> 2v2`,`**\`•\` Winstreak: \`${tryb["op"]["2v2"].winstreak}\` \n \`•\` Wygrane: \`${tryb["op"]["2v2"].wins}\` \n \`•\` Przegrane: \`${tryb["op"]["2v2"].losses}\` \n \`•\` WLR: \`${tryb["op"]["2v2"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["op"]['2v2'].kills}\` \n \`•\` Śmierci \`${tryb["op"]["2v2"].deaths}\` \n \`•\` KDR: \`${tryb["op"]["2v2"].KDRatio}\`**`, true)

            const blitz = new MessageEmbed()
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setAuthor({name: `${nazwa["op"]} - ${game.title}`, iconURL: "https://images-ext-1.discordapp.net/external/HWbu_BZw4nDfOWxsVLGRIgPRBik7vw9eumXXm5kxxpU/https/statsify.net/cdn/assets/hypixel/duels.png"})
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Gry: \`${tryb["blitz"].playedGames}\` \n \`•\` winstreak: \`${tryb["blitz"].winstreak}\` \n \`•\` Wygrane: \`${tryb["blitz"].wins}\` \n \`•\` Przegrane: \`${tryb["blitz"].losses}\` \n \`•\` WLR \`${tryb["blitz"].WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["blitz"].kills}\` \n \`•\` Śmierci: \`${tryb["blitz"].deaths}\` \n \`•\` KDR \`${tryb["blitz"].KDRatio}\`**`, true)

            const bow = new MessageEmbed()
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setAuthor({name: `${nazwa["op"]} - ${game.title}`, iconURL: "https://images-ext-1.discordapp.net/external/HWbu_BZw4nDfOWxsVLGRIgPRBik7vw9eumXXm5kxxpU/https/statsify.net/cdn/assets/hypixel/duels.png"})
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Gry: \`${tryb["bow"].playedGames}\` \n \`•\` Winstreak: \`${tryb["bow"].winstreak}\` \n \`•\` Wygrane: \`${tryb["bow"].wins}\` \n \`•\` Przegrane: \`${tryb["bow"].losses}\` \n \`•\` WLR \`${tryb["bow"].WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["bow"].kills}\` \n \`•\` Śmierci: \`${tryb["bow"].deaths}\` \n \`•\` KDR \`${tryb["bow"].KDRatio}\`**`, true)

            const bridge = new MessageEmbed()
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setAuthor({name: `${nazwa["op"]} - ${game.title}`, iconURL: "https://images-ext-1.discordapp.net/external/HWbu_BZw4nDfOWxsVLGRIgPRBik7vw9eumXXm5kxxpU/https/statsify.net/cdn/assets/hypixel/duels.png"})
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Gry: \`${tryb["bridge"].overall.playedGames}\` \n \`•\` winstreak: \`${tryb["bridge"].overall.winstreak}\` \n \`•\` Wygrane: \`${tryb["bridge"].overall.wins}\` \n \`•\` Przegrane: \`${tryb["bridge"].overall.losses}\` \n \`•\` WLR \`${tryb["bridge"].overall.WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["bridge"].overall.kills}\` \n \`•\` Śmierci: \`${tryb["bridge"].overall.deaths}\` \n \`•\` KDR \`${tryb["bridge"].overall.KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> 1v1`,`**\`•\` winstreak: \`${tryb["bridge"]["1v1"].winstreak}\` \n \`•\` Wygrane: \`${tryb["bridge"]["1v1"].wins}\` \n \`•\` Przegrane: \`${tryb["bridge"]["1v1"].losses}\` \n \`•\` WLR: \`${tryb["bridge"]["1v1"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["bridge"]['1v1'].kills}\` \n \`•\` Śmierci \`${tryb["bridge"]["1v1"].deaths}\` \n \`•\` KDR: \`${tryb["bridge"]["1v1"].KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> 2v2`,`**\`•\` winstreak: \`${tryb["bridge"]["2v2"].winstreak}\` \n \`•\` Wygrane: \`${tryb["bridge"]["2v2"].wins}\` \n \`•\` Przegrane: \`${tryb["bridge"]["2v2"].losses}\` \n \`•\` WLR: \`${tryb["bridge"]["2v2"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["bridge"]['2v2'].kills}\` \n \`•\` Śmierci \`${tryb["bridge"]["2v2"].deaths}\` \n \`•\` KDR: \`${tryb["bridge"]["2v2"].KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> 4v4`,`**\`•\` winstreak: \`${tryb["bridge"]["4v4"].winstreak}\` \n \`•\` Wygrane: \`${tryb["bridge"]["4v4"].wins}\` \n \`•\` Przegrane: \`${tryb["bridge"]["4v4"].losses}\` \n \`•\` WLR: \`${tryb["bridge"]["4v4"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["bridge"]['4v4'].kills}\` \n \`•\` Śmierci \`${tryb["bridge"]["4v4"].deaths}\` \n \`•\` KDR: \`${tryb["bridge"]["4v4"].KDRatio}\`**`, true)

            const classic = new MessageEmbed()
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setAuthor({name: `${nazwa["op"]} - ${game.title}`, iconURL: "https://images-ext-1.discordapp.net/external/HWbu_BZw4nDfOWxsVLGRIgPRBik7vw9eumXXm5kxxpU/https/statsify.net/cdn/assets/hypixel/duels.png"})
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Gry: \`${tryb["classic"].playedGames}\` \n \`•\` winstreak: \`${tryb["classic"].winstreak}\` \n \`•\` Wygrane: \`${tryb["classic"].wins}\` \n \`•\` Przegrane: \`${tryb["classic"].losses}\` \n \`•\` WLR \`${tryb["classic"].WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["classic"].kills}\` \n \`•\` Śmierci: \`${tryb["classic"].deaths}\` \n \`•\` KDR \`${tryb["classic"].KDRatio}\`**`, true)

            const combo = new MessageEmbed()
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setAuthor({name: `${nazwa["op"]} - ${game.title}`, iconURL: "https://images-ext-1.discordapp.net/external/HWbu_BZw4nDfOWxsVLGRIgPRBik7vw9eumXXm5kxxpU/https/statsify.net/cdn/assets/hypixel/duels.png"})
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Gry: \`${tryb["combo"].playedGames}\` \n \`•\` winstreak: \`${tryb["combo"].winstreak}\` \n \`•\` Wygrane: \`${tryb["combo"].wins}\` \n \`•\` Przegrane: \`${tryb["combo"].losses}\` \n \`•\` WLR \`${tryb["combo"].WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["combo"].kills}\` \n \`•\` Śmierci: \`${tryb["combo"].deaths}\` \n \`•\` KDR \`${tryb["combo"].KDRatio}\`**`, true)

            const megawalls = new MessageEmbed()
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setAuthor({name: `${nazwa["op"]} - ${game.title}`, iconURL: "https://images-ext-1.discordapp.net/external/HWbu_BZw4nDfOWxsVLGRIgPRBik7vw9eumXXm5kxxpU/https/statsify.net/cdn/assets/hypixel/duels.png"}) 
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Gry: \`${tryb["megawalls"].playedGames}\` \n \`•\` winstreak: \`${tryb["megawalls"].winstreak}\` \n \`•\` Wygrane: \`${tryb["megawalls"].wins}\` \n \`•\` Przegrane: \`${tryb["megawalls"].losses}\` \n \`•\` WLR \`${tryb["megawalls"].WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["megawalls"].kills}\` \n \`•\` Śmierci: \`${tryb["megawalls"].deaths}\` \n \`•\` KDR \`${tryb["megawalls"].KDRatio}\`**`, true)

            const nodebuff = new MessageEmbed()
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setAuthor({name: `${nazwa["op"]} - ${game.title}`, iconURL: "https://images-ext-1.discordapp.net/external/HWbu_BZw4nDfOWxsVLGRIgPRBik7vw9eumXXm5kxxpU/https/statsify.net/cdn/assets/hypixel/duels.png"})
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Gry: \`${tryb["nodebuff"].playedGames}\` \n \`•\` winstreak: \`${tryb["nodebuff"].winstreak}\` \n \`•\` Wygrane: \`${tryb["nodebuff"].wins}\` \n \`•\` Przegrane: \`${tryb["nodebuff"].losses}\` \n \`•\` WLR \`${tryb["nodebuff"].WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["nodebuff"].kills}\` \n \`•\` Śmierci: \`${tryb["nodebuff"].deaths}\` \n \`•\` KDR \`${tryb["nodebuff"].KDRatio}\`**`, true)

            const skywars = new MessageEmbed()
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setAuthor({name: `${nazwa["op"]} - ${game.title}`, iconURL: "https://images-ext-1.discordapp.net/external/HWbu_BZw4nDfOWxsVLGRIgPRBik7vw9eumXXm5kxxpU/https/statsify.net/cdn/assets/hypixel/duels.png"})
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Gry: \`${tryb["skywars"].overall.playedGames}\` \n \`•\` winstreak: \`${tryb["skywars"].overall.winstreak}\` \n \`•\` Wygrane: \`${tryb["skywars"].overall.wins}\` \n \`•\` Przegrane: \`${tryb["skywars"].overall.losses}\` \n \`•\` WLR \`${tryb["skywars"].overall.WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["skywars"].overall.kills}\` \n \`•\` Śmierci: \`${tryb["skywars"].overall.deaths}\` \n \`•\` KDR \`${tryb["skywars"].overall.KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> 1v1`,`**\`•\` winstreak: \`${tryb["skywars"]["1v1"].winstreak}\` \n \`•\` Wygrane: \`${tryb["skywars"]["1v1"].wins}\` \n \`•\` Przegrane: \`${tryb["skywars"]["1v1"].losses}\` \n \`•\` WLR: \`${tryb["skywars"]["1v1"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["skywars"]['1v1'].kills}\` \n \`•\` Śmierci \`${tryb["skywars"]["1v1"].deaths}\` \n \`•\` KDR: \`${tryb["skywars"]["1v1"].KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> 2v2`,`**\`•\` winstreak: \`${tryb["skywars"]["2v2"].winstreak}\` \n \`•\` Wygrane: \`${tryb["skywars"]["2v2"].wins}\` \n \`•\` Przegrane: \`${tryb["skywars"]["2v2"].losses}\` \n \`•\` WLR: \`${tryb["skywars"]["2v2"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["skywars"]['2v2'].kills}\` \n \`•\` Śmierci \`${tryb["skywars"]["2v2"].deaths}\` \n \`•\` KDR: \`${tryb["skywars"]["2v2"].KDRatio}\`**`, true)

            const sumo = new MessageEmbed()
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setAuthor({name: `${nazwa["op"]} - ${game.title}`, iconURL: "https://images-ext-1.discordapp.net/external/HWbu_BZw4nDfOWxsVLGRIgPRBik7vw9eumXXm5kxxpU/https/statsify.net/cdn/assets/hypixel/duels.png"})
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Gry: \`${tryb["sumo"].playedGames}\` \n \`•\` winstreak: \`${tryb["sumo"].winstreak}\` \n \`•\` Wygrane: \`${tryb["sumo"].wins}\` \n \`•\` Przegrane: \`${tryb["sumo"].losses}\` \n \`•\` WLR \`${tryb["sumo"].WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["sumo"].kills}\` \n \`•\` Śmierci: \`${tryb["sumo"].deaths}\` \n \`•\` KDR \`${tryb["sumo"].KDRatio}\`**`, true)
            
            const uhc = new MessageEmbed()
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors["MainColor"])
            .setTitle(`[${player.rank}] ${player.nickname}`)
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setAuthor({name: `${nazwa["op"]} - ${game.title}`, iconURL: "https://images-ext-1.discordapp.net/external/HWbu_BZw4nDfOWxsVLGRIgPRBik7vw9eumXXm5kxxpU/https/statsify.net/cdn/assets/hypixel/duels.png"})
            .addField(`<:Sens:875324526588751912> Statystyki`,`**\`•\` Gry: \`${tryb["uhc"].overall.playedGames}\` \n \`•\` winstreak: \`${tryb["uhc"].overall.winstreak}\` \n \`•\` Wygrane: \`${tryb["uhc"].overall.wins}\` \n \`•\` Przegrane: \`${tryb["uhc"].overall.losses}\` \n \`•\` WLR \`${tryb["uhc"].overall.WLRatio}\`**`, true)
            .addField(`<:miecz:896068686769700914> Walka`,`**\`•\` Zabójstwa: \`${tryb["uhc"].overall.kills}\` \n \`•\` Śmierci: \`${tryb["uhc"].overall.deaths}\` \n \`•\` KDR \`${tryb["uhc"].overall.KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> 1v1`,`**\`•\` winstreak: \`${tryb["uhc"]["1v1"].winstreak}\` \n \`•\` Wygrane: \`${tryb["uhc"]["1v1"].wins}\` \n \`•\` Przegrane: \`${tryb["uhc"]["1v1"].losses}\` \n \`•\` WLR: \`${tryb["uhc"]["1v1"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["uhc"]['1v1'].kills}\` \n \`•\` Śmierci \`${tryb["uhc"]["1v1"].deaths}\` \n \`•\` KDR: \`${tryb["uhc"]["1v1"].KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> 2v2`,`**\`•\` winstreak: \`${tryb["uhc"]["2v2"].winstreak}\` \n \`•\` Wygrane: \`${tryb["uhc"]["2v2"].wins}\` \n \`•\` Przegrane: \`${tryb["uhc"]["2v2"].losses}\` \n \`•\` WLR: \`${tryb["uhc"]["2v2"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["uhc"]['2v2'].kills}\` \n \`•\` Śmierci \`${tryb["uhc"]["2v2"].deaths}\` \n \`•\` KDR: \`${tryb["uhc"]["2v2"].KDRatio}\`**`, true)
            .addField(`<:Usmiech:875324525728894976> 4v4`,`**\`•\` winstreak: \`${tryb["uhc"]["4v4"].winstreak}\` \n \`•\` Wygrane: \`${tryb["uhc"]["4v4"].wins}\` \n \`•\` Przegrane: \`${tryb["uhc"]["4v4"].losses}\` \n \`•\` WLR: \`${tryb["uhc"]["4v4"].WLRatio}\` \n \`•\` Zabójstwa: \`${tryb["uhc"]['4v4'].kills}\` \n \`•\` Śmierci \`${tryb["uhc"]["4v4"].deaths}\` \n \`•\` KDR: \`${tryb["uhc"]["4v4"].KDRatio}\`**`, true)

            let options = [
                {
                    label: "Overall",
                    value: "overall",
                    default: true
                },
                {
                    label: "Op",
                    value: "op",
                    default: false
                },
                {
                    label: "Blitz",
                    value: "blitz",
                    default: false
                },
                {
                    label: "Bow",
                    value: "bow",
                    default: false
                },
                {
                    label: "Bridge",
                    value: "bridge",
                    default: false
                },
                {
                    label: "Combo",
                    value: "combo",
                    default: false
                },
                {
                    label: "Megawalls",
                    value: "megawalls",
                    default: false
                },
                {
                    label: "Nodebuff",
                    value: "nodebuff",
                    default: false
                }, 
                {
                    label: "Skywars",
                    value: "skywars",
                    default: false
                },
                {
                    label: "Sumo",
                    value: "sumo",
                    default: false
                }, 
                {
                    label: "Uhc",
                    value: "uhc",
                    default: false 

                }
            ]

            let menu = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("Duels")
                .setPlaceholder("WYBIERZ")
                .addOptions(options)
            )

            let message = await msg.reply({
                embeds: [overall],
                components: [menu],
                allowedMentions: {repliedUser: false}
                
            })

            const filter = (interaction) => interaction.user.id === msg.author.id;
            const collector = message.createMessageComponentCollector({ filter ,componentType: "SELECT_MENU", idle: 40000 })

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

                //check na wybrane menu
                if (menu.values[0] === "overall"){
                    await menu.deferUpdate()
                    menu.message.edit({ embeds: [overall], components: [newMenu] })
                }
    
                if (menu.values[0] === "op") {
                    await menu.deferUpdate()
                    message.edit({ embeds: [op], components: [newMenu]  });
                }
                
                if (menu.values[0] === "blitz") {
                    await menu.deferUpdate()
                    message.edit({ embeds: [blitz], components: [newMenu]}); 
                }
                if (menu.values[0] === "bow") {
                    await menu.deferUpdate()
                    message.edit({ embeds: [bow], components: [newMenu]});
                }

                if (menu.values[0] === "bridge") {
                    await menu.deferUpdate()
                    message.edit({ embeds: [bridge], components: [newMenu]});
                }

                if (menu.values[0] === "classic") { 
                    await menu.deferUpdate() 
                    message.edit({ embeds: [classic], components: [newMenu]});
                }
                if (menu.values[0] === "combo") { 
                    await menu.deferUpdate() 
                    message.edit({ embeds: [combo], components: [newMenu]});
                }
                if (menu.values[0] === "megawalls") { 
                    await menu.deferUpdate() 
                    message.edit({ embeds: [megawalls], components: [newMenu]});
                }
                if (menu.values[0] === "nodebuff") { 
                    await menu.deferUpdate() 
                    message.edit({ embeds: [nodebuff], components: [newMenu]});
                }
                if (menu.values[0] === "skywars") { 
                    await menu.deferUpdate() 
                    message.edit({ embeds: [skywars], components: [newMenu]});
                }
                if (menu.values[0] === "sumo") { 
                    await menu.deferUpdate() 
                    message.edit({ embeds: [sumo], components: [newMenu]});
                }
                if (menu.values[0] === "uhc") { 
                    await menu.deferUpdate() 
                    message.edit({ embeds: [uhc], components: [newMenu]});
                }
            })

            collector.on("end", (menu) => { message.edit({components: []}) })

        }).catch(e => {return blad("osoba", msg), console.log(e)})
    }
}