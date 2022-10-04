const { MessageEmbed, Permissions : { FLAGS }, Client } = require('discord.js');
const colors = require('../../config/kolorki.json');
const warns = require(`../../databaseModel/warns`)
module.exports = {
    name: "remove-warn",
    aliases: [`revoke-warn`, "usun-warna"],
    description: "Usuwanie warna.",
    args: true,
    usage: "<idwarn>",
    cooldown: 10,
    userPermissions: [FLAGS.MANAGE_MESSAGES],
    async run(msg, args, blad, sukces) {

    await warns.sync()
    try{
        let istnienie = await warns.findOne({ where: { guildId: msg.guild.id, idWarn: args[0] }})

        if(!istnienie) return blad(`Nie ma takiego warna w bazie!`, msg)
            await warns.destroy({ where: { guildId: msg.guild.id, idWarn: args[0] } })
        return sukces(`Warn został pomyślnie usuniety!`, msg)
            
    }catch(error){ 
        console.log(error) 
    }
    
    }
}
