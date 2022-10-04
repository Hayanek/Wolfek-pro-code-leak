const { MessageEmbed } = require("discord.js");
const colors = require('../config/kolorki.json')
const logi = require(`../databaseModel/logs`)
module.exports = {
    name: "messageDelete",
    async run(message) {
        logi.sync()

        const istnienie = await logi.findOne({ where: { guildId: message.guild.id } })

        if(!istnienie) return

        if(!message.guild.id === istnienie.guildId) return

        if(message.author.bot) return

        const embedDelete = new MessageEmbed()
        .setColor(colors["Red"])
        .setTitle(`<a:usunie:875355724153241620> Usunięto wiadomości!`)
        .addField(`<:Osoby:875324526496473138> Autor wiadomości`,`\`\`\`${message.author.tag}\`\`\``, false)

        if(message.content) embedDelete.addField(`<a:Wiadomosc:875324526412574760> Wiadomość`,`\`\`\`${message.content}\`\`\` `, false)

        embedDelete.addField(`<:Szukanie:875376674059993109> Kanał`,`\`\`\`${message.channel.name}\`\`\``, false)

        if(message.attachments.first()){
            if(message.attachments.first().contentType === 'image/png' || message.attachments.first().contentType === 'image/jpg' || message.attachments.first().contentType === 'image/jpeg' || message.attachments.first().contentType === 'image/gif'){
                embedDelete.setImage(message.attachments.first().url)
            }
            else embedDelete.addField(`<a:foldernowy:875324525540171848> Nazwa pliku`,`\`\`\`${message.attachments.first().name}\`\`\` `, false)
        } 

        embedDelete.setTimestamp()

        return message.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedDelete] });
    }
}