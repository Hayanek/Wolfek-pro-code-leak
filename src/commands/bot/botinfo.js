const { MessageEmbed, Permissions : { FLAGS } } = require('discord.js');
const Discord = require('discord.js');
const colors = require('../../config/kolorki.json');
module.exports = {
    name: "botinfo",
    description: "statystyki bota",
    async run(msg, args) {
        const { botAvatar } = require("../../config/variables.js")


        const embedBotinfo = new MessageEmbed()
        .setColor(colors['White'])
        .setDescription(`<:Opcje:875324524764221471> **Witaj w moich statystykach**`)
        .addField(`<:Sens:875324526588751912> Statystyki`,`<:Kawusia:875324526588723210> Serwery: ${msg.client.guilds.cache.size} \n<:Osoby:875324526496473138> Osoby: ${msg.client.guilds.cache.map((g) => g.memberCount - g.members.cache.filter(m=>m.user.bot).size).reduce((a, c) => a + c)}`, true)
        .addField(`<:Wydajnosc:875734466587406408> Wydajność`,`<:Pinglocked:875726207612780634> Ping: ${Date.now() - msg.createdTimestamp}ms \n<:Ping:875723305523499038> Client Ping: ${msg.client.ws.ping}ms`, true)
        .addField(`<:Serwery:875324525821165569> Reszta informacji`,`<:javascript:875732752798974032> Node: ${process.version} \n<:discord12:875731922549080114> Discord.js : ${Discord.version}`, false)
        .addField(`<:Gwiazdka:875324526253207574> Programisci`, `Hayanek#5536`, true)
        .setThumbnail(botAvatar)
        .setTimestamp()
        return msg.channel.send({ embeds: [embedBotinfo]})
    }
}