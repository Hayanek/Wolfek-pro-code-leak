const { MessageEmbed } = require("discord.js")
const colors = require("../../config/kolorki.json")
module.exports = {
    name: "id",
    description: "Sprawdzanie id rzeczy",
    usage: "<id>",
    args: true,
    dev: true,
    async run(msg, args, blad, sukces) {
        try {
            const serwer = msg.client.guilds.cache.get(args[0])

            if(serwer){
                let embedSerwer = new MessageEmbed()
                .setAuthor(embedAuthor[0], embedAuthor[1])
                .setThumbnail(serwer.iconURL())
                .setColor(colors["MainColor"])
                .setTitle(`Informacje o Serwerze:`)
                .addField("ID Serwera", serwer.id)
                .addField("Nazwa Serwera", serwer.name)
                .addField("Własciciel", `<@${serwer.ownerId}>(\`${serwer.ownerId}\`)`)
                .setFooter(embedFooter[0], embedFooter[1])
                .setTimestamp()
                return msg.reply({ 
                    embeds: [embedSerwer],
                    allowedMentions: {repliedUser: false}
                })
            }else{
                const kanal = msg.client.channels.cache.get(args[0])

                if(kanal){
                    let topic
                    let typ

                    if (kanal.topic) topic = kanal.topic
                    else topic = "brak"
                
                    if(kanal.type === "GUILD_TEXT") typ = "Tekstowy"
                    if(kanal.type === "GUILD_VOICE") typ = "Głosowy"
                    if(kanal.type === "GUILD_CATEGORY") typ = "kategoria"
                    if(kanal.type === "GUILD_NEWS") typ = "News"

                    let embedKanal = new MessageEmbed()
                    .setAuthor(embedAuthor[0], embedAuthor[1])
                    .setColor(colors["MainColor"])
                    .setTitle(`Informacje o Kanale:`)
                    .addField("Temat kanału", topic)
                    .addField("Typ kanału", typ)
                    .addField("ID kanału", kanal.id)
                    .addField("Nazwa kanału", kanal.name)
                    .addField("Serwer", kanal.guild.name)
                    .setFooter(embedFooter[0], embedFooter[1])
                    .setTimestamp()
                    return msg.reply({ 
                        embeds: [embedKanal],
                        allowedMentions: {repliedUser: false}
                    })

                }else{
                    const emoji = msg.client.emojis.cache.get(args[0])

                    if(emoji){
                        let embedEmoji = new MessageEmbed()
                        .setAuthor(embedAuthor[0], embedAuthor[1])
                        .setColor(colors["MainColor"])
                        .setTitle(`Informacje o Emoji:`)
                        .addField("Emoji", emoji.toString())
                        .addField("ID emoji", emoji.id)
                        .addField("Nazwa emoji", emoji.name)
                        .addField("Serwer", emoji.guild.name)
                        .setFooter(embedFooter[0], embedFooter[1])
                        .setTimestamp()
                        return msg.reply({ 
                            embeds: [embedEmoji],
                            allowedMentions: {repliedUser: false} 
                        })

                    }else{
                        const osoba = await msg.client.users.fetch(args[0])

                        if(osoba){
                            let embedOsoba = new MessageEmbed()
                            .setAuthor(embedAuthor[0], embedAuthor[1])
                            .setColor(colors["MainColor"])
                            .setTitle(`Informacje o osobie:`)
                            .setThumbnail(osoba.displayAvatarURL())
                            .addField("Nazwa osoby", osoba.tag)
                            .addField("ID osoby", osoba.id)
                            .addField("Bot", osoba.bot.toString())
                            .setFooter(embedFooter[0], embedFooter[1])
                            .setTimestamp()
                            return msg.reply({ 
                                embeds: [embedOsoba],
                                allowedMentions: {repliedUser: false}
                            })

                        }else{
                            let map = msg.client.guilds.cache.map((guild) => guild)
                            let rola
                            for(const data of map){
                                try{
                                    if(data.roles.cache.get(args[0])){
                                        rola = data.roles.cache.get(args[0])
                                        break
                                    }
                                }catch{ break }
                            }

                            if(rola){
                                let embedRola = new MessageEmbed()
                                .setAuthor(embedAuthor[0], embedAuthor[1])
                                .setColor(colors["MainColor"])
                                .setTitle(`Informacje o Roli:`)
                                .addField("ID roli", rola.id)
                                .addField("Nazwa roli", rola.name)
                                .addField("Kolor roli", rola.hexColor)
                                .addField("Serwer", rola.guild.name)
                                .setFooter(embedFooter[0], embedFooter[1])
                                .setTimestamp()
                                return msg.reply({ 
                                    embeds: [embedRola],
                                    allowedMentions: {repliedUser: false}
                                })

                            }else{ return blad("id", msg) }
                        }
                    }
                }
            }
        } catch (e) { console.log(e) }
    }
}