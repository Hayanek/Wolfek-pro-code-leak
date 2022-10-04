const chalk = require("chalk")
const sequelize = require("../config/database")
module.exports = {
    name: "ready",
    once: true,
    async run(client) {

        console.log(chalk.greenBright(`✅ Zalogowano jako ${client.user.tag}!`));

        //databaza test polaczenia
        try {
            await sequelize.authenticate();
            console.log(chalk.greenBright(`✅ Pomyslnie polaczono z databazą. (${sequelize.config.database})`));
            console.log()
        } catch (error) {
            console.error(chalk.redBright(`❌ Brak połączenia z databazą!`, error));
        }

        //czas co ile ma sie zmieniac status
        const time = 30 //czas w sekundach

        //pętla statusu bota
        setInterval(() => {
            //statusy
            const activitiesList = [
                "w!help",
                `Mój ping to ${client.ws.ping}ms.`,
                `Zaufało nam ${client.guilds.cache.size} serwerów.`,

            ]

            //zmienianie statusu po koleji
            let index = Math.floor(Math.random()*(activitiesList.length));
            client.user.setActivity(activitiesList[index]);
        }, time * 1000)

        //liczonko
        const counts = require('../databaseModel/counts')
        const top = await counts.findAll()
        const top10 = top.splice(0, top.length)
        for(const data of top10) {
            try{
                if(client.channels.cache.get(data.channelId)){
                    await client.channels.cache.get(data.channelId).messages.fetch({ message: { limit: 100 }})
                }
            }catch(error) {}
        }
    }
}