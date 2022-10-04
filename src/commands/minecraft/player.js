const { MessageEmbed } = require('discord.js');
const colors = require('../../config/kolorki.json');
const hypixel = require('../../config/hypixel');
const moment = require(`moment`);
module.exports = {
    name:"player",
    description:"Pokazuje informacje gracza z serwera Hypixel",
    args: true,
    usage: "<nick>",
    async run(msg, args, blad) {
        moment.locale('pl')
        let Discord = `<:discord12:875731922549080114>`
        let Youtube = `<:youtube:882258726151667722>`
        let Twitch = `<:twitch:882253258423402536>`
        hypixel.getPlayer(args[0],{guild: true}).then(async (player) => {
            const dc = player.socialMedia.filter(dc => dc.id === 'DISCORD').map(dc => dc.link)
            const yt = player.socialMedia.filter(yt => yt.id === 'YOUTUBE').map(yt => yt.link)
            const tt = player.socialMedia.filter(tt => tt.id === 'TWITCH').map(tt => tt.link)

            let aktywny = "<:tak3:882613854415228958>"
            if(player.isOnline === false) aktywny = "<:nie3:875324525624053820>"
            
            if(!args[1]){
            const embed = new MessageEmbed()
            .setDescription(`**[${player.rank}] ${player.nickname} (${aktywny})**`)
            .setFooter({text: msg.author.tag, iconURL: msg.author.avatarURL({ dynamic: true })})
            .setThumbnail(`https://cravatar.eu/helmavatar/${player.uuid}/128`)
            .setColor(colors['White'])
            .addField(`<a:Pucharek:875324525443706910> Poziom`,`> **\`${player.level}\`**`,true)
            .addField(`<a:Lisc:875324525854748672> Karma`, `> **\`${player.karma.toLocaleString('en-EN')}\`**`,true)
            .addField('<:Gwiazdka:875324526253207574> Punkty osiągnieć', `> **\`${player.achievementPoints.toLocaleString('en-EN')}\`**`, true)
            .addField('<:Czapka:875712489969578025> Wersja MC', `> **\`${player.mcVersion}\`**`, true)
            .addField('<:Serwery:875324525821165569> Gildia', `> **\`${player.guild != null ? player.guild.tag : "Brak"}\`**`, true)
            .addField('<:Flaga:875324525791817798> Jezyk', `> **\`${player.userLanguage}\`**`, true)
            .addField('<:klepsydra:934532646510407831> Czas', `\`•\` **Pierwsze logowanie** \`${moment(player.firstLogin).format('LLL')} (${moment(player.firstLogin).fromNow()})\` \n\`•\` **Ostatnie logowanie** \`${moment(player.lastLogin).format('LLL')} (${moment(player.lastLogin).fromNow()})\``)
            .addField('<a:znakczki:875324525544366101> Media społecznościowe', `> ${Youtube} ${yt.length != 0?`**[Link](${yt})**`:"**Nie podano**"}\n> ${Twitch} ${tt.length != 0 ?`**[Link](${tt})**`:"**Nie podano**"}\n> ${Discord} ${dc.length != 0 ? `**${dc}**`: "**Nie podano**"}`)
            msg.channel.send({ embeds: [embed]});
            }
        }).catch(e => { return blad("osoba", msg) })
    }
}