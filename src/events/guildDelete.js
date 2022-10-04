const { MessageEmbed } = require("discord.js")
const colors = require("../config/kolorki.json")
const { readdirSync } = require("fs")
module.exports = {
    name: "guildDelete",
    async run(guild) {
        const { guildLog } = require("../config/variables.js")

        const embedUcieklSerwer = new MessageEmbed()
        .setTitle("<a:OH_peepoBye:846681006017740810> | Uciekł nam serwer!!!")
        .setDescription (`> Bot został usunięty z serwera!\n> ${guild.name}(\`${guild.id}\`)\n> Liczba osób ${guild.memberCount - guild.members.cache.filter(m=>m.user.bot).size}\n> Liczba botów ${guild.members.cache.filter(m=>m.user.bot).size}\n> Owner: ${await guild.fetchOwner().then(a=> a.user.tag)}(\`${await guild.fetchOwner().then(a=>a.user.id)}\`)`)
        .setColor(colors["Red"])
        .setTimestamp()

        guild.client.channels.cache.get(guildLog).send({embeds: [embedUcieklSerwer]})

        readdirSync("../databaseModel/").map(dir => {
            readdirSync(`../databaseModel/${dir}/`).map(bd=>{
                let pull = require(`../databaseModel/${dir}/${bd}`)
                pull.destroy({ where: { guild_id: guild.id }})
            })    
        })
    }
}