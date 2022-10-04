const { Permissions : { FLAGS } } = require('discord.js');
const { prefixDefault } = require("../config/variables.js")
module.exports = {
    name: "prefix",
    description: "Ustawia prefix na serwerze",
    options: [
        {
            type: "STRING",
            name: "prefix",
            description: "Nazwa prefixu nie powinna przekraczac 3 znaki",
            required: false
        },
    ],
    userPermissions: [FLAGS.BAN_MEMBERS, FLAGS.MANAGE_GUILD],
    async run(msg, blad, sukces, prefixx) {
        try{
            prefixx.sync()
 
            const guildPrefix = await prefixx.findOne({ where: { guildid: msg.guild.id } })

            let prefix = guildPrefix ? guildPrefix.prefix : prefixDefault 

            let args = msg.options.getString('prefix')

            if(!args) return sukces(`Aktualny prefix na serwerze: \`${prefix}\``, msg)

            if(args.length >= 3) return blad(`Prefix nie może zawierać więcej niż 3 znaki!`, msg)

            const istnienie = await prefixx.findOne({ where: { guildId: msg.guild.id } })
            
            if(!istnienie){
                await prefixx.create({ guildId: msg.guild.id, prefix: args })
                return sukces(`Prefix bota został zmieniony z \`${prefix}\` na \`${args}\`!`, msg)
            }
            else{
                if(istnienie.prefix === args) return blad(`Podany prefix bota jest już ustawiony takowy!`, msg)

                await prefixx.update({ prefix: args }, { where: { guildId: msg.guild.id } })
                return sukces(`Prefix bota został zmieniony z \`${prefix}\` na \`${args}\`!`, msg)
            }
        } catch(e) {
            console.log(e)
        }
    }
}