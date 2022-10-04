//requires
const { readdirSync } = require("fs")
const chalk = require("chalk")
const { Collection, Permissions: { FLAGS }, Permissions, MessageEmbed, Util } = require("discord.js")
const { blad } = require('../functions/blad.js')
const { sukces } = require('../functions/sukces.js')
const colors = require('../config/kolorki.json')


//zmienne
let commandsLet = 0

const {  cmdLog, devs } = require("../config/variables.js")

module.exports = async (client) => {
    //ladowanie plikow komend oraz ich folderu + console log
    readdirSync("./src/commands/").map(dir => {
        readdirSync(`./src/commands/${dir}/`).map(cmd=>{
            commandsLet++
            let pull = require(`../commands/${dir}/${cmd}`)

            client.commands.set(pull.name, pull)
        })
    })

    console.log(chalk.greenBright(`✅ Zarejestrowano ${commandsLet} komend.`))

    //message
    client.on("messageCreate", async (msg) => {
        //jezeli autor wiadomosci to bot, ignorowac
        if(msg.author.bot) return

        //prefix
        const PREFIX = require("../databaseModel/prefix")
        const { prefixDefault } = require("../config/variables.js")
    
        PREFIX.sync()

        const guildPrefix = await PREFIX.findOne({ where: { guildid: msg.guild.id } })

        global.prefix = guildPrefix ? guildPrefix.prefix : prefixDefault 
        
        //jezeli wiadomosc nie zaczyna sie od prefixa to ignorowac
        if (!msg.content.startsWith(prefix)) return

        //jezeli bot nie ma permisji do wysylania wiadomosci, to ma jej nie wysylac
        if(!msg.guild.me.permissionsIn(msg.channel).has(Permissions.FLAGS.SEND_MESSAGES)) return

        //argsy do komendy
        const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    
        //pobieranie nazwy komendy po argsach
        const cmdName = args.shift().toLowerCase()
    
        //szukanie komendy po naziwe
        const cmd = client.commands.get(cmdName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(cmdName))

        //jezeli komenda nie istnieje, ignorowac
        if (!cmd) return msg.react("❌")

        //cooldown na komende
        if (!cooldowns.has(cmdName)){
            cooldowns.set(cmdName, new Collection())
        }

        const now = Date.now()
        const timestamps = cooldowns.get(cmdName)
        const cooldownAmount = (cmd.cooldown || 3) * 1000

        if (timestamps.has(msg.author.id) && !devs.includes(msg.author.id)){
            const expirationTime = timestamps.get(msg.author.id) + cooldownAmount
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000
                return blad(`Proszę odczekać **${timeLeft.toFixed()} sekund(-y)** by użyć komendy \`${cmdName}\``, msg)
            }
        }

        timestamps.set(msg.author.id, now)
        setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount)

        //permisje użytkownika wymagane do wykonania komendy
        if(cmd.userPermissions){
            if(!msg.member.permissionsIn(msg.channel).has(cmd.userPermissions)){
            let permission 
            if(cmd.userPermissions[0] === FLAGS.ADMINISTRATOR) permission = "ADMINISTRATOR"
            else permission = msg.member.permissionsIn(msg.channel).missing(cmd.userPermissions).join(", ")
            return blad(`Nie posiadasz permisji do wykonania tej komendy \n> Brakujące permisje to: **\`${permission}\`**`, msg)
            }
        }

        //permisje bota wymagane do wykonania komendy
        if(cmd.botPermissions){
            if(!msg.guild.me.permissionsIn(msg.channel).has(cmd.botPermissions)){
            let permission 
            if(cmd.botPermissions[0] === FLAGS.ADMINISTRATOR) permission = "ADMINISTRATOR"
            else permission = msg.guild.me.permissionsIn(msg.channel).missing(cmd.botPermissions).join(", ")
            return blad(`Bot nie posiada permisji do wykonania tej komendy \n> Brakujące permisje to: **\`${permission}\`**`, msg)
            }
        }


        //jezeli komenda jest dla developera a osoba nim nie jest, to trzeba wyslac wiadomosc i anulowac komende
        if(cmd.dev === true && !devs.includes(msg.author.id)) return blad(`Nie masz pozwolenia by skorzystać ze tej komendy!`, msg)

        //full args
        let fullArgs = Util.cleanContent([...args].slice(0).join(" "), msg)
        if(!fullArgs) fullArgs = "brak"

        //uzywane komendy
        client.channels.cache.get(cmdLog).send({content: `**${msg.author.tag}** użył komendy \`${cmdName}\` z argsami *${fullArgs}* na serwerze **${msg.guild.name}**(\`${msg.guild.id}\`)`, allowedMentions: false})
        console.log(chalk.yellowBright(`[${msg.author.username} || ${msg.author.id}] uzyl komendy [${cmdName}]`))   
        
        //jezeli do komendy sa wymagane argsy a ich nie ma to trzeba wyslac wiadomosc i anulowac komende
        if (cmd.args && !args.length) return blad(`Nie podałeś wystarczającej ilości argumentów, **\`${msg.author.tag}\`**! \n Właściwe użycie tej komendy to: **\`${prefix}${cmd.name} ${cmd.usage}\`**\n<> - Argument wymagający, [] - Argument nie wymagający`, msg)

        //uruchamianie komendy i sprawdzanie czy nie ma errora
        try {
            cmd.run(msg, args, blad, sukces)
        } catch (e) {
            console.error(e)
            blad("error")
        }
    })
}
