const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { readdirSync } = require("fs")
const Discord = require('discord.js');
const colors = require("../../config/kolorki.json")
module.exports = {
    name: "help",
    aliases: ['menu', 'pomoc'],
    description: "Pomoc, informacje oraz lista komend bota",
    usage: "[info na temat danej komendy]",
    cooldown: 1,
    async run(msg, args, blad, sukces) {
        
            //variables
            const { botId } = require("../../config/variables.js")
            let embedAuthor = [`${msg.author.tag}`, msg.author.avatarURL({ dynamic: true })]

            //czas do zamkniecia menu
            let czas = 90 //w sekundach

            //tablice
            let moderationDir = []
            let botDir = []
            let funDir = []
            let minecraftDir = []
            let utilsDir = []
            let data = []

            //emoji
            const emoji = msg.client.emojis.cache.get("875709624597225482")
            const emojiModeracyjne = msg.client.emojis.cache.get("875712489969578025")
            const emojiFun = msg.client.emojis.cache.get("875324525728894976")
            const emojiMinecraft = msg.client.emojis.cache.get("875324526219644950")
            const emojiNarzedzia = msg.client.emojis.cache.get("875324525540171848")
            const emojiInformacje = msg.client.emojis.cache.get("875731922549080114")
            const emojiPomoc = msg.client.emojis.cache.get("875324526433566731")
            const emojiWitaj = msg.client.emojis.cache.get("875324525821165569")

            let opcje = [
                {
                    label: "4Fun",
                    emoji: emojiFun,
                    value: "Fun",
                    description: "Komendy z kategorii zabawnych"
                },
                {
                    label: "Minecraft",
                    emoji: emojiMinecraft,
                    value: "Minecraft",
                    description: "Komendy z kategorii Minecraft"
                },
                {
                    label: "Pomoc",
                    emoji: emojiPomoc,
                    value: "Pomoc",
                    description: "Pomoc (Support server, Strona internetowa, itd...)"
                },
                {
                    label: "Moderacyjne",
                    emoji: emojiModeracyjne,
                    value: "Moderation",
                    description: "Komendy z kategorii Moderacyjnych"
                },
                {
                    label: "Komendy o bocie",
                    emoji: emojiInformacje,
                    value: "Informacje",
                    description: "Komendy z kategorii o bocie"
                },
                {
                    label: "Narzędzia",
                    emoji: emojiNarzedzia,
                    value: "Narzedzia",
                    description: "Komendy z kategorii Narzędzi"
                }
            ]

            if(args[0]){
                //cmd
                const command = msg.client.commands.get(args[0].toLowerCase()) || msg.client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()))
                if (!command) return blad("Podana komenda nie istnieje lub nie masz do niej dostępu!", msg) 

                if(command.dev === true && !dev) return blad("Podana komenda nie istnieje lub nie masz do niej dostępu!", msg)
                if (command.aliases) data.push(`**Aliases**\n> \`${command.aliases.join(", ")}\`\n`)

                if(command.cooldown) data.push(`**Cooldown komendy**\n> \`${command.cooldown} second(s)\`\n`)
                else data.push(`**Cooldown komendy**\n> \`5 sekund\`\n`)

                if(command.permy) data.push(`**Wymagane permisje**\n> \`${command.permy.join(", ")}\`\n`)
                if(command.dev) data.push(`**Komenda Deweloperska**\n> \`Tak\`\n`)
                if(command.premium) data.push(`**Komenda premium**\n> \`Tak\`\n`)
                if(command.description) data.push(`**Opis komendy**\n> \`${command.description}\`\n`)
                if(command.usage) data.push(`**Użycie komendy**\n> \`${prefix}${command.name} ${command.usage}\`\n`)

                const embedCommand = new MessageEmbed()
                .setTitle (`${emojiPomoc.toString()} Informajcje o komendzie: \`${prefix}${command.name}\``)
                .setDescription (data.join(""))
                .setColor(colors["White"])
                .setFooter({text:`<> - wymagane, [] - opcjonalne`})
                .setTimestamp()
                return msg.channel.send({ embeds: [embedCommand] })
            }

            //ładowanie komend
            readdirSync("./src/commands/").map(dir => {
                readdirSync(`./src/commands/${dir}/`).map(cmd=>{
                    let pull = require(`../../commands/${dir}/${cmd}`)

                    if (dir === "moderation"){
                        if(pull.premium === true) moderationDir.push(`\`${pull.name}\` ${emoji.toString()}`)
                        else moderationDir.push(`\`${pull.name}\``)
                    }
                    
                    if (dir === "bot"){
                        if(pull.premium === true) botDir.push(`\`${pull.name}\` ${emoji.toString()}`)
                        else botDir.push(`\`${pull.name}\``)
                    }

                    if (dir === "fun"){
                        if(pull.premium === true) funDir.push(`\`${pull.name}\` ${emoji.toString()}`)
                        else funDir.push(`\`${pull.name}\``)
                    }

                    if (dir === "minecraft"){
                        if(pull.premium === true) minecraftDir.push(`\`${pull.name}\` ${emoji.toString()}`)
                        else minecraftDir.push(`\`${pull.name}\``)
                    }

                    if (dir === "utils"){
                        if(pull.premium === true) utilsDir.push(`\`${pull.name}\` ${emoji.toString()}`)
                        else utilsDir.push(`\`${pull.name}\``)
                    }

                    if (dir === "developer"){
                        return
                    }
                })
            })

            
            //menu
            let menu = new MessageSelectMenu()
            .setCustomId("help")
            .setPlaceholder("Wybierz katerogię")
            .addOptions(opcje)

            //embedy
            const embedModeracyjne = new MessageEmbed()
            .setThumbnail(emojiModeracyjne.url)
            .setDescription(`<a:Menu:875324525443711000> **Kategoria moderacyjne**`)
            .addField(`${emojiModeracyjne.toString()} Moderacyjne`,`> ${moderationDir.join("**, **")}`)
            .setColor(colors["White"])
            .setTimestamp()


            const embedFun = new MessageEmbed()
            .setThumbnail(emojiFun.url)
            .setDescription(`<a:Menu:875324525443711000> **Kategoria 4fun**`)
            .addField(`${emojiFun.toString()} 4fun`,`> ${funDir.join("**, **")}`)
            .setColor(colors["White"])
            .setTimestamp()

            const embedMinecraft = new MessageEmbed()
            .setThumbnail(emojiMinecraft.url)
            .setDescription(`<a:Menu:875324525443711000> **Kategoria minecraft**`)
            .addField(`${emojiMinecraft.toString()} Minecraft`,`> ${minecraftDir.join("**, **")}`)
            .setColor(colors["White"])
            .setTimestamp()


            const embedNarzedzia = new MessageEmbed()
            .setThumbnail(emojiNarzedzia.url)
            .setDescription(`<a:Menu:875324525443711000> **Kategoria narzędzia**`)
            .addField(`${emojiNarzedzia.toString()} Narzędzia`,`> ${utilsDir.join("**, **")}`)
            .setColor(colors["White"])
            .setTimestamp()


            const embedInformacje = new MessageEmbed()
            .setThumbnail(emojiInformacje.url)
            .setDescription(`<a:Menu:875324525443711000> **Kategoria o bocie**`)
            .addField(`${emojiInformacje.toString()} O bocie`,`> ${botDir.join("**, **")}`)
            .setColor(colors["White"])
            .setTimestamp()


            const embedPomoc = new MessageEmbed()
            .setThumbnail(emojiPomoc.url)
            .setDescription(`<a:Menu:875324525443711000> **Kategoria pomoc**`)
            .addField(`${emojiPomoc.toString()} Pomoc`,`<:Serwery:875324525821165569> [Dodaj bota](https://discord.com/oauth2/authorize?client_id=${botId}&redirect_url=https://wolfek.xyz/dziekujemy/&response_type=code&permissions=545460846583&scope=applications.commands%20bot)
            <:Osoby:875324526496473138> [Serwer support](https://discord.gg/Gwq8KSUNFQ)
            <:swiatblock:875814662992711721> [Strona Internetowa](https://wolfek.xyz)
            <:Czapka:875712489969578025> [Top.gg bota](https://top.gg/bot/${botId})`)
            .setColor(colors["White"])
            .setTimestamp()



            const embedWitaj = new MessageEmbed()
            .setTitle (`${emojiWitaj.toString()} Witaj!`)
            .setDescription (`W czym mogę ci pomóc?\n\n*Możesz również zobaczyć informacje o wybranej komendzie wpisując \`${prefix}help [wybrana komenda]\`*`)
            .setColor(colors["White"])
            .setTimestamp()


            const embedZamknij = new MessageEmbed()
            .setTitle (`${emojiWitaj.toString()} Koniec menu!`)
            .setDescription (`Dziękujemy za skorzystanie z naszego bota. Aby ponownie otworzyć menu wpisz komendę \`${prefix}help\``)
            .setColor(colors["White"])
            .setTimestamp()

            try {
            //wiadomosc
            let embed = await msg.channel.send({
                embeds: [embedWitaj],
                components: [ new MessageActionRow({ components: [menu] }) ]
            })

            //check na zmienienie wybranej rzeczy
            const filter = (interaction) => interaction.customId === 'help' && interaction.user.id === msg.author.id;
            const collector = embed.createMessageComponentCollector({ filter , idle: czas * 1000 })


            

            collector.on('collect', (menu) => {   
                //check na wybrane menu
                if (menu.values[0] === "Minecraft"){
                    embed.edit({ embeds: [embedMinecraft]});
                    menu.deferUpdate()
                }

                if (menu.values[0] === "Developer"){
                    embed.edit({ embeds: [embedDeveloper]});
                    menu.deferUpdate()
                }
        
                if (menu.values[0] === "Moderation") {
                    embed.edit({ embeds: [embedModeracyjne]});
                    menu.deferUpdate()
                }
                
                if (menu.values[0] === "Fun") {
                    embed.edit({ embeds: [embedFun]});
                    menu.deferUpdate()
                }

                if (menu.values[0] === "Informacje") {
                    embed.edit({ embeds: [embedInformacje]});
                    menu.deferUpdate()
                }

                if (menu.values[0] === "Narzedzia") {
                    embed.edit({ embeds: [embedNarzedzia]});
                    menu.deferUpdate()
                }

                if (menu.values[0] === "Pomoc") {  
                    embed.edit({ embeds: [embedPomoc]});
                    menu.deferUpdate()
                }

                if (menu.values[0] === "Ustawienia") {    
                    embed.edit({ embeds: [embedUstawienia]});
                    menu.deferUpdate()
                }

            })

            collector.on("end", (menu) => {
                embed.edit({ components: [], embeds: [embedZamknij] })
            })
                   
        } catch(e) {
           
            
        }
    }
}