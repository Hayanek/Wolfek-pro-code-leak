const { readdirSync } = require("fs")
const chalk = require("chalk")
const { Constants: { Events } } = require("discord.js")
const serverEvents = Object.values(Events)

// Ładowanie eventow serwera
const serverEventsPath = __dirname + `/../events`
const serverEventsPath2 = __dirname + `/../logs`

module.exports = (client) => {

    const events = readdirSync(serverEventsPath).filter((file) => file.endsWith(".js"))
    const events2 = readdirSync(serverEventsPath2).filter((file) => file.endsWith(".js"))

    let registeredEventsCount = 0

    for (const file of events) {
        const event = require(__dirname + `/../events/${file}`)

        if (serverEvents.includes(event.name)){
            if(event.once){
                client.once(event.name, event.run)
                registeredEventsCount++
            }else{
                client.on(event.name, event.run)
                registeredEventsCount++
            }
        }else{
            console.log(chalk.red(`❌ Event '${event.name}' in '${file}' doesn't exist.`))
            process.exit(1)
        } 
    }

    for (const file of events2) {
        const eventLogs = require(__dirname + `/../logs/${file}`)
        
        if (serverEvents.includes(eventLogs.name)){
            if(eventLogs.once){
                client.once(eventLogs.name, eventLogs.run)
                registeredEventsCount++
            }else{
                client.on(eventLogs.name, eventLogs.run)
                registeredEventsCount++
            }
        }else{
            console.log(chalk.red(`❌ Event '${eventLogs.name}' in '${file}' doesn't exist.`))
            process.exit(1)
        } 
    }

  console.log(chalk.greenBright(`✅ Zarejstowano ${registeredEventsCount} eventow.`))
}