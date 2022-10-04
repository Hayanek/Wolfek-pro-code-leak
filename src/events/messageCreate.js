const { MessageEmbed, WebhookClient, Permissions, Util } = require('discord.js');
const colors = require("../config/kolorki.json");

module.exports = {
    name: "messageCreate",
    async run(msg) {
        if(!msg.guild) return
        
        //prefix
        const PREFIX = require("../databaseModel/prefix")
        const { prefixDefault } = require("../config/variables.js")
        PREFIX.sync()
        const guildPrefix = await PREFIX.findOne({ where: { guildid: msg.guild.id } })
        global.prefix = guildPrefix ? guildPrefix.prefix : prefixDefault 
        const { developerRole, rolesGuild, cmdLog, botName, botId } = require("../config/variables.js")

        //funkcja na propozycje
        const suggestion = require("../databaseModel/suggestion")
        const setting = await suggestion.findOne({ where: { guildId: msg.guild.id } })

        if(setting && setting.channelId){

            if(msg.channel.id == setting.get('channelId')){

                const hook = new WebhookClient({token: setting.get('webhookToken'), id: setting.get('webhookId')})

                if(setting.get('comment')){
                    const komentarz = msg.content.slice(">").trim()

                    if(komentarz.charAt(0) === ">"){
                        msg.delete()

                        let text = komentarz.slice(1)
                        let text1 = Util.cleanContent(text, msg)

                        return hook.send({
                            content: `<${msg.author.id}> pisze: ${text1.replace("@everyone", "@everyone").replace("@here","@here")}`,
                            username: "Komentarz",
                            avatarURL: msg.author.displayAvatarURL({format: "png"}),
                            allowedMentions: { parse: [] }
                        })
                        .catch(error => {
                            return msg.channel.createWebhook("Wolfek Propozycje", {
                                avatar: msg.guild.iconURL({format: "png"})
                            }).then(async webhook => {
                                await suggestion.update({ webhookId: webhook.id, webhookToken: webhook.token }, { where: { guildId: msg.guild.id } })
                            })
                        })
                    }
                }
                

                const args = msg.content.trim().split(/ +/g)

                let messageArgs = args.join(' ');

                const embed = new MessageEmbed()
                .setThumbnail(`https://cdn.discordapp.com/emojis/861171694650916886.png?v=1`)
                .setColor(`#6666ff`)
                .setTitle(`Propozycja!`)
                .addField(`<:eo:861170578362204170> Propozycja użytkownika:`, `> ${messageArgs}`)
                .setTimestamp()

                if(setting.get('comment')) embed.setFooter({text: `${msg.author.tag} | Komentarz pod >`}) 
                else embed.setFooter({text: `${msg.author.tag}`})
               
                try {
                    if(messageArgs.length){
                        if(msg.author.bot) return msg.delete()
                        
                        let message = await hook.send({
                            username: `${msg.member.nickname ? msg.member.nickname : msg.author.username}`,
                            avatarURL: msg.author.displayAvatarURL({format: "png"}),
                            embeds: [embed]
                        })
                        
                        .catch(error => {
                            return msg.channel.createWebhook("Wolfek Propozycje", {
                                avatar: msg.guild.iconURL({format: "png"})
                            }).then(async webhook => {
                                await suggestion.update({ webhookId: webhook.id, webhookToken: webhook.token }, { where: { guildId: msg.guild.id } })
                            })
                        })
                        msg.delete()

                        let reakcje = await msg.channel.messages.fetch(message.id)
                        reakcje.react("<:yes:967333765431050250>")
                        reakcje.react('<:no:967333765540118528>')
                    }else {
                        if (msg.webhookId && msg.type !== "APPLICATION_COMMAND") return;
                        msg.delete()
                    }
                }catch(e){}
            }
        }

        //mention react
        if (msg.content.toLowerCase() === `<@!${botId}>` || msg.content.toLowerCase() === `<@${botId}>`){
            if(msg.author.bot) return
            const embedMention = new MessageEmbed()
            .setColor(colors['White'])
            .setTitle(`<:Kompas:875330705213784104> Witaj, jestem ${botName} - Twój wielofunkcyjny bot!`)
            .addField(`<a:Wiadomosc:875324526412574760> Mój prefix to \`${prefix}\`, wpisz \`${prefix}help\`, aby zobaczyć moją liste komend`,`<:Pinglocked:875726207612780634> Api ping: ${msg.client.ws.ping}ms \n <:Ping:875473327714607154> Ping:  ${Date.now() - msg.createdTimestamp}ms`, false)
            .addField("<:Linki:875333162648100895> Przydatne Linki:",`[Dodaj bota](https://discord.com/oauth2/authorize?client_id=${botId}&redirect_url=https://wolfek.xyz/dziekujemy/&response_type=code&permissions=545460846583&scope=applications.commands%20bot) | [Serwer Support](https://discord.gg/Gwq8KSUNFQ) | [Strona bota](https://wolfek.xyz)`, false)
            .setTimestamp()
            return msg.reply({ embeds: [embedMention]})
        }

        //kanal na memy
        const kanalyMemow = require(`../databaseModel/memy`)
        const kanalMemy = await kanalyMemow.findOne({ where: { guildId: msg.guild.id } })

        if (kanalMemy && kanalMemy.channelId){
            
            if(msg.channel.id === kanalMemy.get('channelId')){
                if(msg.author.bot) return
                if(msg.attachments.size > 0){
                    msg.react('👍')
                    msg.react('👎')
                }
            }
        }

        //Kanał do zabawy w liczenie
        const counts = require('../databaseModel/counts')
        const kanalCount = await counts.findOne({where: { channelId: msg.channel.id }})
         
        if (kanalCount && kanalCount.channelId){
            counts.sync()
            
            if(msg.webhookId) return msg.delete()
            if(isNaN(msg.content)) return msg.delete()
            
            let lastMessage = await msg.channel.messages.fetch({ limit: 2 })

            if(kanalCount.repeat == true){
                let userId = lastMessage.map(a => a.author.id).slice(1)
                if(msg.author.id === userId[0]) return msg.delete()
            }
            
            let numberDb = await kanalCount.number
            let numberUser = parseInt(msg.content)

            if(numberDb === (numberUser-1)) await kanalCount.update({number: numberUser})
            else{
                let numberNow = lastMessage.map(a => a.content).slice(1)

                if(parseInt(numberNow[0]) !== (numberUser - 1)){
                    if(!parseInt(numberNow[0]) && numberUser === 1) await kanalCount.update({number: numberUser})
                    else return msg.delete()
                }else await kanalCount.update({number: numberUser})
            }
        }
    }
}
