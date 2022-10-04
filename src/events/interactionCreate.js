const { MessageEmbed } = require("discord.js")
const colors = require("../config/kolorki.json")
const verify = require(`../databaseModel/verification`)
            
module.exports = {
    name: "interactionCreate",
    async run(interaction) {
        if (!interaction.isButton()) return;
        if(interaction.customId === "verify"){
            verify.sync()
            const istnienie = await verify.findOne({ where: { guildId: interaction.guild.id } })
            if (istnienie){
                interaction.member.roles.add(istnienie.roleId)
                interaction.deferUpdate()
            }
        }
        
    }
}
