const { MessageEmbed, Permissions : { FLAGS } } = require('discord.js');
const colors = require('../../config/kolorki.json');
module.exports = {
    name: "clear",
    description: "Usuwa podaną liczbę wiadomości na kanale",
    args: true,
    usage: "<liczba>",
    cooldown: 10,
    userPermissions: [FLAGS.MANAGE_MESSAGES, FLAGS.MANAGE_GUILD],
    async run(msg, args, blad) {
        console.log(parseInt(args[0]))
        if (!Number.isInteger(Number(args[0]))) return blad("Liczba wiadomości do usunięcia nie została podana!", msg)

        if (Number(args[0]) < 2 || Number(args[0]) >= 100) return blad("Liczba wiadomości do usunięcia musi być większa niż 1 i mniejsza/równa niż 100", msg)
        msg.delete()

        msg.channel.bulkDelete(Number(args[0]))
        
        const embedclear = new MessageEmbed()
        .setColor(colors["MainColor"])
        .setDescription(`<:koszyk:890296398044606484> **Pomyślnie usunięto ${args} wiadomości!**`)

        msg.channel.send({embeds: [embedclear]})

    }
}