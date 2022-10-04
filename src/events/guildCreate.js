const { MessageEmbed } = require("discord.js")
const colors = require("../config/kolorki.json")
module.exports = {
    name: "guildCreate",
    async run(guild) {
        const { prefixDefault, botName, guildLog } = require("../config/variables.js")

        const randomKanal = guild.channels.cache.filter(channel => {return channel.type === 'GUILD_TEXT'}).first()
        const embedWitania = new MessageEmbed()
        .setColor(`#ffffff`)
        .setTitle(`<:Kompas:875330705213784104> Witaj, jestem ${botName} - Twój wielofunkcyjny bot!`)
        .addField(`<a:Wiadomosc:875324526412574760> Mój prefix to \`${prefixDefault}\`, wpisz \`w!help\`, aby zobaczyć moją liste komend`,`<:Pinglocked:875726207612780634> __Client ping__: ${guild.client.ws.ping}ms`, false)
        .addField("<:Linki:875333162648100895> Przydatne Linki:","[Dodaj bota](https://discord.com/api/oauth2/authorize?client_id=761566285913260064&permissions=8&scope=bot) | [Serwer Support](https://discord.gg/Gwq8KSUNFQ) | [Strona bota](https://wolfek.xyz)", false)
        .setTimestamp()
        guild.client.channels.cache.get(randomKanal.id).send({embeds: [embedWitania]})

        const embedNowySerwer = new MessageEmbed()
        .setTitle("<a:gen:803920226332573718> | Doszedł nowy serwer!!!")
        .setDescription (`> Bot został dodany na nowy serwer!\n> ${guild.name}(\`${guild.id}\`)\n> Liczba osób ${guild.memberCount - guild.members.cache.filter(m=>m.user.bot).size}\n> Liczba botów ${guild.members.cache.filter(m=>m.user.bot).size}\n> Owner: ${await guild.fetchOwner().then(a=>a.user.tag)}(\`${await guild.fetchOwner().then(a=>a.user.id)}\`)`)
        .setColor(colors["Dark Green"])
        .setTimestamp()
        return guild.client.channels.cache.get(guildLog).send({embeds: [embedNowySerwer]})
    }
}
