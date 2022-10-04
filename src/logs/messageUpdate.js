const { MessageEmbed } = require("discord.js");
const colors = require('../config/kolorki.json')
const logi = require(`../databaseModel/logs`)
module.exports = {
    name: "messageUpdate",
    async run(oldMessage, newMessage) {
        logi.sync()

        const istnienie = await logi.findOne({ where: { guildId: oldMessage.guild.id } })

        if(!istnienie) return

        if(!oldMessage.guild.id === istnienie.guildId) return

        if(oldMessage.author.bot) return

        if(!oldMessage.attachments.first()) if(oldMessage.content === newMessage.content) return
    
        const embedEdit = new MessageEmbed()
        .setColor(colors["White"])
        .setTitle(`<:Edit1:875378943593697312> Edytowano wiadomośc!`)
        .addField(`<:Osoby:875324526496473138> Autor wiadomości`,`<@!${oldMessage.member.id}>`,false)

        if(oldMessage.content) embedEdit.addField(`<a:usunie:875355724153241620> Wiadomość przed`,`\`\`\`${oldMessage.content}\`\`\` `, true)
        else embedEdit.addField(`<a:usunie:875355724153241620> Wiadomość przed`,`\`\`\`brak\`\`\` `, true)

        if(newMessage.content) embedEdit.addField(`<a:Nowawiadomosc:875324526890721362> Wiadomość po`,`\`\`\`${newMessage.content}\`\`\` `, true)
        else embedEdit.addField(`<a:Nowawiadomosc:875324526890721362> Wiadomość po`,`\`\`\`brak\`\`\` `, true)

        embedEdit.addField(`<:Szukanie:875376674059993109> Kanał`,`<#${oldMessage.channel.id}>`,false)

        if(oldMessage.attachments.first()) embedEdit.addField(`<a:foldernowy:875324525540171848> Nazwa pliku`,`\`\`\`${oldMessage.attachments.first().name}\`\`\` `, false)
        
        if(newMessage.attachments.first()) embedEdit.addField(`<:Pliki:875324526513242122> Plik`,`[Pobierz](${oldMessage.attachments.first().url})`, false)

        if(oldMessage.attachments.first()) if(oldMessage.attachments.first().contentType === 'image/png' || oldMessage.attachments.first().contentType === 'image/jpg' || oldMessage.attachments.first().contentType === 'image/jpeg' || oldMessage.attachments.first().contentType === 'image/gif')
        
        embedEdit.setImage(oldMessage.attachments.first().url)
        embedEdit.addField(`<:Upublicznij:875324526458708009> Link do wiadomość`, `[Klik!](${newMessage.url})`,false)
        embedEdit.setTimestamp()

        return newMessage.client.channels.cache.get(istnienie.channelId).send({ embeds: [embedEdit] });
    }
}